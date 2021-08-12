"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[9065],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return g}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),f=p(n),g=a,m=f["".concat(u,".").concat(g)]||f[g]||l[g]||o;return n?r.createElement(m,i(i({ref:t},s),{},{components:n})):r.createElement(m,i({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},837:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return u},metadata:function(){return p},toc:function(){return s},default:function(){return f}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={title:"Ingesting Database changes via Sqoop/Hudi",excerpt:"Learn how to ingesting changes from a HUDI dataset using Sqoop/Hudi",author:"vinoth",category:"blog"},u=void 0,p={permalink:"/blog/2019/09/09/ingesting-database-changes",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2019-09-09-ingesting-database-changes.md",source:"@site/blog/2019-09-09-ingesting-database-changes.md",title:"Ingesting Database changes via Sqoop/Hudi",description:"Very simple in just 2 steps.",date:"2019-09-09T00:00:00.000Z",formattedDate:"September 9, 2019",tags:[],readingTime:.605,truncated:!0,prevItem:{title:"Delete support in Hudi",permalink:"/blog/2020/01/15/delete-support-in-hudi"},nextItem:{title:"Registering sample dataset to Hive via beeline",permalink:"/blog/2019/05/14/registering-dataset-to-hive"}},s=[],l={toc:s};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Very simple in just 2 steps."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Step 1"),": Extract new changes to users table in MySQL, as avro data files on DFS"))}f.isMDXComponent=!0}}]);