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
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
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
 * Cloud Objects Meta Selector Class. This class will provide the methods to process the messages
 * from queue for CloudObjectsMetaSource.
 */
public class CloudObjectsMetaSelector extends CloudObjectsSelector {

  public AmazonSQS sqs = createAmazonSqsClient();
  //  public List<Message> processedMessages = new ArrayList<>();

  /** Cloud Objects Meta Selector Class. {@link CloudObjectsSelector} */
  public CloudObjectsMetaSelector(TypedProperties props, Configuration hadoopConf) {
    super(props, hadoopConf);
  }

  /**
   * Factory method for creating custom CloudObjectsMetaSelector. Default selector to use is {@link
   * CloudObjectsMetaSelector}
   */
  public static CloudObjectsMetaSelector createSourceSelector(
      TypedProperties props, Configuration conf) {
    String sourceSelectorClass =
        props.getString(
            CloudObjectsMetaSelector.Config.SOURCE_INPUT_SELECTOR,
            CloudObjectsMetaSelector.class.getName());
    try {
      CloudObjectsMetaSelector selector =
          (CloudObjectsMetaSelector)
              ReflectionUtils.loadClass(
                  sourceSelectorClass,
                  new Class<?>[] {TypedProperties.class, Configuration.class},
                  props,
                  conf);

      log.info("Using path selector " + selector.getClass().getName());
      return selector;
    } catch (Exception e) {
      throw new HoodieException("Could not load source selector class " + sourceSelectorClass, e);
    }
  }

  /** List messages from queue, filter out illegible events while doing so. */
  protected List<Map<String, Object>> getEligibleEvents(List<Message> processedMessages)
      throws IOException {

    List<Map<String, Object>> eligibleRecords = new ArrayList<>();
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
      Map messageMap = new HashMap<>();
      if (messageBody.has("Message")) {
        ObjectMapper mapper = new ObjectMapper();
        messageMap = mapper.readValue(messageBody.getString("Message"), Map.class);
      }
      if (messageMap.containsKey("Records")) {
        List<Map<String, Object>> records = (List<Map<String, Object>>) messageMap.get("Records");
        for (Map<String, Object> record : records) {
          String eventName = (String) record.get("eventName");

          // filter only allowed s3 event types
          if (ALLOWED_S3_EVENT_PREFIX.stream().anyMatch(eventName::startsWith)) {
            eligibleRecords.add(record);
            isMessageDelete = Boolean.FALSE;
            processedMessages.add(message);

          } else {
            log.info("This S3 event " + eventName + " is not allowed, so ignoring it.");
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

    return eligibleRecords;
  }

  /**
   * Get the list of events from queue.
   *
   * @param sparkContext JavaSparkContext to help parallelize certain operations
   * @param lastCheckpointStr the last checkpoint time string, empty if first run
   * @return the list of events
   */
  public Pair<List<String>, String> getNextEventsFromQueue(
      JavaSparkContext sparkContext,
      Option<String> lastCheckpointStr,
      List<Message> processedMessages) {

    processedMessages.clear();

    log.info("Reading messages....");
    System.out.println("Reading messages....");

    try {
      log.info("Start Checkpoint : " + lastCheckpointStr);

      long lastCheckpointTime = lastCheckpointStr.map(Long::parseLong).orElse(Long.MIN_VALUE);

      List<Map<String, Object>> eligibleEventRecords = getEligibleEvents(processedMessages);
      log.info("eligible events size: " + eligibleEventRecords.size());

      // sort all events by event time.
      eligibleEventRecords.sort(
          Comparator.comparingLong(
              record ->
                  Date.from(
                          Instant.from(
                              DateTimeFormatter.ISO_INSTANT.parse(
                                  (String) record.get("eventTime"))))
                      .getTime()));

      List<String> filteredEventRecords = new ArrayList<>();
      long newCheckpointTime = lastCheckpointTime;

      for (Map<String, Object> eventRecord : eligibleEventRecords) {
        newCheckpointTime =
            Date.from(
                    Instant.from(
                        DateTimeFormatter.ISO_INSTANT.parse((String) eventRecord.get("eventTime"))))
                .getTime();

        // Currently HUDI don't supports column names like request-amz-id-2
        eventRecord.remove("responseElements");
        filteredEventRecords.add(
            new ObjectMapper().writeValueAsString(eventRecord).replace("%3D", "="));
      }
      if (filteredEventRecords.isEmpty()) {
        return new ImmutablePair<>(filteredEventRecords, String.valueOf(newCheckpointTime));
      }
      return new ImmutablePair<>(filteredEventRecords, String.valueOf(newCheckpointTime));
    } catch (JSONException | IOException e) {
      e.printStackTrace();
      throw new HoodieException("Unable to read from SQS: ", e);
    }
  }
}
