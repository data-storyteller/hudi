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
import org.apache.commons.collections.map.MultiKeyMap;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Date;
import java.util.Comparator;
import java.util.ArrayList;
import java.util.Map;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Collections;
import java.util.stream.Collectors;

public class CloudObjectsDfsSelector implements Serializable {
    private static final long serialVersionUID = 2L;

    protected static volatile Logger log = LogManager.getLogger(CloudObjectsDfsSelector.class);
    public static HashMap<String, Boolean> filePathMap = new HashMap<>();

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

    protected static final List<String> IGNORE_FILEPREFIX_LIST = Arrays.asList(".", "_");
    protected static final List<String> ALLOWED_S3_EVENT_PREFIX = Arrays.asList("ObjectCreated");

    protected final TypedProperties props;
    protected final String queueUrl;
    protected final int longPollWait;
    protected final int maxMessagesEachRequest;
    protected final int maxMessageEachBatch;
    protected final int visibilityTimeout;

    public CloudObjectsDfsSelector(TypedProperties props, Configuration hadoopConf) {
        DataSourceUtils.checkRequiredProperties(props, Collections.singletonList(Config.QUEUE_URL_PROP));
        this.props = props;
        this.queueUrl = props.getString(Config.QUEUE_URL_PROP);
        this.longPollWait = (int) props.getOrDefault(Config.QUEUE_LONGPOLLWAIT_PROP, 20);
        this.maxMessageEachBatch = (int) props.getOrDefault(Config.QUEUE_MAXMESSAGESEACHBATCH_PROP, Integer.MAX_VALUE);
        this.visibilityTimeout = (int) props.getOrDefault(Config.QUEUE_VISIBILITYTIMEOUT_PROP, 900);
        this.maxMessagesEachRequest = 10;
    }

    /**
     * Factory method for creating custom CloudObjectsDfsSelector. Default selector
     * to use is {@link CloudObjectsDfsSelector}
     */
    public static CloudObjectsDfsSelector createSourceSelector(TypedProperties props,
                                                               Configuration conf) {
        String sourceSelectorClass = props.getString(CloudObjectsDfsSelector.Config.SOURCE_INPUT_SELECTOR,
                CloudObjectsDfsSelector.class.getName());
        try {
            CloudObjectsDfsSelector selector = (CloudObjectsDfsSelector) ReflectionUtils.loadClass(sourceSelectorClass,
                    new Class<?>[]{TypedProperties.class, Configuration.class},
                    props, conf);

            log.info("Using path selector " + selector.getClass().getName());
            return selector;
        } catch (Exception e) {
            throw new HoodieException("Could not load source selector class " + sourceSelectorClass, e);
        }
    }

    /**
     * Get the list of files changed since last checkpoint.
     *
     * @param sparkContext      JavaSparkContext to help parallelize certain operations
     * @param lastCheckpointStr the last checkpoint time string, empty if first run
     * @param sourceLimit       max bytes to read each time
     * @return the list of files concatenated and their latest modified time
     */
    public Pair<Option<String>, String> getNextFilePathsFromQueue(JavaSparkContext sparkContext, Option<String> lastCheckpointStr, long sourceLimit) {
        log.info("Reading messages....");

        try {
            log.info("Start Checkpoint : " + lastCheckpointStr);

            long lastCheckpointTime = lastCheckpointStr.map(Long::parseLong).orElse(Long.MIN_VALUE);

            AmazonSQS sqs = createAmazonSqsClient();

            List<MultiKeyMap> eligibleFileRecords = listFilesAfterCheckpoint(sqs, lastCheckpointTime);
            log.info("eligible files size: " + eligibleFileRecords.size());

            // sort all files by event time.
            eligibleFileRecords.sort(Comparator.comparingLong(record -> (long) record.get("eventTime")));

            List<String> filteredFiles = new ArrayList<>();
            long currentBytes = 0;
            long newCheckpointTime = lastCheckpointTime;

            for (MultiKeyMap fileRecord : eligibleFileRecords) {

                long eventTime = (long) fileRecord.get("eventTime");
                long fileSize = (long) fileRecord.get("fileSize");
                String filePath = (String) fileRecord.get("filePath");

                // we have enough data, we are done
                // Also, we've read up to a file with a newer event time
                // so that some files with the same event time won't be skipped in next read
                if ((currentBytes + fileSize) >= sourceLimit && eventTime > newCheckpointTime) {
                    break;
                }
                newCheckpointTime = eventTime;
                if (!filteredFiles.contains(filePath)) {
                    filePathMap.put(filePath, Boolean.TRUE);
                    currentBytes += fileSize;
                    filteredFiles.add(filePath);
                }
            }
            if (filteredFiles.isEmpty()) {
                return new ImmutablePair<>(Option.empty(), String.valueOf(newCheckpointTime));
            }
            String pathStr = filteredFiles.stream().collect(Collectors.joining(","));
            return new ImmutablePair<>(Option.ofNullable(pathStr), String.valueOf(newCheckpointTime));
        } catch (JSONException | UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new HoodieException("Unable to read from SQS: ", e);
        }
    }

