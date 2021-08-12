"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[8050],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return m}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),u=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(a),m=r,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return a?n.createElement(f,o(o({ref:t},c),{},{components:a})):n.createElement(f,o({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var u=2;u<i;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},9272:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),o=["components"],s={version:"0.5.2",title:"\u5199\u5165 Hudi \u6570\u636e\u96c6",keywords:["hudi","incremental","batch","stream","processing","Hive","ETL","Spark SQL"],summary:"In this page, we will discuss some available tools for incrementally ingesting & storing data.",toc:!0,last_modified_at:new Date("2019-12-30T19:59:57.000Z"),language:"cn"},l=void 0,u={unversionedId:"writing_data",id:"version-0.5.2/writing_data",isDocsHomePage:!1,title:"\u5199\u5165 Hudi \u6570\u636e\u96c6",description:"\u8fd9\u4e00\u8282\u6211\u4eec\u5c06\u4ecb\u7ecd\u4f7f\u7528DeltaStreamer\u5de5\u5177\u4ece\u5916\u90e8\u6e90\u751a\u81f3\u5176\u4ed6Hudi\u6570\u636e\u96c6\u6444\u53d6\u65b0\u66f4\u6539\u7684\u65b9\u6cd5\uff0c",source:"@site/i18n/cn/docusaurus-plugin-content-docs/version-0.5.2/writing_data.md",sourceDirName:".",slug:"/writing_data",permalink:"/cn/docs/0.5.2/writing_data",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/versioned_docs/version-0.5.2/writing_data.md",version:"0.5.2",frontMatter:{version:"0.5.2",title:"\u5199\u5165 Hudi \u6570\u636e\u96c6",keywords:["hudi","incremental","batch","stream","processing","Hive","ETL","Spark SQL"],summary:"In this page, we will discuss some available tools for incrementally ingesting & storing data.",toc:!0,last_modified_at:"2019-12-30T19:59:57.000Z",language:"cn"},sidebar:"version-0.5.2/docs",previous:{title:"\u4f7f\u7528\u6848\u4f8b",permalink:"/cn/docs/0.5.2/use_cases"},next:{title:"\u67e5\u8be2 Hudi \u6570\u636e\u96c6",permalink:"/cn/docs/0.5.2/querying_data"}},c=[{value:"\u5199\u64cd\u4f5c",id:"\u5199\u64cd\u4f5c",children:[]},{value:"DeltaStreamer",id:"deltastreamer",children:[]},{value:"Datasource Writer",id:"datasource-writer",children:[]},{value:"\u4e0eHive\u540c\u6b65",id:"\u4e0ehive\u540c\u6b65",children:[]},{value:"\u5220\u9664\u6570\u636e",id:"\u5220\u9664\u6570\u636e",children:[]},{value:"\u5b58\u50a8\u7ba1\u7406",id:"\u5b58\u50a8\u7ba1\u7406",children:[]}],p={toc:c};function d(e){var t=e.components,a=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u8fd9\u4e00\u8282\u6211\u4eec\u5c06\u4ecb\u7ecd\u4f7f\u7528",(0,i.kt)("a",{parentName:"p",href:"#deltastreamer"},"DeltaStreamer"),"\u5de5\u5177\u4ece\u5916\u90e8\u6e90\u751a\u81f3\u5176\u4ed6Hudi\u6570\u636e\u96c6\u6444\u53d6\u65b0\u66f4\u6539\u7684\u65b9\u6cd5\uff0c\n\u4ee5\u53ca\u901a\u8fc7\u4f7f\u7528",(0,i.kt)("a",{parentName:"p",href:"#datasource-writer"},"Hudi\u6570\u636e\u6e90"),"\u7684upserts\u52a0\u5feb\u5927\u578bSpark\u4f5c\u4e1a\u7684\u65b9\u6cd5\u3002\n\u5bf9\u4e8e\u6b64\u7c7b\u6570\u636e\u96c6\uff0c\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528\u5404\u79cd\u67e5\u8be2\u5f15\u64ce",(0,i.kt)("a",{parentName:"p",href:"/cn/docs/querying_data"},"\u67e5\u8be2"),"\u5b83\u4eec\u3002"),(0,i.kt)("h2",{id:"\u5199\u64cd\u4f5c"},"\u5199\u64cd\u4f5c"),(0,i.kt)("p",null,"\u5728\u6b64\u4e4b\u524d\uff0c\u4e86\u89e3Hudi\u6570\u636e\u6e90\u53cadelta streamer\u5de5\u5177\u63d0\u4f9b\u7684\u4e09\u79cd\u4e0d\u540c\u7684\u5199\u64cd\u4f5c\u4ee5\u53ca\u5982\u4f55\u6700\u4f73\u5229\u7528\u5b83\u4eec\u53ef\u80fd\u4f1a\u6709\u6240\u5e2e\u52a9\u3002\n\u8fd9\u4e9b\u64cd\u4f5c\u53ef\u4ee5\u5728\u9488\u5bf9\u6570\u636e\u96c6\u53d1\u51fa\u7684\u6bcf\u4e2a\u63d0\u4ea4/\u589e\u91cf\u63d0\u4ea4\u4e2d\u8fdb\u884c\u9009\u62e9/\u66f4\u6539\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"UPSERT\uff08\u63d2\u5165\u66f4\u65b0\uff09")," \uff1a\u8fd9\u662f\u9ed8\u8ba4\u64cd\u4f5c\uff0c\u5728\u8be5\u64cd\u4f5c\u4e2d\uff0c\u901a\u8fc7\u67e5\u627e\u7d22\u5f15\uff0c\u9996\u5148\u5c06\u8f93\u5165\u8bb0\u5f55\u6807\u8bb0\u4e3a\u63d2\u5165\u6216\u66f4\u65b0\u3002\n\u5728\u8fd0\u884c\u542f\u53d1\u5f0f\u65b9\u6cd5\u4ee5\u786e\u5b9a\u5982\u4f55\u6700\u597d\u5730\u5c06\u8fd9\u4e9b\u8bb0\u5f55\u653e\u5230\u5b58\u50a8\u4e0a\uff0c\u5982\u4f18\u5316\u6587\u4ef6\u5927\u5c0f\u4e4b\u7c7b\u540e\uff0c\u8fd9\u4e9b\u8bb0\u5f55\u6700\u7ec8\u4f1a\u88ab\u5199\u5165\u3002\n\u5bf9\u4e8e\u8bf8\u5982\u6570\u636e\u5e93\u66f4\u6539\u6355\u83b7\u4e4b\u7c7b\u7684\u7528\u4f8b\uff0c\u5efa\u8bae\u8be5\u64cd\u4f5c\uff0c\u56e0\u4e3a\u8f93\u5165\u51e0\u4e4e\u80af\u5b9a\u5305\u542b\u66f4\u65b0\u3002"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"INSERT\uff08\u63d2\u5165\uff09")," \uff1a\u5c31\u4f7f\u7528\u542f\u53d1\u5f0f\u65b9\u6cd5\u786e\u5b9a\u6587\u4ef6\u5927\u5c0f\u800c\u8a00\uff0c\u6b64\u64cd\u4f5c\u4e0e\u63d2\u5165\u66f4\u65b0\uff08UPSERT\uff09\u975e\u5e38\u76f8\u4f3c\uff0c\u4f46\u6b64\u64cd\u4f5c\u5b8c\u5168\u8df3\u8fc7\u4e86\u7d22\u5f15\u67e5\u627e\u6b65\u9aa4\u3002\n\u56e0\u6b64\uff0c\u5bf9\u4e8e\u65e5\u5fd7\u91cd\u590d\u6570\u636e\u5220\u9664\u7b49\u7528\u4f8b\uff08\u7ed3\u5408\u4e0b\u9762\u63d0\u5230\u7684\u8fc7\u6ee4\u91cd\u590d\u9879\u7684\u9009\u9879\uff09\uff0c\u5b83\u53ef\u4ee5\u6bd4\u63d2\u5165\u66f4\u65b0\u5feb\u5f97\u591a\u3002\n\u63d2\u5165\u4e5f\u9002\u7528\u4e8e\u8fd9\u79cd\u7528\u4f8b\uff0c\u8fd9\u79cd\u60c5\u51b5\u6570\u636e\u96c6\u53ef\u4ee5\u5141\u8bb8\u91cd\u590d\u9879\uff0c\u4f46\u53ea\u9700\u8981Hudi\u7684\u4e8b\u52a1\u5199/\u589e\u91cf\u63d0\u53d6/\u5b58\u50a8\u7ba1\u7406\u529f\u80fd\u3002"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"BULK_INSERT\uff08\u6279\u63d2\u5165\uff09")," \uff1a\u63d2\u5165\u66f4\u65b0\u548c\u63d2\u5165\u64cd\u4f5c\u90fd\u5c06\u8f93\u5165\u8bb0\u5f55\u4fdd\u5b58\u5728\u5185\u5b58\u4e2d\uff0c\u4ee5\u52a0\u5feb\u5b58\u50a8\u4f18\u5316\u542f\u53d1\u5f0f\u8ba1\u7b97\u7684\u901f\u5ea6\uff08\u4ee5\u53ca\u5176\u5b83\u672a\u63d0\u53ca\u7684\u65b9\u9762\uff09\u3002\n\u6240\u4ee5\u5bf9Hudi\u6570\u636e\u96c6\u8fdb\u884c\u521d\u59cb\u52a0\u8f7d/\u5f15\u5bfc\u65f6\u8fd9\u4e24\u79cd\u64cd\u4f5c\u4f1a\u5f88\u4f4e\u6548\u3002\u6279\u91cf\u63d2\u5165\u63d0\u4f9b\u4e0e\u63d2\u5165\u76f8\u540c\u7684\u8bed\u4e49\uff0c\u4f46\u540c\u65f6\u5b9e\u73b0\u4e86\u57fa\u4e8e\u6392\u5e8f\u7684\u6570\u636e\u5199\u5165\u7b97\u6cd5\uff0c\n\u8be5\u7b97\u6cd5\u53ef\u4ee5\u5f88\u597d\u5730\u6269\u5c55\u6570\u767eTB\u7684\u521d\u59cb\u8d1f\u8f7d\u3002\u4f46\u662f\uff0c\u76f8\u6bd4\u4e8e\u63d2\u5165\u548c\u63d2\u5165\u66f4\u65b0\u80fd\u4fdd\u8bc1\u6587\u4ef6\u5927\u5c0f\uff0c\u6279\u63d2\u5165\u5728\u8c03\u6574\u6587\u4ef6\u5927\u5c0f\u4e0a\u53ea\u80fd\u5c3d\u529b\u800c\u4e3a\u3002")),(0,i.kt)("h2",{id:"deltastreamer"},"DeltaStreamer"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"HoodieDeltaStreamer"),"\u5b9e\u7528\u5de5\u5177 (hudi-utilities-bundle\u4e2d\u7684\u4e00\u90e8\u5206) \u63d0\u4f9b\u4e86\u4eceDFS\u6216Kafka\u7b49\u4e0d\u540c\u6765\u6e90\u8fdb\u884c\u6444\u53d6\u7684\u65b9\u5f0f\uff0c\u5e76\u5177\u6709\u4ee5\u4e0b\u529f\u80fd\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u4eceKafka\u5355\u6b21\u6444\u53d6\u65b0\u4e8b\u4ef6\uff0c\u4eceSqoop\u3001HiveIncrementalPuller\u8f93\u51fa\u6216DFS\u6587\u4ef6\u5939\u4e2d\u7684\u591a\u4e2a\u6587\u4ef6\n",(0,i.kt)("a",{parentName:"li",href:"https://sqoop.apache.org/docs/1.4.2/SqoopUserGuide#_incremental_imports"},"\u589e\u91cf\u5bfc\u5165")),(0,i.kt)("li",{parentName:"ul"},"\u652f\u6301json\u3001avro\u6216\u81ea\u5b9a\u4e49\u8bb0\u5f55\u7c7b\u578b\u7684\u4f20\u5165\u6570\u636e"),(0,i.kt)("li",{parentName:"ul"},"\u7ba1\u7406\u68c0\u67e5\u70b9\uff0c\u56de\u6eda\u548c\u6062\u590d"),(0,i.kt)("li",{parentName:"ul"},"\u5229\u7528DFS\u6216Confluent ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/confluentinc/schema-registry"},"schema\u6ce8\u518c\u8868"),"\u7684Avro\u6a21\u5f0f\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u652f\u6301\u81ea\u5b9a\u4e49\u8f6c\u6362\u64cd\u4f5c")),(0,i.kt)("p",null,"\u547d\u4ee4\u884c\u9009\u9879\u66f4\u8be6\u7ec6\u5730\u63cf\u8ff0\u4e86\u8fd9\u4e9b\u529f\u80fd\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"[hoodie]$ spark-submit --class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer `ls packaging/hudi-utilities-bundle/target/hudi-utilities-bundle-*.jar` --help\nUsage: <main class> [options]\n  Options:\n    --commit-on-errors\n        Commit even when some records failed to be written\n      Default: false\n    --enable-hive-sync\n          Enable syncing to hive\n       Default: false\n    --filter-dupes\n          Should duplicate records from source be dropped/filtered outbefore \n          insert/bulk-insert \n      Default: false\n    --help, -h\n    --hudi-conf\n          Any configuration that can be set in the properties file (using the CLI \n          parameter \"--propsFilePath\") can also be passed command line using this \n          parameter \n          Default: []\n    --op\n      Takes one of these values : UPSERT (default), INSERT (use when input is\n      purely new data/inserts to gain speed)\n      Default: UPSERT\n      Possible Values: [UPSERT, INSERT, BULK_INSERT]\n    --payload-class\n      subclass of HoodieRecordPayload, that works off a GenericRecord.\n      Implement your own, if you want to do something other than overwriting\n      existing value\n      Default: org.apache.hudi.OverwriteWithLatestAvroPayload\n    --props\n      path to properties file on localfs or dfs, with configurations for\n      Hudi client, schema provider, key generator and data source. For\n      Hudi client props, sane defaults are used, but recommend use to\n      provide basic things like metrics endpoints, hive configs etc. For\n      sources, referto individual classes, for supported properties.\n      Default: file:///Users/vinoth/bin/hoodie/src/test/resources/delta-streamer-config/dfs-source.properties\n    --schemaprovider-class\n      subclass of org.apache.hudi.utilities.schema.SchemaProvider to attach\n      schemas to input & target table data, built in options:\n      FilebasedSchemaProvider\n      Default: org.apache.hudi.utilities.schema.FilebasedSchemaProvider\n    --source-class\n      Subclass of org.apache.hudi.utilities.sources to read data. Built-in\n      options: org.apache.hudi.utilities.sources.{JsonDFSSource (default),\n      AvroDFSSource, JsonKafkaSource, AvroKafkaSource, HiveIncrPullSource}\n      Default: org.apache.hudi.utilities.sources.JsonDFSSource\n    --source-limit\n      Maximum amount of data to read from source. Default: No limit For e.g:\n      DFSSource => max bytes to read, KafkaSource => max events to read\n      Default: 9223372036854775807\n    --source-ordering-field\n      Field within source record to decide how to break ties between records\n      with same key in input data. Default: 'ts' holding unix timestamp of\n      record\n      Default: ts\n    --spark-master\n      spark master to use.\n      Default: local[2]\n  * --target-base-path\n      base path for the target Hudi dataset. (Will be created if did not\n      exist first time around. If exists, expected to be a Hudi dataset)\n  * --target-table\n      name of the target table in Hive\n    --transformer-class\n      subclass of org.apache.hudi.utilities.transform.Transformer. UDF to\n      transform raw source dataset to a target dataset (conforming to target\n      schema) before writing. Default : Not set. E:g -\n      org.apache.hudi.utilities.transform.SqlQueryBasedTransformer (which\n      allows a SQL query template to be passed as a transformation function)\n")),(0,i.kt)("p",null,"\u8be5\u5de5\u5177\u91c7\u7528\u5c42\u6b21\u7ed3\u6784\u7ec4\u6210\u7684\u5c5e\u6027\u6587\u4ef6\uff0c\u5e76\u5177\u6709\u53ef\u63d2\u62d4\u7684\u63a5\u53e3\uff0c\u7528\u4e8e\u63d0\u53d6\u6570\u636e\u3001\u751f\u6210\u5bc6\u94a5\u548c\u63d0\u4f9b\u6a21\u5f0f\u3002\n\u4eceKafka\u548cDFS\u6444\u53d6\u6570\u636e\u7684\u793a\u4f8b\u914d\u7f6e\u5728\u8fd9\u91cc\uff1a",(0,i.kt)("inlineCode",{parentName:"p"},"hudi-utilities/src/test/resources/delta-streamer-config"),"\u3002"),(0,i.kt)("p",null,"\u4f8b\u5982\uff1a\u5f53\u60a8\u8ba9Confluent Kafka\u3001Schema\u6ce8\u518c\u8868\u542f\u52a8\u5e76\u8fd0\u884c\u540e\uff0c\u53ef\u4ee5\u7528\u8fd9\u4e2a\u547d\u4ee4\u4ea7\u751f\u4e00\u4e9b\u6d4b\u8bd5\u6570\u636e\n\uff08",(0,i.kt)("a",{parentName:"p",href:"https://docs.confluent.io/current/ksql/docs/tutorials/generate-custom-test-data"},"impressions.avro"),"\uff0c\n\u7531schema-registry\u4ee3\u7801\u5e93\u63d0\u4f9b\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"[confluent-5.0.0]$ bin/ksql-datagen schema=../impressions.avro format=avro topic=impressions key=impressionid\n")),(0,i.kt)("p",null,"\u7136\u540e\u7528\u5982\u4e0b\u547d\u4ee4\u6444\u53d6\u8fd9\u4e9b\u6570\u636e\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"[hoodie]$ spark-submit --class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer `ls packaging/hudi-utilities-bundle/target/hudi-utilities-bundle-*.jar` \\\n  --props file://${PWD}/hudi-utilities/src/test/resources/delta-streamer-config/kafka-source.properties \\\n  --schemaprovider-class org.apache.hudi.utilities.schema.SchemaRegistryProvider \\\n  --source-class org.apache.hudi.utilities.sources.AvroKafkaSource \\\n  --source-ordering-field impresssiontime \\\n  --target-base-path file:///tmp/hudi-deltastreamer-op --target-table uber.impressions \\\n  --op BULK_INSERT\n")),(0,i.kt)("p",null,"\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b\uff0c\u60a8\u53ef\u80fd\u9700\u8981\u9884\u5148\u5c06\u73b0\u6709\u6570\u636e\u96c6\u8fc1\u79fb\u5230Hudi\u3002 \u8bf7\u53c2\u8003",(0,i.kt)("a",{parentName:"p",href:"/cn/docs/migration_guide"},"\u8fc1\u79fb\u6307\u5357"),"\u3002"),(0,i.kt)("h2",{id:"datasource-writer"},"Datasource Writer"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"hudi-spark"),"\u6a21\u5757\u63d0\u4f9b\u4e86DataSource API\uff0c\u53ef\u4ee5\u5c06\u4efb\u4f55DataFrame\u5199\u5165\uff08\u4e5f\u53ef\u4ee5\u8bfb\u53d6\uff09\u5230Hudi\u6570\u636e\u96c6\u4e2d\u3002\n\u4ee5\u4e0b\u662f\u5728\u6307\u5b9a\u9700\u8981\u4f7f\u7528\u7684\u5b57\u6bb5\u540d\u79f0\u7684\u4e4b\u540e\uff0c\u5982\u4f55\u63d2\u5165\u66f4\u65b0DataFrame\u7684\u65b9\u6cd5\uff0c\u8fd9\u4e9b\u5b57\u6bb5\u5305\u62ec\n",(0,i.kt)("inlineCode",{parentName:"p"},"recordKey => _row_key"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"partitionPath => partition"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"precombineKey => timestamp")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'inputDF.write()\n       .format("org.apache.hudi")\n       .options(clientOpts) // \u53ef\u4ee5\u4f20\u5165\u4efb\u4f55Hudi\u5ba2\u6237\u7aef\u53c2\u6570\n       .option(DataSourceWriteOptions.RECORDKEY_FIELD_OPT_KEY(), "_row_key")\n       .option(DataSourceWriteOptions.PARTITIONPATH_FIELD_OPT_KEY(), "partition")\n       .option(DataSourceWriteOptions.PRECOMBINE_FIELD_OPT_KEY(), "timestamp")\n       .option(HoodieWriteConfig.TABLE_NAME, tableName)\n       .mode(SaveMode.Append)\n       .save(basePath);\n')),(0,i.kt)("h2",{id:"\u4e0ehive\u540c\u6b65"},"\u4e0eHive\u540c\u6b65"),(0,i.kt)("p",null,"\u4e0a\u9762\u7684\u4e24\u4e2a\u5de5\u5177\u90fd\u652f\u6301\u5c06\u6570\u636e\u96c6\u7684\u6700\u65b0\u6a21\u5f0f\u540c\u6b65\u5230Hive Metastore\uff0c\u4ee5\u4fbf\u67e5\u8be2\u65b0\u7684\u5217\u548c\u5206\u533a\u3002\n\u5982\u679c\u9700\u8981\u4ece\u547d\u4ee4\u884c\u6216\u5728\u72ec\u7acb\u7684JVM\u4e2d\u8fd0\u884c\u5b83\uff0cHudi\u63d0\u4f9b\u4e86\u4e00\u4e2a",(0,i.kt)("inlineCode",{parentName:"p"},"HiveSyncTool"),"\uff0c\n\u5728\u6784\u5efa\u4e86hudi-hive\u6a21\u5757\u4e4b\u540e\uff0c\u53ef\u4ee5\u6309\u4ee5\u4e0b\u65b9\u5f0f\u8c03\u7528\u5b83\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"cd hudi-hive\n./run_sync_tool.sh\n [hudi-hive]$ ./run_sync_tool.sh --help\nUsage: <main class> [options]\n  Options:\n  * --base-path\n       Basepath of Hudi dataset to sync\n  * --database\n       name of the target database in Hive\n    --help, -h\n       Default: false\n  * --jdbc-url\n       Hive jdbc connect url\n  * --pass\n       Hive password\n  * --table\n       name of the target table in Hive\n  * --user\n       Hive username\n")),(0,i.kt)("h2",{id:"\u5220\u9664\u6570\u636e"},"\u5220\u9664\u6570\u636e"),(0,i.kt)("p",null,"\u901a\u8fc7\u5141\u8bb8\u7528\u6237\u6307\u5b9a\u4e0d\u540c\u7684\u6570\u636e\u8bb0\u5f55\u8d1f\u8f7d\u5b9e\u73b0\uff0cHudi\u652f\u6301\u5bf9\u5b58\u50a8\u5728Hudi\u6570\u636e\u96c6\u4e2d\u7684\u6570\u636e\u6267\u884c\u4e24\u79cd\u7c7b\u578b\u7684\u5220\u9664\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Soft Deletes\uff08\u8f6f\u5220\u9664\uff09")," \uff1a\u4f7f\u7528\u8f6f\u5220\u9664\u65f6\uff0c\u7528\u6237\u5e0c\u671b\u4fdd\u7559\u952e\uff0c\u4f46\u4ec5\u4f7f\u6240\u6709\u5176\u4ed6\u5b57\u6bb5\u7684\u503c\u90fd\u4e3a\u7a7a\u3002\n\u901a\u8fc7\u786e\u4fdd\u9002\u5f53\u7684\u5b57\u6bb5\u5728\u6570\u636e\u96c6\u6a21\u5f0f\u4e2d\u53ef\u4ee5\u4e3a\u7a7a\uff0c\u5e76\u5728\u5c06\u8fd9\u4e9b\u5b57\u6bb5\u8bbe\u7f6e\u4e3anull\u4e4b\u540e\u76f4\u63a5\u5411\u6570\u636e\u96c6\u63d2\u5165\u66f4\u65b0\u8fd9\u4e9b\u8bb0\u5f55\uff0c\u5373\u53ef\u8f7b\u677e\u5b9e\u73b0\u8fd9\u4e00\u70b9\u3002"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Hard Deletes\uff08\u786c\u5220\u9664\uff09")," \uff1a\u8fd9\u79cd\u66f4\u5f3a\u5f62\u5f0f\u7684\u5220\u9664\u662f\u4ece\u6570\u636e\u96c6\u4e2d\u5f7b\u5e95\u5220\u9664\u8bb0\u5f55\u5728\u5b58\u50a8\u4e0a\u7684\u4efb\u4f55\u75d5\u8ff9\u3002\n\u8fd9\u53ef\u4ee5\u901a\u8fc7\u89e6\u53d1\u4e00\u4e2a\u5e26\u6709\u81ea\u5b9a\u4e49\u8d1f\u8f7d\u5b9e\u73b0\u7684\u63d2\u5165\u66f4\u65b0\u6765\u5b9e\u73b0\uff0c\u8fd9\u79cd\u5b9e\u73b0\u53ef\u4ee5\u4f7f\u7528\u603b\u662f\u8fd4\u56deOptional.Empty\u4f5c\u4e3a\u7ec4\u5408\u503c\u7684DataSource\u6216DeltaStreamer\u3002\nHudi\u9644\u5e26\u4e86\u4e00\u4e2a\u5185\u7f6e\u7684",(0,i.kt)("inlineCode",{parentName:"li"},"org.apache.hudi.EmptyHoodieRecordPayload"),"\u7c7b\uff0c\u5b83\u5c31\u662f\u5b9e\u73b0\u4e86\u8fd9\u4e00\u529f\u80fd\u3002")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},' deleteDF // \u4ec5\u5305\u542b\u8981\u5220\u9664\u7684\u8bb0\u5f55\u7684DataFrame\n   .write().format("org.apache.hudi")\n   .option(...) // \u6839\u636e\u8bbe\u7f6e\u9700\u8981\u6dfb\u52a0HUDI\u53c2\u6570\uff0c\u4f8b\u5982\u8bb0\u5f55\u952e\u3001\u5206\u533a\u8def\u5f84\u548c\u5176\u4ed6\u53c2\u6570\n   // \u6307\u5b9arecord_key\uff0cpartition_key\uff0cprecombine_fieldkey\u548c\u5e38\u89c4\u53c2\u6570\n   .option(DataSourceWriteOptions.PAYLOAD_CLASS_OPT_KEY, "org.apache.hudi.EmptyHoodieRecordPayload")\n \n')),(0,i.kt)("h2",{id:"\u5b58\u50a8\u7ba1\u7406"},"\u5b58\u50a8\u7ba1\u7406"),(0,i.kt)("p",null,"Hudi\u8fd8\u5bf9\u5b58\u50a8\u5728Hudi\u6570\u636e\u96c6\u4e2d\u7684\u6570\u636e\u6267\u884c\u51e0\u4e2a\u5173\u952e\u7684\u5b58\u50a8\u7ba1\u7406\u529f\u80fd\u3002\u5728DFS\u4e0a\u5b58\u50a8\u6570\u636e\u7684\u5173\u952e\u65b9\u9762\u662f\u7ba1\u7406\u6587\u4ef6\u5927\u5c0f\u548c\u6570\u91cf\u4ee5\u53ca\u56de\u6536\u5b58\u50a8\u7a7a\u95f4\u3002\n\u4f8b\u5982\uff0cHDFS\u5728\u5904\u7406\u5c0f\u6587\u4ef6\u4e0a\u6027\u80fd\u5f88\u5dee\uff0c\u8fd9\u4f1a\u5bf9Name Node\u7684\u5185\u5b58\u53caRPC\u65bd\u52a0\u5f88\u5927\u7684\u538b\u529b\uff0c\u5e76\u53ef\u80fd\u7834\u574f\u6574\u4e2a\u96c6\u7fa4\u7684\u7a33\u5b9a\u6027\u3002\n\u901a\u5e38\uff0c\u67e5\u8be2\u5f15\u64ce\u53ef\u5728\u8f83\u5927\u7684\u5217\u6587\u4ef6\u4e0a\u63d0\u4f9b\u66f4\u597d\u7684\u6027\u80fd\uff0c\u56e0\u4e3a\u5b83\u4eec\u53ef\u4ee5\u6709\u6548\u5730\u644a\u9500\u83b7\u5f97\u5217\u7edf\u8ba1\u4fe1\u606f\u7b49\u7684\u6210\u672c\u3002\n\u5373\u4f7f\u5728\u67d0\u4e9b\u4e91\u6570\u636e\u5b58\u50a8\u4e0a\uff0c\u5217\u51fa\u5177\u6709\u5927\u91cf\u5c0f\u6587\u4ef6\u7684\u76ee\u5f55\u4e5f\u5e38\u5e38\u6bd4\u8f83\u6162\u3002"),(0,i.kt)("p",null,"\u4ee5\u4e0b\u662f\u4e00\u4e9b\u6709\u6548\u7ba1\u7406Hudi\u6570\u636e\u96c6\u5b58\u50a8\u7684\u65b9\u6cd5\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Hudi\u4e2d\u7684",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/configurations#compactionSmallFileSize"},"\u5c0f\u6587\u4ef6\u5904\u7406\u529f\u80fd"),"\uff0c\u53ef\u4ee5\u5206\u6790\u4f20\u5165\u7684\u5de5\u4f5c\u8d1f\u8f7d\u5e76\u5c06\u63d2\u5165\u5185\u5bb9\u5206\u914d\u5230\u73b0\u6709\u6587\u4ef6\u7ec4\u4e2d\uff0c\n\u800c\u4e0d\u662f\u521b\u5efa\u65b0\u6587\u4ef6\u7ec4\u3002\u65b0\u6587\u4ef6\u7ec4\u4f1a\u751f\u6210\u5c0f\u6587\u4ef6\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u53ef\u4ee5",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/configurations#retainCommits"},"\u914d\u7f6e"),"Cleaner\u6765\u6e05\u7406\u8f83\u65e7\u7684\u6587\u4ef6\u7247\uff0c\u6e05\u7406\u7684\u7a0b\u5ea6\u53ef\u4ee5\u8c03\u6574\uff0c\n\u5177\u4f53\u53d6\u51b3\u4e8e\u67e5\u8be2\u6240\u9700\u7684\u6700\u957f\u65f6\u95f4\u548c\u589e\u91cf\u62c9\u53d6\u6240\u9700\u7684\u56de\u6eaf\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u7528\u6237\u8fd8\u53ef\u4ee5\u8c03\u6574",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/configurations#limitFileSize"},"\u57fa\u7840/parquet\u6587\u4ef6"),"\u3001",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/configurations#logFileMaxSize"},"\u65e5\u5fd7\u6587\u4ef6"),"\u7684\u5927\u5c0f\n\u548c\u9884\u671f\u7684",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/configurations#parquetCompressionRatio"},"\u538b\u7f29\u7387"),"\uff0c\u4f7f\u8db3\u591f\u6570\u91cf\u7684\u63d2\u5165\u88ab\u5206\u5230\u540c\u4e00\u4e2a\u6587\u4ef6\u7ec4\u4e2d\uff0c\u6700\u7ec8\u4ea7\u751f\u5927\u5c0f\u5408\u9002\u7684\u57fa\u7840\u6587\u4ef6\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u667a\u80fd\u8c03\u6574",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/configurations#withBulkInsertParallelism"},"\u6279\u63d2\u5165\u5e76\u884c\u5ea6"),"\uff0c\u53ef\u4ee5\u4ea7\u751f\u5927\u5c0f\u5408\u9002\u7684\u521d\u59cb\u6587\u4ef6\u7ec4\u3002\n\u5b9e\u9645\u4e0a\uff0c\u6b63\u786e\u6267\u884c\u6b64\u64cd\u4f5c\u975e\u5e38\u5173\u952e\uff0c\u56e0\u4e3a\u6587\u4ef6\u7ec4\u4e00\u65e6\u521b\u5efa\u540e\u5c31\u4e0d\u80fd\u5220\u9664\uff0c\u53ea\u80fd\u5982\u524d\u6240\u8ff0\u5bf9\u5176\u8fdb\u884c\u6269\u5c55\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u5bf9\u4e8e\u5177\u6709\u5927\u91cf\u66f4\u65b0\u7684\u5de5\u4f5c\u8d1f\u8f7d\uff0c",(0,i.kt)("a",{parentName:"li",href:"/cn/docs/concepts#merge-on-read-storage"},"\u8bfb\u53d6\u65f6\u5408\u5e76\u5b58\u50a8"),"\u63d0\u4f9b\u4e86\u4e00\u79cd\u5f88\u597d\u7684\u673a\u5236\uff0c\n\u53ef\u4ee5\u5feb\u901f\u5c06\u5176\u6444\u53d6\u5230\u8f83\u5c0f\u7684\u6587\u4ef6\u4e2d\uff0c\u4e4b\u540e\u901a\u8fc7\u538b\u7f29\u5c06\u5b83\u4eec\u5408\u5e76\u4e3a\u8f83\u5927\u7684\u57fa\u7840\u6587\u4ef6\u3002")))}d.isMDXComponent=!0}}]);