import{a as m}from"./chunk-MMZV4BMI.js";import{a as p}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a}from"./chunk-3NJKGVAP.js";import{X as w}from"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as c,Fa as d,Wa as i,sb as h}from"./chunk-O44Q3Q27.js";import{a as s,b as r,h as v}from"./chunk-TWZW5B45.js";var u=v(w());var b={title:"Tree Component",mdFile:"./index.md",order:7,category:m},e=b;var l=[];var D={},g=D;var y=`<h1 id="tree-component" href="demo-walkthrough/tree-component" headinglink="true" class="ngde">Tree Component<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="tree-component"></ng-doc-heading-anchor></h1><p class="ngde">Now that we have the selectors defined, the next step is to pass them into our component(s) so they can be used.</p><p class="ngde">Each of our routes have a smart component that looks basically the same. So, once again, we'll look at the <code class="ngde">Tree (Standard)</code> page to illustrate how we use the selectors and how we only retrieve the data we need as it is needed.</p><h2 id="smart-component" href="demo-walkthrough/tree-component" headinglink="true" class="ngde">Smart Component<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="smart-component"></ng-doc-heading-anchor></h2><p class="ngde">At the route level, we create a smart component that retrieves the data from the selectors that we need.</p><p class="ngde">The three selectors we need to pull our data from are, <code class="ngde">selectLocations()</code>, <code class="ngde">selectCurrentLocationId()</code>, and <code class="ngde">selectCurrentLocation()</code>. The code is as you would expect and can be found in the <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/routes/tree-standard/tree.component.ts" class="ngde">tree.component.ts</a> file.</p><p class="ngde">You can look in the <code class="ngde">ngOnInit()</code> method to see that we retrieve the data and set them to member variables.</p><p class="ngde">Next, we <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/routes/tree-standard/tree.component.html" class="ngde">pass the data into our main <code class="ngde">TreeComponent</code></a> which is a dumb component that is responsible for displaying the data.</p><p class="ngde"><code class="ngde">locations</code> and <code class="ngde">locationId</code> are used to populate the dropdown that allows us to pick the current location. The <code class="ngde">location</code> is used to retrieve the data for the tree. Let's take a look at that next. The dropdown selector is relatively straightforward, so there is no real need to look at that in detail.</p><h2 id="dumb-component" href="demo-walkthrough/tree-component" headinglink="true" class="ngde">Dumb Component<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="dumb-component"></ng-doc-heading-anchor></h2><p class="ngde">The common <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/components/tree/tree.component.html" class="ngde">TreeComponent</a> is used to display the tree. You should notice that it is using the <a href="https://material.angular.io/cdk/scrolling/overview" class="ngde">cdk-virtual-scroll-viewport</a> to provide virtual scrolling. This means that only the data that can be "seen" on the screen is rendered onto the screen. The tree uses the <a href="https://material.angular.io/components/tree/overview" class="ngde">mat-tree component</a> to display the data using the <a href="https://material.angular.io/components/tree/overview#flat-tree" class="ngde">flat data</a> method. This means that we need to convert our hierarchy of data into a flat list of data which we primarily do in <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L38-L65" class="ngde">TreeComponentService.applyRange()</a> and <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L67-L100" class="ngde">TreeComponentService.transform()</a></p><p class="ngde"><code class="ngde">applyRange()</code> is responsible for kicking things off by determining which rows of information we need to display. It then calls <code class="ngde">transform()</code> to convert the data from <code class="ngde">locations</code> into a flat list of tree data.</p><p class="ngde">Converting the nested data into a flat list is standard <code class="ngde">mat-tree</code> code so, again, we won't spend a lot of time on this. However, what is interesting about this code is that we avoid triggering retrieval of the data by not access the array elements unless we need the data. If all we need is the ID, we use the <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L179" class="ngde">getIdAtIndex()</a> method to just retrieve that.</p><p class="ngde">And this is the magic of SmartNgRX. Once you retrieve the data directly from the element, SmartNgRX ends up calling the Effects Service you registered and retrieves the data from the server.</p><p class="ngde">You'll also note that the <code class="ngde">transform()</code> method is <a href="https://github.com/DaveMBush/SmartNgRX/blob/v-next/apps/demo/src/app/shared/components/tree/tree-component.service.ts#L89-L97" class="ngde">recursive</a> to access the child elements of a node.</p>`,n=class t extends a{constructor(){super();this.pageType="guide";this.pageContent=y;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/demo-walkthrough/tree-component/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/demo-walkthrough/tree-component/index.md";this.page=e;this.demoAssets=g}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=c({type:t,selectors:[["ng-doc-page-c61c3uc7"]],features:[h([{provide:a,useExisting:t},l,e.providers??[]]),d],decls:1,vars:0,template:function(o,R){o&1&&i(0,"ng-doc-page")},dependencies:[p],encapsulation:2,changeDetection:0})}},N=[r(s({},(0,u.isRoute)(e.route)?e.route:{}),{path:"",component:n,title:"Tree Component"})],F=N;export{n as PageComponent,F as default};
