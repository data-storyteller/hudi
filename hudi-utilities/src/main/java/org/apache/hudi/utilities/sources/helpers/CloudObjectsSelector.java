/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.utilities.sources.helpers;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.BatchResultErrorEntry;
import com.amazonaws.services.sqs.model.DeleteMessageBatchRequest;
import com.amazonaws.services.sqs.model.DeleteMessageBatchRequestEntry;
import com.amazonaws.services.sqs.model.DeleteMessageBatchResult;
import com.amazonaws.services.sqs.model.GetQueueAttributesRequest;
import com.amazonaws.services.sqs.model.GetQueueAttributesResult;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.hadoop.conf.Configuration;
import org.apache.hudi.DataSourceUtils;
import org.apache.hudi.common.config.TypedProperties;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.json.JSONObject;

/** Cloud Objects Selector Class. This class has methods for processing cloud objects. */
public class CloudObjectsSelector {
  public static final List<String> ALLOWED_S3_EVENT_PREFIX =
      Collections.singletonList("ObjectCreated");
  public static final long serialVersionUID = 1L;
  public static volatile Logger log = LogManager.getLogger(CloudObjectsSelector.class);
  public final String queueUrl;
  public final int longPollWait;
  public final int maxMessagesEachRequest;
  public final int maxMessageEachBatch;
  public final int visibilityTimeout;
  public final TypedProperties props;

  /** Cloud Objects Selector Class. {@link CloudObjectsSelector} */
  public CloudObjectsSelector(TypedProperties props, Configuration hadoopConf) {
    DataSourceUtils.checkRequiredProperties(
        props, Collections.singletonList(CloudObjectsSelector.Config.QUEUE_URL_PROP));
    this.props = props;
    this.queueUrl = props.getString(CloudObjectsSelector.Config.QUEUE_URL_PROP);
    this.longPollWait =
        (int) props.getOrDefault(CloudObjectsSelector.Config.QUEUE_LONGPOLLWAIT_PROP, 20);
    this.maxMessageEachBatch =
        (int) props.getOrDefault(CloudObjectsSelector.Config.QUEUE_MAXMESSAGESEACHBATCH_PROP, 5);
    this.visibilityTimeout =
        (int) props.getOrDefault(CloudObjectsSelector.Config.QUEUE_VISIBILITYTIMEOUT_PROP, 30);
    this.maxMessagesEachRequest = 10;
  }

  /** Get the file attributes filePath, eventTime and size from JSONObject record. */
  public static Map<String, Object> getFileAttributesFromRecord(JSONObject record)
      throws UnsupportedEncodingException {

    Map<String, Object> fileRecord = new HashMap<>();
    String eventTimeStr = record.getString("eventTime");
    long eventTime =
        Date.from(Instant.from(DateTimeFormatter.ISO_INSTANT.parse(eventTimeStr))).getTime();

    JSONObject s3Object = record.getJSONObject("s3").getJSONObject("object");
    String bucket =
        URLDecoder.decode(
            record.getJSONObject("s3").getJSONObject("bucket").getString("name"), "UTF-8");
    String key = URLDecoder.decode(s3Object.getString("key"), "UTF-8");
    String filePath = "s3://" + bucket + "/" + key;

    fileRecord.put("eventTime", eventTime);
    fileRecord.put("fileSize", s3Object.getLong("size"));
    fileRecord.put("filePath", filePath);
    return fileRecord;
  }

  /** Amazon SQS Client Builder. */
  public static AmazonSQS createAmazonSqsClient() {
    // ToDO - Update it for handling AWS Client creation but not using default only.
    return AmazonSQSClientBuilder.defaultClient();
  }

  /** Get SQS queue attributes. */
  public static Map<String, String> getSqsQueueAttributes(AmazonSQS sqs, String queueUrl) {
    GetQueueAttributesResult queueAttributesResult =
        sqs.getQueueAttributes(
            new GetQueueAttributesRequest(queueUrl)
                .withAttributeNames("ApproximateNumberOfMessages"));
    return queueAttributesResult.getAttributes();
  }

