"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[6665],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,m=d["".concat(u,".").concat(f)]||d[f]||s[f]||o;return n?r.createElement(m,i(i({ref:t},l),{},{components:n})):r.createElement(m,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8198:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return p},toc:function(){return l},default:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={title:"Apache Hudi meets Apache Flink",excerpt:"The design and latest progress of the integration of Apache Hudi and Apache Flink.",author:"wangxianghu",category:"blog"},u=void 0,p={permalink:"/cn/blog/2020/10/15/apache-hudi-meets-apache-flink",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-10-15-apache-hudi-meets-apache-flink.md",source:"@site/blog/2020-10-15-apache-hudi-meets-apache-flink.md",title:"Apache Hudi meets Apache Flink",description:"Apache Hudi (Hudi for short) is a data lake framework created at Uber. Hudi joined the Apache incubator for incubation in January 2019, and was promoted to the top Apache project in May 2020. It is one of the most popular data lake frameworks.",date:"2020-10-15T00:00:00.000Z",formattedDate:"October 15, 2020",tags:[],readingTime:9.705,truncated:!0,prevItem:{title:"Apply record level changes from relational databases to Amazon S3 data lake using Apache Hudi on Amazon EMR and AWS Database Migration Service",permalink:"/cn/blog/2020/10/19/hudi-meets-aws-emr-and-aws-dms"},nextItem:{title:"How nClouds Helps Accelerate Data Delivery with Apache Hudi on Amazon EMR",permalink:"/cn/blog/2020/10/06/cdc-solution-using-hudi-by-nclouds"}},l=[],s={toc:l};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Apache Hudi (Hudi for short) is a data lake framework created at Uber. Hudi joined the Apache incubator for incubation in January 2019, and was promoted to the top Apache project in May 2020. It is one of the most popular data lake frameworks."))}d.isMDXComponent=!0}}]);