    /**
     * List messages from queue, filter out illegible files while doing so.
     */
    protected List<MultiKeyMap> listFilesAfterCheckpoint(AmazonSQS sqs, long lastCheckpointTime) throws UnsupportedEncodingException {

        List<MultiKeyMap> result = new ArrayList<>();

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

            List<Message> processedMessages = new ArrayList<>();

            for (Message message : messages) {
                log.debug("message id: " + message.getMessageId());
                boolean isMessageDelete = Boolean.TRUE;

                JSONObject messageBody = new JSONObject(message.getBody());
                if (messageBody.has("Message")) {
                    messageBody = new JSONObject(StringEscapeUtils.unescapeJava(
                            messageBody.getString("Message")));
                }
                if (messageBody.has("Records")) {
                    JSONArray records = messageBody.getJSONArray("Records");
                    for (int j = 0; j < records.length(); ++j) {
                        JSONObject record = records.getJSONObject(j);
                        String eventName = record.getString("eventName");

                        // filter only allowed s3 event types
                        if (ALLOWED_S3_EVENT_PREFIX.stream()
                                .anyMatch(eventName::startsWith)) {

                            MultiKeyMap fileRecord = getFileAttributesFromRecord(record);

                            long eventTime = (long) fileRecord.get("eventTime");
                            String filePath = (String) fileRecord.get("filePath");
                            String fileName = StringUtils.substringAfterLast(filePath, "/");

                            // skip the files with unwanted file name prefix
                            // skip the files already processed
                            if ((eventTime > lastCheckpointTime || !filePathMap.containsKey(filePath)) &&
                                    IGNORE_FILEPREFIX_LIST.stream().noneMatch(fileName::startsWith)) {
                                result.add(fileRecord);
                                isMessageDelete = Boolean.FALSE;
                            }
                        } else {
                            log.info("This S3 event " + eventName + " is not allowed, so ignoring it.");
                        }
                    }
                } else {
                    log.info("Message is not expected format or it's s3:TestEvent");
                }
                if (isMessageDelete) {
                    processedMessages.add(message);
                }
            }
            if (!processedMessages.isEmpty()) {
                deleteProcessedMessages(sqs, processedMessages);
            }

            fetchedMessages += messages.size();
            log.debug("total fetched messages size: " + fetchedMessages);

            // We need to all fetch message to sort and
            // then compare with checkpoint.
            // Queue provides very unordered messages.
            // Not fetching up-to latest message can cause missing files/date
            if (messages.isEmpty()
                    || (fetchedMessages >= this.maxMessageEachBatch)) {
                break;
            }
        }
        return result;
    }

    /**
     * delete batch of processed messages from queue.
     */
    protected void deleteProcessedMessages(AmazonSQS sqs, List<Message> processedMessages) {
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
     * Get the file attributes filePath, eventTime and size from JSONObject record.
     */
    protected MultiKeyMap getFileAttributesFromRecord(JSONObject record) throws UnsupportedEncodingException {

        MultiKeyMap fileRecord = new MultiKeyMap();
        String eventTimeStr = record.getString("eventTime");
        long eventTime = Date.from(Instant.from(DateTimeFormatter.ISO_INSTANT.parse(eventTimeStr))).getTime();

        JSONObject s3Object = record.getJSONObject("s3").getJSONObject("object");
        String bucket = URLDecoder.decode(record.getJSONObject("s3").getJSONObject("bucket").getString("name"), "UTF-8");
        String key = URLDecoder.decode(s3Object.getString("key"), "UTF-8");
        String filePath = "s3://" + bucket + "/" + key;

        fileRecord.put("eventTime", eventTime);
        fileRecord.put("fileSize", s3Object.getLong("size"));
        fileRecord.put("filePath", filePath);
        return fileRecord;
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
