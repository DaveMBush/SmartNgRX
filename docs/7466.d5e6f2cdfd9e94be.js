"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7466],{7466:(f,c,e)=>{e.r(c),e.d(c,{DynamicComponent:()=>l,default:()=>y});var o=e(9649),i=e(5789),g=e(235);const a={title:"Smart Selector",mdFile:"./index.md",order:7,category:e(5040).Z},h=[],m={};var n=e(7514);let l=(()=>{var s;class r extends o.a{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent='<h1 id="smart-selector" class="ngde">Smart Selector<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/smart-selector#smart-selector"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">And now, we can use the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/interfaces/ProxyChild" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">ProxyChild</a></code> interface to create a selector that will retrieve the child entity from the parent entity. We can use this selector in our components to retrieve the child entity from the store.</p><p class="ngde">Note that the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/createSmartSelector" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">createSmartSelector</a></code> function takes an array of <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/interfaces/ProxyChild" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">ProxyChild</a></code> objects. This allows us to create a selector that will retrieve multiple child entities from the parent entity. That is, one row may point to multiple children. By passing the array you can account for each of them with one call.</p><p class="ngde">In the case where your <code class="ngde">User</code> row might have some child field named, <code class="ngde">roles</code> your `createSmartSelector`` call might look like this:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">const</span> selectUserChildren = <a href="/api/smart-ngrx/functions/createSmartSelector" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">createSmartSelector</a>&#x3C;<span class="hljs-title class_ ngde">Location</span>>(selectUser, [\n</span><span class="line ngde">  {\n</span><span class="line ngde">    <span class="hljs-attr ngde">childFeature</span>: <span class="hljs-string ngde">\'shared\'</span>,\n</span><span class="line ngde">    <span class="hljs-attr ngde">childFieldName</span>: <span class="hljs-string ngde">\'roles\'</span>,\n</span><span class="line ngde">    <span class="hljs-attr ngde">parentFieldName</span>: <span class="hljs-string ngde">\'roles\'</span>,\n</span><span class="line ngde">    <span class="hljs-attr ngde">childSelector</span>: <a href="/api/smart-ngrx/functions/castTo" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">castTo</a>&#x3C;<span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/type-aliases/MarkAndDeleteSelector" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">MarkAndDeleteSelector</a></span>>(selectRoles),\n</span><span class="line ngde">  },\n</span><span class="line ngde">]);\n</span></code></pre><p class="ngde">For now, the first parameter to <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/createSmartSelector" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">createSmartSelector</a></code> expects a selector that returns the parent entity. Eventually, we\'d like for this parameter to accept any valid selector it can be used with existing code that does not use NgRX Entities.</p>',this.page=a,this.demoAssets=m}}return(s=r).\u0275fac=function(t){return new(t||s)},s.\u0275cmp=n.Xpm({type:s,selectors:[["ng-doc-page-using-smart-ng-rx-smart-selector"]],standalone:!0,features:[n._Bn([{provide:o.a,useExisting:s},h,a.providers??[]]),n.qOj,n.jDz],decls:1,vars:0,template:function(t,j){1&t&&n._UZ(0,"ng-doc-page")},dependencies:[i.z],encapsulation:2,changeDetection:0}),r})();const y=[{...(0,g.isRoute)(a.route)?a.route:{},path:"",component:l,title:"Smart Selector"}]}}]);