/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.hudi.utilities.sources.helpers;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.GetQueueAttributesRequest;
import com.amazonaws.services.sqs.model.GetQueueAttributesResult;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.amazonaws.services.sqs.model.ReceiveMessageResult;
import java.util.ArrayList;
import java.util.List;
import org.apache.hudi.common.config.TypedProperties;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.ReflectionUtils;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.testutils.HoodieClientTestHarness;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.apache.hudi.utilities.sources.helpers.CloudObjectsSelector.Config.QUEUE_URL_PROP;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class TestCloudObjectsMetaSelector extends HoodieClientTestHarness {

  TypedProperties props;
  String sqsUrl;

  @Mock AmazonSQS sqs;

  @Mock private CloudObjectsMetaSelector cloudObjectsMetaSelector;
  // TestHoodieDeltastreamer
  @BeforeEach
  void setUp() {
    initSparkContexts();
    initPath();
    initFileSystem();
    MockitoAnnotations.initMocks(this);

    props = new TypedProperties();
    sqsUrl = "test-queue";
    props.setProperty(QUEUE_URL_PROP, sqsUrl);
  }

  @AfterEach
  public void teardown() throws Exception {
    Mockito.reset(cloudObjectsMetaSelector);
    cleanupResources();
  }

  @ParameterizedTest
  @ValueSource(classes = {CloudObjectsMetaSelector.class})
  public void getNextEventsFromQueueShouldReturnsEventsFromQueue(Class<?> clazz) {
    // ApproximateNumberOfMessages is a required queue attribute for Cloud object selector

    CloudObjectsMetaSelector selector =
        (CloudObjectsMetaSelector) ReflectionUtils.loadClass(clazz.getName(), props, hadoopConf);

    selector.sqs = sqs;

    // setup s3 record
    String bucket = "test-bucket";
    String key = "test/year=test1/month=test2/day=test3/part-foo-bar.snappy.parquet";
    String body =
        "{\n  \"Type\" : \"Notification\",\n  \"MessageId\" : \"1\",\n  \"TopicArn\" : \"arn:aws:sns:foo:123:"
            + "foo-bar\",\n  \"Subject\" : \"Amazon S3 Notification\",\n  \"Message\" : \"{\\\"Records\\\":"
            + "[{\\\"eventVersion\\\":\\\"2.1\\\",\\\"eventSource\\\":\\\"aws:s3\\\",\\\"awsRegion\\\":\\\"us"
            + "-west-2\\\",\\\"eventTime\\\":\\\"2021-07-27T09:05:36.755Z\\\",\\\"eventName\\\":\\\"ObjectCreated"
            + ":Copy\\\",\\\"userIdentity\\\":{\\\"principalId\\\":\\\"AWS:test\\\"},\\\"requestParameters\\\":"
            + "{\\\"sourceIPAddress\\\":\\\"0.0.0.0\\\"},\\\"responseElements\\\":{\\\"x-amz-request-id\\\":\\\""
            + "test\\\",\\\"x-amz-id-2\\\":\\\"foobar\\\"},\\\"s3\\\":{\\\"s3SchemaVersion\\\":\\\"1.0\\\",\\\""
            + "configurationId\\\":\\\"foobar\\\",\\\"bucket\\\":{\\\"name\\\":\\\""
            + bucket
            + "\\\",\\\"ownerIdentity\\\":{\\\"principalId\\\":\\\"foo\\\"},\\\"arn\\\":\\\"arn:aws:s3:::foo\\\"}"
            + ",\\\"object\\\":{\\\"key\\\":\\\""
            + key
            + "\\\",\\\"size\\\":123,\\\"eTag\\\":\\\"test\\\",\\\"sequencer\\\":\\\"1\\\"}}}]}\"}";

    Message message = new Message();
    message.setReceiptHandle("1");
    message.setMessageId("1");
    message.setBody(body);

    List<Message> messages = new ArrayList<>();
    messages.add(message);

    ReceiveMessageResult receiveMessageResult = new ReceiveMessageResult();
    receiveMessageResult.setMessages(messages);

    when(sqs.getQueueAttributes(any(GetQueueAttributesRequest.class)))
        .thenReturn(
            new GetQueueAttributesResult().addAttributesEntry("ApproximateNumberOfMessages", "1"));

    when(sqs.receiveMessage(any(ReceiveMessageRequest.class))).thenReturn(receiveMessageResult);

    List<Message> processed = new ArrayList<>();

    // test the return values
    Pair<List<String>, String> eventFromQueue =
        selector.getNextEventsFromQueue(jsc, Option.empty(), processed);

    assertEquals(1, eventFromQueue.getLeft().size());
    assertEquals(1, processed.size());
    assertEquals(
        key,
        new JSONObject(eventFromQueue.getLeft().get(0))
            .getJSONObject("s3")
            .getJSONObject("object")
            .getString("key"));
    assertEquals("1627376736755", eventFromQueue.getRight());
  }
}
