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

package org.apache.hudi.utilities.sources;

import org.apache.hudi.utilities.sources.helpers.CloudObjectsMetaSelector;
import org.apache.hudi.common.config.TypedProperties;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.utilities.schema.SchemaProvider;
import org.apache.hudi.utilities.sources.RowSource;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import java.util.List;

/**
 * DFS Source that reads parquet data.
 */
public class CloudObjectsMetaSource extends RowSource {

    private final CloudObjectsMetaSelector pathSelector;

    public CloudObjectsMetaSource(TypedProperties props, JavaSparkContext sparkContext, SparkSession sparkSession,
                                  SchemaProvider schemaProvider) {
        super(props, sparkContext, sparkSession, schemaProvider);
        this.pathSelector = CloudObjectsMetaSelector.createSourceSelector(props, this.sparkContext.hadoopConfiguration());
    }

    @Override
    public Pair<Option<Dataset<Row>>, String> fetchNextBatch(Option<String> lastCkptStr, long sourceLimit) {

        Pair<List<String>, String> selectPathsWithLatestSQSMessage =
                pathSelector.getNextEventsFromQueue(sparkContext, lastCkptStr, sourceLimit);
        if (selectPathsWithLatestSQSMessage.getLeft().isEmpty()) {
            return Pair.of(Option.empty(), selectPathsWithLatestSQSMessage.getRight());
        } else {
            return Pair.of(Option.of(fromFiles(selectPathsWithLatestSQSMessage.getLeft())), selectPathsWithLatestSQSMessage.getRight());
        }
    }

    private Dataset<Row> fromFiles(List<String> jsonData) {
        return sparkSession.read().json(sparkSession.createDataset(jsonData, Encoders.STRING()));
    }
    public static void main(String[] args) {

    }
}