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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.apache.hudi.DataSourceReadOptions;
import org.apache.hudi.DataSourceUtils;
import org.apache.hudi.common.config.TypedProperties;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.hive.SlashEncodedDayPartitionValueExtractor;
import org.apache.hudi.utilities.schema.SchemaProvider;
import org.apache.hudi.utilities.sources.helpers.IncrSourceHelper;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.DataFrameReader;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

/**
 * Cloud Objects Hoodie Incr Source Class. {@link CloudObjectsHoodieIncrSource}.This source will use
 * the cloud files meta information form cloud meta hoodie table generate by CloudObjectsMetaSource.
 */
public class CloudObjectsHoodieIncrSource extends RowSource {

  private static final Logger LOG = LogManager.getLogger(CloudObjectsHoodieIncrSource.class);

  public CloudObjectsHoodieIncrSource(
      TypedProperties props,
      JavaSparkContext sparkContext,
      SparkSession sparkSession,
      SchemaProvider schemaProvider) {
    super(props, sparkContext, sparkSession, schemaProvider);
  }

  @SuppressWarnings("checkstyle:WhitespaceAfter")
  @Override
  public Pair<Option<Dataset<Row>>, String> fetchNextBatch(
      Option<String> lastCkptStr, long sourceLimit) {

    DataSourceUtils.checkRequiredProperties(
        props, Collections.singletonList(Config.HOODIE_SRC_BASE_PATH));

    String srcPath = props.getString(Config.HOODIE_SRC_BASE_PATH);
    int numInstantsPerFetch =
        props.getInteger(Config.NUM_INSTANTS_PER_FETCH, Config.DEFAULT_NUM_INSTANTS_PER_FETCH);
    boolean readLatestOnMissingCkpt =
        props.getBoolean(
            Config.READ_LATEST_INSTANT_ON_MISSING_CKPT,
            Config.DEFAULT_READ_LATEST_INSTANT_ON_MISSING_CKPT);

    // Use begin Instant if set and non-empty
    Option<String> beginInstant =
        lastCkptStr.isPresent()
            ? lastCkptStr.get().isEmpty() ? Option.empty() : lastCkptStr
            : Option.empty();

    Pair<String, String> instantEndpts =
        IncrSourceHelper.calculateBeginAndEndInstants(
            sparkContext, srcPath, numInstantsPerFetch, beginInstant, readLatestOnMissingCkpt);

    if (instantEndpts.getKey().equals(instantEndpts.getValue())) {
      LOG.warn("Already caught up. Begin Checkpoint was :" + instantEndpts.getKey());
      return Pair.of(Option.empty(), instantEndpts.getKey());
    }

    // Do Incr pull. Set end instant if available
    DataFrameReader reader =
        sparkSession
            .read()
            .format("org.apache.hudi")
            .option(
                DataSourceReadOptions.QUERY_TYPE_OPT_KEY().key(),
                DataSourceReadOptions.QUERY_TYPE_INCREMENTAL_OPT_VAL())
            .option(
                DataSourceReadOptions.BEGIN_INSTANTTIME_OPT_KEY().key(), instantEndpts.getLeft())
            .option(
                DataSourceReadOptions.END_INSTANTTIME_OPT_KEY().key(), instantEndpts.getRight());

    Dataset<Row> source = reader.load(srcPath);

    // Extract distinct file keys from cloud meta hoodie table
    final List<Row> cloudMetaDf =
        source.filter("s3.object.size > 0").select("s3.bucket.name", "s3.object.key").distinct().collectAsList();

    // Create S3 paths
    List<String> cloudFiles = new ArrayList<>();
    for (Row row : cloudMetaDf) {
      String bucket = row.getString(0);
      String key = row.getString(1);
      String filePath = "s3://" + bucket + "/" + key;
      cloudFiles.add(filePath);
    }
    String pathStr = String.join(",", cloudFiles);

    // log.info("Final Schema from Source is :" + src.schema());
    return Pair.of(Option.of(fromFiles(pathStr)), instantEndpts.getRight());
  }

  /** Function to create Dataset from files. */
  private Dataset<Row> fromFiles(String pathStr) {
    return sparkSession.read().parquet(pathStr.split(","));
  }

  /** Config Class. {@link Config} */
  protected static class Config {

    /** {@value #HOODIE_SRC_BASE_PATH} is the base-path for the source Hoodie table. */
    private static final String HOODIE_SRC_BASE_PATH =
        "hoodie.deltastreamer.source.hoodieincr.path";

    /**
     * {@value #NUM_INSTANTS_PER_FETCH} allows the max number of instants whose changes can be
     * incrementally fetched.
     */
    private static final String NUM_INSTANTS_PER_FETCH =
        "hoodie.deltastreamer.source.hoodieincr.num_instants";

    private static final Integer DEFAULT_NUM_INSTANTS_PER_FETCH = 1;

    /**
     * {@value #HOODIE_SRC_PARTITION_FIELDS} specifies partition fields that needs to be added to
     * source table after parsing _hoodie_partition_path.
     */
    private static final String HOODIE_SRC_PARTITION_FIELDS =
        "hoodie.deltastreamer.source.hoodieincr.partition.fields";

    /**
     * {@value #HOODIE_SRC_PARTITION_EXTRACTORCLASS} PartitionValueExtractor class to extract
     * partition fields from _hoodie_partition_path.
     */
    private static final String HOODIE_SRC_PARTITION_EXTRACTORCLASS =
        "hoodie.deltastreamer.source.hoodieincr.partition.extractor.class";

    private static final String DEFAULT_HOODIE_SRC_PARTITION_EXTRACTORCLASS =
        SlashEncodedDayPartitionValueExtractor.class.getCanonicalName();

    /**
     * {@value #READ_LATEST_INSTANT_ON_MISSING_CKPT} allows delta-streamer to incrementally fetch
     * from latest committed instant when checkpoint is not provided.
     */
    private static final String READ_LATEST_INSTANT_ON_MISSING_CKPT =
        "hoodie.deltastreamer.source.hoodieincr.read_latest_on_missing_ckpt";

    private static final Boolean DEFAULT_READ_LATEST_INSTANT_ON_MISSING_CKPT = true;
  }
}
