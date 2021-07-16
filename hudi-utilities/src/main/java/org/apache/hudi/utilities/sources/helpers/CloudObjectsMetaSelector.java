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
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.hudi.DataSourceUtils;
import org.apache.hudi.common.config.TypedProperties;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.ReflectionUtils;
import org.apache.hudi.common.util.collection.ImmutablePair;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.exception.HoodieException;

import org.apache.hadoop.conf.Configuration;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.spark.api.java.JavaSparkContext;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.Serializable;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class CloudObjectsMetaSelector implements Serializable {
    private static final long serialVersionUID = 2L;

    protected static volatile Logger log = LogManager.getLogger(CloudObjectsMetaSelector.class);

    /**
     * Configs supported.
     */
    public static class Config {

        public static final String QUEUE_URL_PROP = "hoodie.deltastreamer.source.queue.url";
        public static final String QUEUE_LONGPOLLWAIT_PROP = "hoodie.deltastreamer.source.queue.long_poll_wait";
        public static final String QUEUE_MAXMESSAGESEACHBATCH_PROP = "hoodie.deltastreamer.source.queue.max_messages_each_batch";
        public static final String QUEUE_VISIBILITYTIMEOUT_PROP = "hoodie.deltastreamer.source.queue.visibility_timeout_seconds";
        public static final String SOURCE_INPUT_SELECTOR = "hoodie.deltastreamer.source.input.selector";
    }

    protected static final List<String> ALLOWED_S3_EVENT_PREFIX = Arrays.asList("ObjectCreated");

    protected final TypedProperties props;
    protected final String queueUrl;
    protected final int longPollWait;
    protected final int maxMessagesEachRequest;
    protected final int maxMessageEachBatch;
    protected final int visibilityTimeout;

    public CloudObjectsMetaSelector(TypedProperties props, Configuration hadoopConf) {
        DataSourceUtils.checkRequiredProperties(props, Collections.singletonList(Config.QUEUE_URL_PROP));
        this.props = props;
        this.queueUrl = props.getString(Config.QUEUE_URL_PROP);
        this.longPollWait = (int) props.getOrDefault(Config.QUEUE_LONGPOLLWAIT_PROP, 20);
        this.maxMessageEachBatch = (int) props.getOrDefault(Config.QUEUE_MAXMESSAGESEACHBATCH_PROP, 20);
        this.visibilityTimeout = (int) props.getOrDefault(Config.QUEUE_VISIBILITYTIMEOUT_PROP, 30);
        this.maxMessagesEachRequest = 10;
    }

    /**
     * Factory method for creating custom CloudObjectsMetaSelector. Default selector
     * to use is {@link CloudObjectsMetaSelector}
     */
    public static CloudObjectsMetaSelector createSourceSelector(TypedProperties props,
                                                                Configuration conf) {
        String sourceSelectorClass = props.getString(CloudObjectsMetaSelector.Config.SOURCE_INPUT_SELECTOR,
                CloudObjectsMetaSelector.class.getName());
        try {
            CloudObjectsMetaSelector selector = (CloudObjectsMetaSelector) ReflectionUtils.loadClass(sourceSelectorClass,
                    new Class<?>[]{TypedProperties.class, Configuration.class},
                    props, conf);

            log.info("Using path selector " + selector.getClass().getName());
            return selector;
        } catch (Exception e) {
            throw new HoodieException("Could not load source selector class " + sourceSelectorClass, e);
        }
    }

    /**
     * Get the list of events from queue.
     *
     * @param sparkContext      JavaSparkContext to help parallelize certain operations
     * @param lastCheckpointStr the last checkpoint time string, empty if first run
     * @param sourceLimit       max bytes to read each time
     * @return the list of events concatenated and their latest modified time
     */
    public Pair<List<String>, String> getNextEventsFromQueue(JavaSparkContext sparkContext, Option<String> lastCheckpointStr, long sourceLimit) {
        log.info("Reading messages....");

        try {
            log.info("Start Checkpoint : " + lastCheckpointStr);

            long lastCheckpointTime = lastCheckpointStr.map(Long::parseLong).orElse(Long.MIN_VALUE);

            AmazonSQS sqs = createAmazonSqsClient();

            List<Map> eligibleEventRecords = getEligibleEvents(sqs);
            log.info("eligible events size: " + eligibleEventRecords.size());

            // sort all events by event time.
            eligibleEventRecords.sort(Comparator.comparingLong(record -> Date.from(Instant.from(
                    DateTimeFormatter.ISO_INSTANT.parse(
                            (String) record.get("eventTime")))).getTime()));

            List<String> filteredFiles = new ArrayList<>();
            long newCheckpointTime = lastCheckpointTime;

            for (Map eventRecord : eligibleEventRecords) {
                newCheckpointTime = Date.from(Instant.from(
                        DateTimeFormatter.ISO_INSTANT.parse(
                                (String) eventRecord.get("eventTime")))).getTime();

                // Currently HUDI don't supports column names like request-amz-id-2
                eventRecord.remove("responseElements");

                filteredFiles.add(new ObjectMapper().writeValueAsString(eventRecord));
            }
            if (filteredFiles.isEmpty()) {
                return new ImmutablePair<>(filteredFiles, String.valueOf(newCheckpointTime));
            }
            return new ImmutablePair<>(filteredFiles, String.valueOf(newCheckpointTime));
        } catch (JSONException | IOException e) {
            e.printStackTrace();
            throw new HoodieException("Unable to read from SQS: ", e);
        }
    }

    /**
     * List messages from queue, filter out illegible events while doing so.
     */
    protected List<Map> getEligibleEvents(AmazonSQS sqs) throws IOException {

        List<Map> result = new ArrayList<>();

        ReceiveMessageRequest receiveMessageRequest = new ReceiveMessageRequest()
                .withQueueUrl(this.queueUrl)
                .withWaitTimeSeconds(this.longPollWait)
                .withVisibilityTimeout(this.visibilityTimeout);
        receiveMessageRequest.setMaxNumberOfMessages(this.maxMessagesEachRequest);

        long fetchedMessages = 0;

        // Get count for available messages
        Map<String, String> queueAttributesResult = getSqsQueueAttributes(sqs);
        long ApproxMessagesAvailable = Long.parseLong(queueAttributesResult.get("ApproximateNumberOfMessages"));
        log.info("Approx. " + ApproxMessagesAvailable + "messages available in queue.");

        for (int i = 0; i < (int) Math.ceil((double) ApproxMessagesAvailable / this.maxMessagesEachRequest) + 1; ++i) {
            List<Message> messages = sqs.receiveMessage(receiveMessageRequest).getMessages();
            log.debug("Messages size: " + messages.size());

            List<Message> ineligibleMessages = new ArrayList<>();

            for (Message message : messages) {
                log.debug("message id: " + message.getMessageId());
                boolean isMessageDelete = Boolean.TRUE;

                JSONObject messageBody = new JSONObject(message.getBody());
                Map<String, Object> messageMap = new HashMap<>();
                if (messageBody.has("Message")) {
                    ObjectMapper mapper = new ObjectMapper();
                    messageMap = mapper.readValue(messageBody.getString("Message"), Map.class);
//                    messageBody = new JSONObject(StringEscapeUtils.unescapeJava(
//                            messageBody.getString("Message")));
                }

                if (messageBody.has("Records")) {
                    List<Map<String, Object>> records = (List<Map<String, Object>>) messageMap.get("Records");
                    for (Map<String, Object> record : records) {
                        String eventName = (String ) record.get("eventName");

                        // filter only allowed s3 event types
                        if (ALLOWED_S3_EVENT_PREFIX.stream()
                                .anyMatch(eventName::startsWith)) {

                            result.add(record);
                            isMessageDelete = Boolean.FALSE;

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
                deleteBatchOfMessages(sqs, ineligibleMessages);
            }

            fetchedMessages += messages.size();
            log.debug("total fetched messages size: " + fetchedMessages);

            // We need to all fetch message to sort and
            // then compare with checkpoint.
            // Queue provides very unordered messages.
            // Not fetching up-to latest message can cause missing events
            if (messages.isEmpty()
                    || (fetchedMessages >= this.maxMessageEachBatch)) {
                break;
            }
        }
        return result;
    }

    /**
     * delete batch of messages from queue.
     */
    protected void deleteBatchOfMessages(AmazonSQS sqs, List<Message> processedMessages) {
        DeleteMessageBatchRequest deleteBatchReq = new DeleteMessageBatchRequest().withQueueUrl(this.queueUrl);
        List<DeleteMessageBatchRequestEntry> deleteEntries = deleteBatchReq.getEntries();

        for (Message message : processedMessages) {
            deleteEntries.add(new DeleteMessageBatchRequestEntry()
                    .withId(message.getMessageId())
                    .withReceiptHandle(message.getReceiptHandle()));
        }
        DeleteMessageBatchResult deleteResult = sqs.deleteMessageBatch(deleteBatchReq);
        List<String> deleteFailures = deleteResult.getFailed()
                .stream()
                .map(BatchResultErrorEntry::getId)
                .collect(Collectors.toList());

        if (!deleteFailures.isEmpty()) {
            log.info("Failed to delete " + deleteFailures.size()
                    + " messages out of " + deleteEntries.size()
                    + " from queue.");
        } else {
            log.info("Successfully deleted " + deleteEntries.size() + " messages from queue.");
        }
    }

    /**
     * Amazon SQS Client Builder
     */
    protected AmazonSQS createAmazonSqsClient() {
        // ToDO - Update it for handling AWS Client creation but not using default only.
        return AmazonSQSClientBuilder.defaultClient();
    }

    /**
     * Get SQS queue attributes
     */
    protected Map<String, String> getSqsQueueAttributes(AmazonSQS sqs) {
        GetQueueAttributesResult queueAttributesResult = sqs.getQueueAttributes(new GetQueueAttributesRequest(queueUrl).withAttributeNames("ApproximateNumberOfMessages"));
        return queueAttributesResult.getAttributes();
    }

}