  /** List messages from queue. */
  public static List<Message> getMessagesToProcess(
      AmazonSQS sqs,
      String queueUrl,
      ReceiveMessageRequest receiveMessageRequest,
      int maxMessageEachBatch,
      int maxMessagesEachRequest) {
    List<Message> messagesToProcess = new ArrayList<>();

    // Get count for available messages
    Map<String, String> queueAttributesResult = getSqsQueueAttributes(sqs, queueUrl);
    long approxMessagesAvailable =
        Long.parseLong(queueAttributesResult.get("ApproximateNumberOfMessages"));
    log.info("Approx. " + approxMessagesAvailable + " messages available in queue.");

    for (int i = 0;
        i < (int) Math.ceil((double) approxMessagesAvailable / maxMessagesEachRequest) + 1;
        ++i) {
      List<Message> messages = sqs.receiveMessage(receiveMessageRequest).getMessages();
      log.debug("Messages size: " + messages.size());

      for (Message message : messages) {
        log.debug("message id: " + message.getMessageId());
        messagesToProcess.add(message);
      }
      log.debug("total fetched messages size: " + messagesToProcess.size());
      if (messages.isEmpty() || (messagesToProcess.size() >= maxMessageEachBatch)) {
        break;
      }
    }
    return messagesToProcess;
  }

  /** create partitions of list using specific batch size. */
  public List<List<Message>> createListPartitions(List<Message> singleList, int eachBatchSize) {
    List<List<Message>> listPartitions = new ArrayList<>();

    if (singleList.size() == 0 || eachBatchSize < 1) {
      return listPartitions;
    }

    for (int start = 0; start < singleList.size(); start += eachBatchSize) {
      int end = Math.min(start + eachBatchSize, singleList.size());

      if (start > end) {
        throw new IndexOutOfBoundsException(
            "Index " + start + " is out of the list range <0," + (singleList.size() - 1) + ">");
      }
      listPartitions.add(new ArrayList<>(singleList.subList(start, end)));
    }
    return listPartitions;
  }

  /** delete batch of messages from queue. */
  public void deleteBatchOfMessages(
      AmazonSQS sqs, String queueUrl, List<Message> messagesToBeDeleted) {
    DeleteMessageBatchRequest deleteBatchReq =
        new DeleteMessageBatchRequest().withQueueUrl(queueUrl);
    List<DeleteMessageBatchRequestEntry> deleteEntries = deleteBatchReq.getEntries();

    for (Message message : messagesToBeDeleted) {
      deleteEntries.add(
          new DeleteMessageBatchRequestEntry()
              .withId(message.getMessageId())
              .withReceiptHandle(message.getReceiptHandle()));
    }
    DeleteMessageBatchResult deleteResult = sqs.deleteMessageBatch(deleteBatchReq);
    List<String> deleteFailures =
        deleteResult.getFailed().stream()
            .map(BatchResultErrorEntry::getId)
            .collect(Collectors.toList());
    System.out.println("Delete is" + deleteFailures.isEmpty() + "or ignoring it.");
    if (!deleteFailures.isEmpty()) {
      log.warn(
          "Failed to delete "
              + deleteFailures.size()
              + " messages out of "
              + deleteEntries.size()
              + " from queue.");
    } else {
      log.info("Successfully deleted " + deleteEntries.size() + " messages from queue.");
    }
  }

  /** Delete Queue Messages after hudi commit. This method will be invoked by source.onCommit. */
  public void onCommitDeleteProcessedMessages(
      AmazonSQS sqs, String queueUrl, List<Message> processedMessages) {

    if (!processedMessages.isEmpty()) {
      // create batch for deletion, SES DeleteMessageBatchRequest only accept max 10 entries
      List<List<Message>> deleteBatches = createListPartitions(processedMessages, 10);
      for (List<Message> deleteBatch : deleteBatches) {
        deleteBatchOfMessages(sqs, queueUrl, deleteBatch);
      }
    }
  }

  /** Configs supported. */
  public static class Config {
    public static final String QUEUE_URL_PROP = "hoodie.deltastreamer.source.queue.url";
    public static final String QUEUE_LONGPOLLWAIT_PROP =
        "hoodie.deltastreamer.source.queue.long_poll_wait";
    public static final String QUEUE_MAXMESSAGESEACHBATCH_PROP =
        "hoodie.deltastreamer.source.queue.max_messages_each_batch";
    public static final String QUEUE_VISIBILITYTIMEOUT_PROP =
        "hoodie.deltastreamer.source.queue.visibility_timeout_seconds";
    public static final String SOURCE_INPUT_SELECTOR = "hoodie.deltastreamer.source.input.selector";
  }
}
