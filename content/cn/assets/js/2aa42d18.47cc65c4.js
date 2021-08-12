"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[3448],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),f=r,h=p["".concat(s,".").concat(f)]||p[f]||d[f]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5986:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return c},default:function(){return p}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={title:"Building High-Performance Data Lake Using Apache Hudi and Alluxio at T3Go",excerpt:"How T3Go\u2019s high-performance data lake using Apache Hudi and Alluxio shortened the time for data ingestion into the lake by up to a factor of 2. Data analysts using Presto, Hudi, and Alluxio in conjunction to query data on the lake saw queries speed up by 10 times faster.",author:"t3go",category:"blog"},s="Building High-Performance Data Lake Using Apache Hudi and Alluxio at T3Go",u={permalink:"/cn/blog/2020/12/01/high-perf-data-lake-with-hudi-and-alluxio-t3go",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-12-01-high-perf-data-lake-with-hudi-and-alluxio-t3go.md",source:"@site/blog/2020-12-01-high-perf-data-lake-with-hudi-and-alluxio-t3go.md",title:"Building High-Performance Data Lake Using Apache Hudi and Alluxio at T3Go",description:"T3Go  is China\u2019s first platform for smart travel based on the Internet of Vehicles. In this article, Trevor Zhang and Vino Yang from T3Go describe the evolution of their data lake architecture, built on cloud-native or open-source technologies including Alibaba OSS, Apache Hudi, and Alluxio. Today, their data lake stores petabytes of data, supporting hundreds of pipelines and tens of thousands of tasks daily. It is essential for business units at T3Go including Data Warehouse, Internet of Vehicles, Order Dispatching, Machine Learning, and self-service query analysis.",date:"2020-12-01T00:00:00.000Z",formattedDate:"December 1, 2020",tags:[],readingTime:7.915,truncated:!0,prevItem:{title:"Optimize Data lake layout using Clustering in Apache Hudi",permalink:"/cn/blog/2021/01/27/hudi-clustering-intro"},nextItem:{title:"Employing the right indexes for fast updates, deletes in Apache Hudi",permalink:"/cn/blog/2020/11/11/hudi-indexing-mechanisms"}},c=[],d={toc:c};function p(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.t3go.cn/"},"T3Go"),"  is China\u2019s first platform for smart travel based on the Internet of Vehicles. In this article, Trevor Zhang and Vino Yang from T3Go describe the evolution of their data lake architecture, built on cloud-native or open-source technologies including Alibaba OSS, Apache Hudi, and Alluxio. Today, their data lake stores petabytes of data, supporting hundreds of pipelines and tens of thousands of tasks daily. It is essential for business units at T3Go including Data Warehouse, Internet of Vehicles, Order Dispatching, Machine Learning, and self-service query analysis."),(0,i.kt)("p",null,"In this blog, you will see how we slashed data ingestion time by half using Hudi and Alluxio. Furthermore, data analysts using Presto, Hudi, and Alluxio saw the queries speed up by 10 times. We built our data lake based on data orchestration for multiple stages of our data pipeline, including ingestion and analytics."))}p.isMDXComponent=!0}}]);