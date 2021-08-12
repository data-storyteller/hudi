"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[995],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),u=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(r),f=o,m=d["".concat(p,".").concat(f)]||d[f]||l[f]||a;return r?n.createElement(m,i(i({ref:t},s),{},{components:r})):n.createElement(m,i({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6326:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return u},toc:function(){return s},default:function(){return d}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],c={title:"Export Hudi datasets as a copy or as different formats",excerpt:"Learn how to copy or export HUDI dataset in various formats.",author:"rxu",category:"blog"},p=void 0,u={permalink:"/cn/blog/2020/03/22/exporting-hudi-datasets",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2020-03-22-exporting-hudi-datasets.md",source:"@site/blog/2020-03-22-exporting-hudi-datasets.md",title:"Export Hudi datasets as a copy or as different formats",description:"Copy to Hudi dataset",date:"2020-03-22T00:00:00.000Z",formattedDate:"March 22, 2020",tags:[],readingTime:1.695,truncated:!0,prevItem:{title:"Apache Hudi Support on Apache Zeppelin",permalink:"/cn/blog/2020/04/27/apache-hudi-apache-zepplin"},nextItem:{title:"Change Capture Using AWS Database Migration Service and Hudi",permalink:"/cn/blog/2020/01/20/change-capture-using-aws"}},s=[{value:"Copy to Hudi dataset",id:"copy-to-hudi-dataset",children:[]}],l={toc:s};function d(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"copy-to-hudi-dataset"},"Copy to Hudi dataset"),(0,a.kt)("p",null,"Similar to the existing  ",(0,a.kt)("inlineCode",{parentName:"p"},"HoodieSnapshotCopier"),", the Exporter scans the source dataset and then makes a copy of it to the target output path."))}d.isMDXComponent=!0}}]);