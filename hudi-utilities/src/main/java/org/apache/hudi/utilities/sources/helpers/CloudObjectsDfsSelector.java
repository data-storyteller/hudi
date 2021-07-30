/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.utilities.sources.helpers;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.apache.hadoop.conf.Configuration;
import org.apache.hudi.common.config.TypedProperties;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.ReflectionUtils;
import org.apache.hudi.common.util.collection.ImmutablePair;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.exception.HoodieException;
import org.apache.spark.api.java.JavaSparkContext;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Cloud Objects DFs Selector Class. This class will provide the methods to process the messages
 * from queue for CloudObjectsDfsSource.
 */
public class CloudObjectsDfsSelector extends CloudObjectsSelector {

  protected static final List<String> IGNORE_FILEPREFIX_LIST = Arrays.asList(".", "_");
  public AmazonSQS sqs = createAmazonSqsClient();
  //  public List<Message> processedMessages = new ArrayList<>();

  /** Cloud Objects Selector Class. {@link CloudObjectsMetaSelector} */
  public CloudObjectsDfsSelector(TypedProperties props, Configuration hadoopConf) {
    super(props, hadoopConf);
  }

  /**
   * Factory method for creating custom CloudObjectsDfsSelector. Default selector to use is {@link
   * CloudObjectsDfsSelector}
   */
  public static CloudObjectsDfsSelector createSourceSelector(
      TypedProperties props, Configuration conf) {
    String sourceSelectorClass =
        props.getString(
            CloudObjectsDfsSelector.Config.SOURCE_INPUT_SELECTOR,
            CloudObjectsDfsSelector.class.getName());
    try {
      CloudObjectsDfsSelector selector =
          (CloudObjectsDfsSelector)
              ReflectionUtils.loadClass(
                  sourceSelectorClass,
                  new Class<?>[] {TypedProperties.class, Configuration.class},
                  props,
                  conf);

      log.info("Using Cloud Object selector " + selector.getClass().getName());
      return selector;
    } catch (Exception e) {
      throw new HoodieException("Could not load source selector class " + sourceSelectorClass, e);
    }
  }

  /**
   * Get the list of files changed since last checkpoint.
   *
   * @param sparkContext JavaSparkContext to help parallelize certain operations
   * @param lastCheckpointStr the last checkpoint time string, empty if first run
   * @return the list of files concatenated and their latest modified time
   */
  public Pair<Option<String>, String> getNextFilePathsFromQueue(
      JavaSparkContext sparkContext,
      Option<String> lastCheckpointStr,
      List<Message> processedMessages) {
    log.info("Reading messages....");

    processedMessages.clear();

    try {
      log.info("Start Checkpoint : " + lastCheckpointStr);

      long lastCheckpointTime = lastCheckpointStr.map(Long::parseLong).orElse(Long.MIN_VALUE);

      List<Map<String, Object>> eligibleFileRecords = getEligibleFilePathRecords(processedMessages);
      log.info("eligible files size: " + eligibleFileRecords.size());

      // sort all files by event time.
      eligibleFileRecords.sort(Comparator.comparingLong(record -> (long) record.get("eventTime")));

      List<String> filteredFiles = new ArrayList<>();
      long newCheckpointTime = lastCheckpointTime;

      for (Map<String, Object> fileRecord : eligibleFileRecords) {

        long eventTime = (long) fileRecord.get("eventTime");
        String filePath = (String) fileRecord.get("filePath");

        newCheckpointTime = eventTime;
        if (!filteredFiles.contains(filePath)) {
          filteredFiles.add(filePath);
        }
      }
      if (filteredFiles.isEmpty()) {
        return new ImmutablePair<>(Option.empty(), String.valueOf(newCheckpointTime));
      }
      String pathStr = String.join(",", filteredFiles);
      return new ImmutablePair<>(Option.ofNullable(pathStr), String.valueOf(newCheckpointTime));
    } catch (JSONException | IOException e) {
      e.printStackTrace();
      throw new HoodieException("Unable to read from queue: ", e);
    }
  }

  /**
   * List messages from queue, filter out illegible files while doing so. It will also delete the
   * ineligible messages from queue.
   *
   * @param processedMessages array of processed messages to add more messages
   * @return the list of eligible file records
   */
  protected List<Map<String, Object>> getEligibleFilePathRecords(List<Message> processedMessages)
      throws IOException {

    List<Map<String, Object>> eligibleFilePathRecords = new ArrayList<>();
    List<Message> ineligibleMessages = new ArrayList<>();

    ReceiveMessageRequest receiveMessageRequest =
        new ReceiveMessageRequest()
            .withQueueUrl(this.queueUrl)
            .withWaitTimeSeconds(this.longPollWait)
            .withVisibilityTimeout(this.visibilityTimeout);
    receiveMessageRequest.setMaxNumberOfMessages(this.maxMessagesEachRequest);

    List<Message> messages =
        getMessagesToProcess(
            this.sqs,
            this.queueUrl,
            receiveMessageRequest,
            this.maxMessageEachBatch,
            this.maxMessagesEachRequest);

    for (Message message : messages) {
      boolean isMessageDelete = Boolean.TRUE;

      JSONObject messageBody = new JSONObject(message.getBody());
      Map<String, Object> messageMap;
      ObjectMapper mapper = new ObjectMapper();
      if (messageBody.has("Message")) {
        // If this messages is from S3Event -> SNS -> SQS
        messageMap =
            (Map<String, Object>) mapper.readValue(messageBody.getString("Message"), Map.class);
      } else {
        // If this messages is from S3Event -> SQS
        messageMap = (Map<String, Object>) mapper.readValue(messageBody.toString(), Map.class);
      }

      if (messageMap.containsKey("Records")) {
        List<Map<String, Object>> records = (List<Map<String, Object>>) messageMap.get("Records");
        for (Map<String, Object> record : records) {
          String eventName = (String) record.get("eventName");
          if (ALLOWED_S3_EVENT_PREFIX.stream().anyMatch(eventName::startsWith)) {

            Map<String, Object> fileRecord = getFileAttributesFromRecord(new JSONObject(record));

            String filePath = (String) fileRecord.get("filePath");
            String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

            // skip the files with unwanted file name prefix
            if (IGNORE_FILEPREFIX_LIST.stream().noneMatch(fileName::startsWith)) {
              eligibleFilePathRecords.add(fileRecord);
              isMessageDelete = Boolean.FALSE;
              processedMessages.add(message);
            } else {
              log.info("Ignoring the record as file prefix is not expected.");
            }
          } else {
            log.info("Record is not allowed s3 event");
          }
        }
      } else {
        log.info("Message is not expected format or it's s3:TestEvent");
      }

      if (isMessageDelete) {
        ineligibleMessages.add(message);
      }
    }
    if (!ineligibleMessages.isEmpty()) {
      deleteBatchOfMessages(sqs, queueUrl, ineligibleMessages);
    }
    return eligibleFilePathRecords;
  }
}
