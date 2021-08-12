"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[6166],{3905:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return m}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(a),m=i,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return a?n.createElement(h,r(r({ref:t},p),{},{components:a})):n.createElement(h,r({ref:t},p))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,r=new Array(o);r[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var u=2;u<o;u++)r[u]=a[u];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2673:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return p},default:function(){return d}});var n=a(7462),i=a(3366),o=(a(7294),a(3905)),r=["components"],l={title:"Developer Setup",sidebar_position:4,keywords:["hudi","ide","developer","setup"],toc:!0,last_modified_at:new Date("2019-12-30T19:59:57.000Z")},s=void 0,u={unversionedId:"developer-setup",id:"developer-setup",isDocsHomePage:!1,title:"Developer Setup",description:"Pre-requisites",source:"@site/contribute/developer-setup.md",sourceDirName:".",slug:"/developer-setup",permalink:"/contribute/developer-setup",version:"current",sidebarPosition:4,frontMatter:{title:"Developer Setup",sidebar_position:4,keywords:["hudi","ide","developer","setup"],toc:!0,last_modified_at:"2019-12-30T19:59:57.000Z"},sidebar:"contribute",previous:{title:"How to Contribute",permalink:"/contribute/how-to-contribute"},next:{title:"Report Security Issues",permalink:"/contribute/report-security-issues"}},p=[{value:"Pre-requisites",id:"pre-requisites",children:[]},{value:"IDE Setup",id:"ide-setup",children:[]},{value:"Accounts and Permissions",id:"accounts-and-permissions",children:[]},{value:"Life of a Contributor",id:"life-of-a-contributor",children:[{value:"Filing JIRAs",id:"filing-jiras",children:[]},{value:"Claiming JIRAs",id:"claiming-jiras",children:[]},{value:"Contributing Code",id:"contributing-code",children:[]},{value:"Coding guidelines",id:"coding-guidelines",children:[]},{value:"Reviewing Code/RFCs",id:"reviewing-coderfcs",children:[]},{value:"Suggest Changes",id:"suggest-changes",children:[]}]},{value:"Releases",id:"releases",children:[]},{value:"Communication",id:"communication",children:[]},{value:"Code &amp; Project Structure",id:"code--project-structure",children:[]},{value:"Code WalkThrough",id:"code-walkthrough",children:[]},{value:"Docker Setup",id:"docker-setup",children:[]},{value:"Remote Debugging",id:"remote-debugging",children:[]},{value:"Website",id:"website",children:[]}],c={toc:p};function d(e){var t=e.components,l=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,n.Z)({},c,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"pre-requisites"},"Pre-requisites"),(0,o.kt)("p",null,"To contribute code, you need"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a GitHub account"),(0,o.kt)("li",{parentName:"ul"},"a Linux (or) macOS development environment with Java JDK 8, Apache Maven (3.x+) installed"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.docker.com/"},"Docker")," installed for running demo, integ tests or building website"),(0,o.kt)("li",{parentName:"ul"},"for large contributions, a signed ",(0,o.kt)("a",{parentName:"li",href:"https://www.apache.org/licenses/icla.pdf"},"Individual Contributor License\nAgreement")," (ICLA) to the Apache\nSoftware Foundation (ASF)."),(0,o.kt)("li",{parentName:"ul"},"(Recommended) Create an account on ",(0,o.kt)("a",{parentName:"li",href:"https://issues.apache.org/jira/projects/HUDI/summary"},"JIRA")," to open issues/find similar issues."),(0,o.kt)("li",{parentName:"ul"},"(Recommended) Join our dev mailing list & slack channel, listed on ",(0,o.kt)("a",{parentName:"li",href:"/contribute/get-involved"},"community")," page.")),(0,o.kt)("h2",{id:"ide-setup"},"IDE Setup"),(0,o.kt)("p",null,"To contribute, you would need to do the following"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Fork the Hudi code on Github & then clone your own fork locally. Once cloned, we recommend building as per instructions on ",(0,o.kt)("a",{parentName:"p",href:"/docs/quick-start-guide"},"spark quickstart")," or ",(0,o.kt)("a",{parentName:"p",href:"/docs/flink-quick-start-guide"},"flink quickstart"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"[","Recommended","]"," We have embraced the code style largely based on ",(0,o.kt)("a",{parentName:"p",href:"https://google.github.io/styleguide/javaguide"},"google format"),". Please setup your IDE with style files from ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi/tree/master/style"},"\\<project root",">","/style/"),". These instructions have been tested on IntelliJ.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"[","Recommended","]"," Set up the ",(0,o.kt)("a",{parentName:"p",href:"https://plugins.jetbrains.com/plugin/7642-save-actions"},"Save Action Plugin")," to auto format & organize imports on save. The Maven Compilation life-cycle will fail if there are checkstyle violations.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"[","Recommended","]"," As it is required to add ",(0,o.kt)("a",{parentName:"p",href:"https://www.apache.org/legal/src-headers#headers"},"Apache License header"),' to all source files, configuring "Copyright" settings as shown below will come in handy.'))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"IDE setup copyright 1",src:a(9227).Z}),"\n",(0,o.kt)("img",{alt:"IDE setup copyright 2",src:a(7634).Z})),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"[","Optional","]"," If needed, add spark jars to the classpath of your module in Intellij by following the steps from ",(0,o.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/1051640/correct-way-to-add-external-jars-lib-jar-to-an-intellij-idea-project"},"here"),". ")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"[","Optional","]"," You may configure IntelliJ to respect maven CLI and pom.xml settings."))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"IDE setup maven 1",src:a(4725).Z}),"\n",(0,o.kt)("img",{alt:"IDE setup maven 2",src:a(5053).Z})),(0,o.kt)("h2",{id:"accounts-and-permissions"},"Accounts and Permissions"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/projects/HUDI/issues"},"Hudi issue tracker (JIRA)"),":\nAnyone can access it and browse issues. Anyone can register an account and login\nto create issues or add comments. Only contributors can be assigned issues. If\nyou want to be assigned issues, a PMC member can add you to the project contributor\ngroup.  Email the dev mailing list to ask to be added as a contributor, and include your ASF Jira username.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/HUDI"},"Hudi Wiki Space"),":\nAnyone has read access. If you wish to contribute changes, please create an account and\nrequest edit access on the dev@ mailing list (include your Wiki account user ID).")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Pull requests can only be merged by a HUDI committer, listed ",(0,o.kt)("a",{parentName:"p",href:"https://incubator.apache.org/projects/hudi"},"here"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("a",{parentName:"p",href:"https://www.apache.org/foundation/voting"},"Voting on a release"),": Everyone can vote.\nOnly Hudi PMC members should mark their votes as binding."))),(0,o.kt)("h2",{id:"life-of-a-contributor"},"Life of a Contributor"),(0,o.kt)("p",null,"This document details processes and procedures we follow to make contributions to the project and take it forward.\nIf you are looking to ramp up into the project as a contributor, we highly encourage you to read this guide in full, familiarize yourself with the workflow\nand more importantly also try to improve the process along the way as well. "),(0,o.kt)("h3",{id:"filing-jiras"},"Filing JIRAs"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Hudi uses JIRA to manage issues. First, familiarize yourself with the various ",(0,o.kt)("a",{parentName:"li",href:"https://issues.apache.org/jira/projects/HUDI/components"},"components")," against which issues are filed in Hudi."),(0,o.kt)("li",{parentName:"ul"},"Make an attempt to find an existing JIRA, that may solve the same issue you are reporting. When in doubt, you can always email the mailing list so that the community can provide early feedback,\npoint out any similar JIRAs or RFCs. "),(0,o.kt)("li",{parentName:"ul"},"Try to gauge whether this JIRA needs an ",(0,o.kt)("a",{parentName:"li",href:"https://cwiki.apache.org/confluence/display/HUDI/RFC+Process"},"RFC"),". As always, email the mailing list if unsure. If you need an RFC since the change is\nlarge in scope, then please follow the wiki instructions to get the process rolling along."),(0,o.kt)("li",{parentName:"ul"},"While raising a new JIRA or updating an existing one, please make sure to do the following",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"The issue ",(0,o.kt)("inlineCode",{parentName:"li"},"type")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"components")," (when resolving the ticket) are set correctly"),(0,o.kt)("li",{parentName:"ul"},"If you intend to target the JIRA for a specific release, please fill in the ",(0,o.kt)("inlineCode",{parentName:"li"},"fix version(s)")," field, with the ",(0,o.kt)("a",{parentName:"li",href:"https://issues.apache.org/jira/projects/HUDI/releases"},"release number"),"."),(0,o.kt)("li",{parentName:"ul"},"Summary should be descriptive enough to catch the essence of the problem/ feature"),(0,o.kt)("li",{parentName:"ul"},"Where necessary, capture the version of Hudi/Spark/Hive/Hadoop/Cloud environments in the ticket"),(0,o.kt)("li",{parentName:"ul"},"Whenever possible, provide steps to reproduce via sample code or on the ",(0,o.kt)("a",{parentName:"li",href:"https://hudi.apache.org/docker_demo"},"docker setup")))),(0,o.kt)("li",{parentName:"ul"},"All newly filed JIRAs are placed in the ",(0,o.kt)("inlineCode",{parentName:"li"},"NEW")," state. If you are sure about this JIRA representing valid, scoped piece of work, please click ",(0,o.kt)("inlineCode",{parentName:"li"},"Accept Issue")," to move it ",(0,o.kt)("inlineCode",{parentName:"li"},"OPEN")," state"),(0,o.kt)("li",{parentName:"ul"},"If you are not sure, please wait for a PMC/Committer to confirm/triage the issue and accept it. This process avoids contributors spending time on JIRAs with unclear scope."),(0,o.kt)("li",{parentName:"ul"},"Whenever possible, break down large JIRAs (e.g JIRAs resulting from an ",(0,o.kt)("a",{parentName:"li",href:"https://cwiki.apache.org/confluence/display/HUDI/RFC+Process"},"RFC"),") into ",(0,o.kt)("inlineCode",{parentName:"li"},"sub tasks")," by clicking ",(0,o.kt)("inlineCode",{parentName:"li"},"More > create sub-task")," from the parent JIRA ,\nso that the community can contribute at large and help implement it much quickly. We recommend prefixing such JIRA titles with ",(0,o.kt)("inlineCode",{parentName:"li"},"[UMBRELLA]"))),(0,o.kt)("h3",{id:"claiming-jiras"},"Claiming JIRAs"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Finding a JIRA to work on ",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"If you are new to the project, you can ramp up by picking up any issues tagged with the ",(0,o.kt)("a",{parentName:"li",href:"https://issues.apache.org/jira/issues/?jql=project+%3D+HUDI+AND+component+%3D+newbie"},"newbie")," component."),(0,o.kt)("li",{parentName:"ul"},"If you want to work on some higher priority issue, then scout for Open issues against the next release on the JIRA, engage on unassigned/inactive JIRAs and offer help."),(0,o.kt)("li",{parentName:"ul"},"Issues tagged with ",(0,o.kt)("inlineCode",{parentName:"li"},"Usability")," , ",(0,o.kt)("inlineCode",{parentName:"li"},"Code Cleanup"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"Testing")," components often present excellent opportunities to make a great impact."))),(0,o.kt)("li",{parentName:"ul"},"If you don't have perms to self-assign JIRAs, please email the dev mailing list with your JIRA id and a small intro for yourself. We'd be happy to add you as a contributor."),(0,o.kt)("li",{parentName:"ul"},'As courtesy, if you are unable to continue working on a JIRA, please move it back to "OPEN" state and un-assign yourself.',(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"If a JIRA or its corresponding pull request has been inactive for a week, awaiting feedback from you, PMC/Committers could choose to re-assign them to another contributor."),(0,o.kt)("li",{parentName:"ul"},"Such re-assignment process would be communicated over JIRA/GitHub comments, checking with the original contributor on his/her intent to continue working on the issue."),(0,o.kt)("li",{parentName:"ul"},"You can also contribute by helping others contribute. So, if you don't have cycles to work on a JIRA and another contributor offers help, take it!")))),(0,o.kt)("h3",{id:"contributing-code"},"Contributing Code"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Once you finalize on a project/task, please open a new JIRA or assign an existing one to yourself. ",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Almost all PRs should be linked to a JIRA. It's always good to have a JIRA upfront to avoid duplicating efforts."),(0,o.kt)("li",{parentName:"ul"},"If the changes are minor, then ",(0,o.kt)("inlineCode",{parentName:"li"},"[MINOR]")," prefix can be added to Pull Request title without a JIRA. Below are some tips to judge ",(0,o.kt)("strong",{parentName:"li"},"MINOR")," Pull Request :",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"trivial fixes (for example, a typo, a broken link, intellisense or an obvious error)"),(0,o.kt)("li",{parentName:"ul"},"the change does not alter functionality or performance in any way"),(0,o.kt)("li",{parentName:"ul"},"changed lines less than 100"),(0,o.kt)("li",{parentName:"ul"},"obviously judge that the PR would pass without waiting for CI / CD verification"))),(0,o.kt)("li",{parentName:"ul"},"But, you may be asked to file a JIRA, if reviewer deems it necessary"))),(0,o.kt)("li",{parentName:"ul"},"Before you begin work,",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Claim the JIRA using the process above and assign the JIRA to yourself."),(0,o.kt)("li",{parentName:"ul"},'Click "Start Progress" on the JIRA, which tells everyone that you are working on the issue actively.'))),(0,o.kt)("li",{parentName:"ul"},"[Optional]"," Familiarize yourself with internals of Hudi using content on this page, as well as ",(0,o.kt)("a",{parentName:"li",href:"https://cwiki.apache.org/confluence/display/HUDI"},"wiki")),(0,o.kt)("li",{parentName:"ul"},"Make your code change",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Get existing tests to pass using ",(0,o.kt)("inlineCode",{parentName:"li"},"mvn clean install -DskipITs")),(0,o.kt)("li",{parentName:"ul"},"Add adequate tests for your new functionality"),(0,o.kt)("li",{parentName:"ul"},"For involved changes, it's best to test the changes in real production environments and report the results in the PR. "),(0,o.kt)("li",{parentName:"ul"},"For website changes, please build the site locally & test navigation, formatting & links thoroughly"),(0,o.kt)("li",{parentName:"ul"},"If your code change changes some aspect of documentation (e.g new config, default value change),\nplease ensure there is another PR to ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/apache/hudi/tree/asf-site/README.md"},"update the docs")," as well."))),(0,o.kt)("li",{parentName:"ul"},"Sending a Pull Request",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Format commit and the pull request title like ",(0,o.kt)("inlineCode",{parentName:"li"},"[HUDI-XXX] Fixes bug in Spark Datasource"),",\nwhere you replace ",(0,o.kt)("inlineCode",{parentName:"li"},"HUDI-XXX")," with the appropriate JIRA issue. "),(0,o.kt)("li",{parentName:"ul"},"Please ensure your commit message body is descriptive of the change. Bulleted summary would be appreciated."),(0,o.kt)("li",{parentName:"ul"},"Push your commit to your own fork/branch & create a pull request (PR) against the Hudi repo."),(0,o.kt)("li",{parentName:"ul"},"If you don't hear back within 3 days on the PR, please send an email to the dev @ mailing list."),(0,o.kt)("li",{parentName:"ul"},"Address code review comments & keep pushing changes to your fork/branch, which automatically updates the PR"),(0,o.kt)("li",{parentName:"ul"},"Before your change can be merged, it should be squashed into a single commit for cleaner commit history."))),(0,o.kt)("li",{parentName:"ul"},"Finally, once your pull request is merged, make sure to ",(0,o.kt)("inlineCode",{parentName:"li"},"Close")," the JIRA.")),(0,o.kt)("h3",{id:"coding-guidelines"},"Coding guidelines"),(0,o.kt)("p",null,'Our code can benefit from contributors speaking the same "language" when authoring code. After all, it gets read a lot more than it gets\nwritten. So optimizing for "reads" is a good goal. The list below is a set of guidelines, that contributors strive to upkeep and reflective\nof how we want to evolve our code in the future.'),(0,o.kt)("h4",{id:"style"},"Style"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Formatting")," We should rely on checkstyle and spotless to auto fix formatting; automate this completely. Where we cannot,\nwe will err on the side of not taxing contributors with manual effort."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Refactoring"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Refactor with purpose; any refactor suggested should be attributable to functionality that now becomes easy to implement."),(0,o.kt)("li",{parentName:"ul"},"A class is asking to be refactored, when it has several overloaded responsibilities/have sets of fields/methods which are used more cohesively than others. "),(0,o.kt)("li",{parentName:"ul"},"Try to name tests using the given-when-then model, that cleans separates preconditions (given), an action (when), and assertions (then)."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Naming things"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Let's name uniformly; using the same word to denote the same concept. e.g: bootstrap vs external vs source, when referring to bootstrapped tables.\nMaybe they all mean the same, but having one word makes the code lot more easily readable. "),(0,o.kt)("li",{parentName:"ul"},"Let's name consistently with Hudi terminology. e.g dataset vs table, base file vs data file."),(0,o.kt)("li",{parentName:"ul"},"Class names preferably are nouns (e.g Runner) which reflect their responsibility and methods are verbs (e.g run())."),(0,o.kt)("li",{parentName:"ul"},"Avoid filler words, that don't add value e.g xxxInfo, xxxData, etc."),(0,o.kt)("li",{parentName:"ul"},"We name classes in code starting with ",(0,o.kt)("inlineCode",{parentName:"li"},"Hoodie")," and not ",(0,o.kt)("inlineCode",{parentName:"li"},"Hudi")," and we want to keep it that way for consistency/historical reasons. "))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Methods"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Individual methods should short (~20-30 lines) and have a single purpose; If you feel like it has a secondary purpose, then maybe it needs\nto be broken down more."),(0,o.kt)("li",{parentName:"ul"},"Lesser the number of arguments, the better; "),(0,o.kt)("li",{parentName:"ul"},"Place caller methods on top of callee methods, whenever possible."),(0,o.kt)("li",{parentName:"ul"},'Avoid "output" arguments e.g passing in a list and filling its values within the method.'),(0,o.kt)("li",{parentName:"ul"},"Try to limit individual if/else blocks to few lines to aid readability."),(0,o.kt)("li",{parentName:"ul"},"Separate logical blocks of code with a newline in between e.g read a file into memory, loop over the lines."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Classes"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Like method, each Class should have a single purpose/responsibility."),(0,o.kt)("li",{parentName:"ul"},"Try to keep class files to about 200 lines of length, nothing beyond 500."),(0,o.kt)("li",{parentName:"ul"},"Avoid stating the obvious in comments; e.g each line does not deserve a comment; Document corner-cases/special perf considerations etc clearly."),(0,o.kt)("li",{parentName:"ul"},"Try creating factory methods/builders and interfaces wherever you feel a specific implementation may be changed down the line.")))),(0,o.kt)("h4",{id:"substance"},"Substance"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Try to avoid large PRs; if unavoidable (many times they are) please separate refactoring with the actual implementation of functionality.\ne.g renaming/breaking up a file and then changing code changes, makes the diff very hard to review."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Licensing"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Every source file needs to include the Apache license header. Every new dependency needs to have\nan open source license ",(0,o.kt)("a",{parentName:"li",href:"https://www.apache.org/legal/resolved#criteria"},"compatible")," with Apache."),(0,o.kt)("li",{parentName:"ul"},"If you are re-using code from another apache/open-source project, licensing needs to be compatible and attribution added to ",(0,o.kt)("inlineCode",{parentName:"li"},"LICENSE")," file"),(0,o.kt)("li",{parentName:"ul"},"Please DO NOT copy paste any code from StackOverflow or other online sources, since their license attribution would be unclear. Author them yourself!"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Code Organization")," ",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Anything in ",(0,o.kt)("inlineCode",{parentName:"li"},"hudi-common")," cannot depend on a specific engine runtime like Spark. "),(0,o.kt)("li",{parentName:"ul"},"Any changes to bundles under ",(0,o.kt)("inlineCode",{parentName:"li"},"packaging"),", will be reviewed with additional scrutiny to avoid breakages across versions."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Code reuse"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Whenever you can, please use/enhance use existing utils classes in code (",(0,o.kt)("inlineCode",{parentName:"li"},"CollectionUtils"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"ParquetUtils"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieAvroUtils"),"). Search for classes ending in ",(0,o.kt)("inlineCode",{parentName:"li"},"Utils"),"."),(0,o.kt)("li",{parentName:"ul"},"As a complex project, that must integrate with multiple systems, we tend to avoid dependencies like ",(0,o.kt)("inlineCode",{parentName:"li"},"guava"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"apache commons")," for the sake of easy integration.\nPlease start a discussion on the mailing list, before attempting to reintroduce them"),(0,o.kt)("li",{parentName:"ul"},"As a data system, that takes performance seriously, we also write pieces of infrastructure (e.g ",(0,o.kt)("inlineCode",{parentName:"li"},"ExternalSpillableMap"),") natively, that are optimized specifically for our scenarios.\nPlease start with them first, when solving problems."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Breaking changes"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Any version changes for dependencies, needs to be ideally vetted across different user environments in the community, to get enough confidence before merging."),(0,o.kt)("li",{parentName:"ul"},"Any changes to methods annotated with ",(0,o.kt)("inlineCode",{parentName:"li"},"PublicAPIMethod")," or classes annotated with ",(0,o.kt)("inlineCode",{parentName:"li"},"PublicAPIClass")," require upfront discussion and potentially an RFC."),(0,o.kt)("li",{parentName:"ul"},"Any non-backwards compatible changes similarly need upfront discussion and the functionality needs to implement an upgrade-downgrade path.")))),(0,o.kt)("h4",{id:"tests"},"Tests"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Categories"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"unit - testing basic functionality at the class level, potentially using mocks. Expected to finish quicker"),(0,o.kt)("li",{parentName:"ul"},"functional - brings up the services needed and runs test without mocking"),(0,o.kt)("li",{parentName:"ul"},"integration - runs subset of functional tests, on a full fledged enviroment with dockerized services"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Prepare Test Data"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Many unit and functional test cases require a Hudi dataset to be prepared beforehand. ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieTestTable")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieWriteableTestTable")," are dedicated test utility classes for this purpose. Use them whenever appropriate, and add new APIs to them when needed."),(0,o.kt)("li",{parentName:"ul"},"When add new APIs in the test utility classes, overload APIs with variety of arguments to do more heavy-liftings for callers."),(0,o.kt)("li",{parentName:"ul"},"In most scenarios, you won't need to use ",(0,o.kt)("inlineCode",{parentName:"li"},"FileCreateUtils")," directly."),(0,o.kt)("li",{parentName:"ul"},"If test cases require interaction with actual ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieRecord"),"s, use ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieWriteableTestTable")," (and ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieTestDataGenerator")," probably). Otherwise, ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieTestTable")," that manipulates empty files shall serve the purpose."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Strive for Readability"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Avoid writing flow controls for different assertion cases. Split to a new test case when appropriate."),(0,o.kt)("li",{parentName:"ul"},"Use plain for-loop to avoid try-catch in lambda block. Declare exceptions is okay."),(0,o.kt)("li",{parentName:"ul"},"Use static import for constants and static helper methods to avoid lengthy code."),(0,o.kt)("li",{parentName:"ul"},"Avoid reusing local variable names. Create new variables generously."),(0,o.kt)("li",{parentName:"ul"},"Keep helper methods local to the test class until it becomes obviously generic and re-useable. When that happens, move the helper method to the right utility class. For example, ",(0,o.kt)("inlineCode",{parentName:"li"},"Assertions")," contains common assert helpers, and ",(0,o.kt)("inlineCode",{parentName:"li"},"SchemaTestUtil")," is for schema related helpers."),(0,o.kt)("li",{parentName:"ul"},"Avoid putting new helpers in ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieTestUtils")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"HoodieClientTestUtils"),", which are named too generic. Eventually, all test helpers shall be categorized properly.  ")))),(0,o.kt)("h3",{id:"reviewing-coderfcs"},"Reviewing Code/RFCs"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"All pull requests would be subject to code reviews, from one or more of the PMC/Committers. "),(0,o.kt)("li",{parentName:"ul"},'Typically, each PR will get an "Assignee" based on their area of expertise, who will work with you to land the PR.'),(0,o.kt)("li",{parentName:"ul"},"Code reviews are vital, but also often time-consuming for everyone involved. Below are some principles which could help align us better.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Reviewers need to provide actionable, concrete feedback that states what needs to be done to get the PR closer to landing."),(0,o.kt)("li",{parentName:"ul"},"Reviewers need to make it explicit, which of the requested changes would block the PR vs good-to-dos."),(0,o.kt)("li",{parentName:"ul"},"Both contributors/reviewers need to keep an open mind and ground themselves to making the most technically sound argument."),(0,o.kt)("li",{parentName:"ul"},"If progress is hard, please involve another PMC member/Committer to share another perspective."),(0,o.kt)("li",{parentName:"ul"},"Staying humble and eager to learn, goes a long way in ensuring these reviews are smooth."))),(0,o.kt)("li",{parentName:"ul"},"Reviewers are expected to uphold the code quality, standards outlined above."),(0,o.kt)("li",{parentName:"ul"},'When merging PRs, always make sure you are squashing the commits using the "Squash and Merge" feature in Github'),(0,o.kt)("li",{parentName:"ul"},"When necessary/appropriate, reviewers could make changes themselves to PR branches, with the intent to get the PR landed sooner. (see ",(0,o.kt)("a",{parentName:"li",href:"https://cwiki.apache.org/confluence/display/HUDI/Resources#Resources-PushingChangesToPRs"},"how-to"),")\nReviewers should seek explicit approval from author, before making large changes to the original PR.")),(0,o.kt)("h3",{id:"suggest-changes"},"Suggest Changes"),(0,o.kt)("p",null,"We welcome new ideas and suggestions to improve the project, along any dimensions - management, processes, technical vision/direction. To kick start a discussion on the mailing thread\nto effect change and source feedback, start a new email thread with the ",(0,o.kt)("inlineCode",{parentName:"p"},"[DISCUSS]")," prefix and share your thoughts. If your proposal leads to a larger change, then it may be followed up\nby a ",(0,o.kt)("a",{parentName:"p",href:"https://www.apache.org/foundation/voting"},"vote")," by a PMC member or others (depending on the specific scenario).\nFor technical suggestions, you can also leverage ",(0,o.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/HUDI/RFC+Process"},"our RFC Process")," to outline your ideas in greater detail."),(0,o.kt)("h2",{id:"releases"},"Releases"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Apache Hudi community plans to do minor version releases every 6 weeks or so."),(0,o.kt)("li",{parentName:"ul"},"If your contribution merged onto the ",(0,o.kt)("inlineCode",{parentName:"li"},"master")," branch after the last release, it will become part of the next release."),(0,o.kt)("li",{parentName:"ul"},"Website changes are regenerated on-demand basis (until automation in place to reflect immediately)")),(0,o.kt)("h2",{id:"communication"},"Communication"),(0,o.kt)("p",null,"All communication is expected to align with the ",(0,o.kt)("a",{parentName:"p",href:"https://www.apache.org/foundation/policies/conduct"},"Code of Conduct"),".\nDiscussion about contributing code to Hudi happens on the ",(0,o.kt)("a",{parentName:"p",href:"/contribute/get-involved"},"dev@ mailing list"),". Introduce yourself!"),(0,o.kt)("h2",{id:"code--project-structure"},"Code & Project Structure"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docker")," : Docker containers used by demo and integration tests. Brings up a mini data ecosystem locally"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-cli")," : CLI to inspect, manage and administer datasets"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-client")," : Spark client library to take a bunch of inserts + updates and apply them to a Hoodie table"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-common")," : Common classes used across modules"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-hadoop-mr")," : InputFormat implementations for ReadOptimized, Incremental, Realtime views"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-hive")," : Manage hive tables off Hudi datasets and houses the HiveSyncTool"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-integ-test")," : Longer running integration test processes"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-spark")," : Spark datasource for writing and reading Hudi datasets. Streaming sink."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"hudi-utilities")," : Houses tools like DeltaStreamer, SnapshotCopier"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"packaging")," : Poms for building out bundles for easier drop in to Spark, Hive, Presto, Utilities"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"style"),"  : Code formatting, checkstyle files")),(0,o.kt)("h2",{id:"code-walkthrough"},"Code WalkThrough"),(0,o.kt)("p",null,"This Quick Video will give a code walkthrough to start with ",(0,o.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=N2eDfU_rQ_U"},"watch"),"."),(0,o.kt)("h2",{id:"docker-setup"},"Docker Setup"),(0,o.kt)("p",null,"We encourage you to test your code on docker cluster please follow this for ",(0,o.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/docker_demo"},"docker setup"),"."),(0,o.kt)("h2",{id:"remote-debugging"},"Remote Debugging"),(0,o.kt)("p",null,"if your code fails on docker cluster you can remotely debug your code please follow the below steps."),(0,o.kt)("p",null,"Step 1 :- Run your Delta Streamer Job with --conf as defined this will ensure to wait till you attach your intellij with Remote Debugging on port 4044"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'spark-submit \\\n  --conf spark.driver.extraJavaOptions="-Dconfig.resource=myapp.conf  -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=4044" \\\n  --class org.apache.hudi.utilities.deltastreamer.HoodieDeltaStreamer $HUDI_UTILITIES_BUNDLE \\\n  --table-type COPY_ON_WRITE \\\n  --source-class org.apache.hudi.utilities.sources.JsonKafkaSource \\\n  --source-ordering-field ts  \\\n  --base-file-format parquet \\\n  --target-base-path /user/hive/warehouse/stock_ticks_cow \\\n  --target-table stock_ticks_cow --props /var/demo/config/kafka-source.properties \\\n  --schemaprovider-class org.apache.hudi.utilities.schema.FilebasedSchemaProvider\n')),(0,o.kt)("p",null,"Step 2 :- Attaching Intellij (tested on Intellij Version > 2019. this steps may change acc. to intellij version)"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Come to Intellij --\x3e Edit Configurations -> Remote -> Add Remote - > Put Below Configs -> Apply & Save -> Put Debug Point -> Start. ",(0,o.kt)("br",null)),(0,o.kt)("li",{parentName:"ul"},"Name : Hudi Remote ",(0,o.kt)("br",null)),(0,o.kt)("li",{parentName:"ul"},"Port : 4044 ",(0,o.kt)("br",null)),(0,o.kt)("li",{parentName:"ul"},"Command Line Args for Remote JVM : -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=4044 ",(0,o.kt)("br",null)),(0,o.kt)("li",{parentName:"ul"},"Use Module ClassPath : select hudi ",(0,o.kt)("br",null))),(0,o.kt)("h2",{id:"website"},"Website"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://hudi.apache.org"},"Apache Hudi site")," is hosted on a special ",(0,o.kt)("inlineCode",{parentName:"p"},"asf-site")," branch. Please follow the ",(0,o.kt)("inlineCode",{parentName:"p"},"README")," file under ",(0,o.kt)("inlineCode",{parentName:"p"},"docs")," on that branch for\ninstructions on making changes to the website."))}d.isMDXComponent=!0},9227:function(e,t,a){t.Z=a.p+"assets/images/IDE_setup_copyright_1-7738a57f8fa00720fb2f76560205c198.png"},7634:function(e,t,a){t.Z=a.p+"assets/images/IDE_setup_copyright_2-32cbdae2fdc45996148a8fbaf0ad64f3.png"},4725:function(e,t,a){t.Z=a.p+"assets/images/IDE_setup_maven_1-551736635e838d96d3acafc22b0836d7.png"},5053:function(e,t,a){t.Z=a.p+"assets/images/IDE_setup_maven_2-20f1327f4747a5b36cc03268afa8efb1.png"}}]);