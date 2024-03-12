import{a as h}from"./chunk-GB5MTUGM.js";import"./chunk-NCOWMHCX.js";import{a as g}from"./chunk-3YQZUCDU.js";import"./chunk-LR5VYTZR.js";import{a as t}from"./chunk-4KUKQ7RY.js";import{G as o,Ta as r,Tb as j,Ua as c,la as p,ya as d}from"./chunk-QNBQDNU6.js";import{a as l,b as i,g as k}from"./chunk-P2VZOJAX.js";var f=k(j());var D={title:"Entity Mark and Delete",mdFile:"./index.md",order:4,category:h},n=D;var m=[];var x={},u=x;var v=`<h1 id="entity-mark-and-delete" class="ngde">Entity Mark and Delete<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/mark-and-delete/entity-mark-and-delete#entity-mark-and-delete"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">For many cases, the global Mark and Delete configuration will be sufficient. But there are times when you need to override the global configuration for a specific entity. For example, you may want to use the general <code class="ngde">markDirtyTime</code> but for some entities you want to load them and keep them in memory. Lookup tables are a place where you might consider this.</p><p class="ngde">To override the global configuration, you can pass in a <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/interfaces/MarkAndDeleteInit" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">MarkAndDeleteInit</a></code> object as part of the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/provideSmartFeatureEntities" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">provideSmartFeatureEntities</a></code> call. This will override the global configuration for the entity.</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">const</span> <span class="hljs-attr ngde">lookupTable</span>: <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/interfaces/SmartEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartEntityDefinition</a></span>&#x3C;<span class="hljs-title class_ ngde">LookupTable</span>>  = {
</span><span class="line ngde">  <span class="hljs-attr ngde">entityName</span>: <span class="hljs-string ngde">'lookupTable'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">effectServiceToken</span>: lookupTableEffectsServiceToken,
</span><span class="line ngde">  <span class="hljs-attr ngde">defaultRow</span>: <span class="hljs-function ngde">(<span class="hljs-params ngde">id</span>) =></span> ({
</span><span class="line ngde">    id,
</span><span class="line ngde">    ..., <span class="hljs-comment ngde">// other fields</span>
</span><span class="line ngde">    <span class="hljs-attr ngde">isDirty</span>: <span class="hljs-literal ngde">false</span>,
</span><span class="line ngde">  }),
</span><span class="line ngde">  <span class="hljs-attr ngde">markAndDelete</span>: {
</span><span class="line ngde">    <span class="hljs-attr ngde">markDirtyTime</span>: -<span class="hljs-number ngde">1</span>,
</span><span class="line ngde">    <span class="hljs-attr ngde">removeTime</span>: <span class="hljs-number ngde">0</span>,
</span><span class="line ngde">    <span class="hljs-attr ngde">markAndDeleteFetchesNew</span>: <span class="hljs-literal ngde">false</span>,
</span><span class="line ngde">  },
</span><span class="line ngde">};
</span></code></pre><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-attr ngde">providers</span>: [
</span><span class="line ngde">  ..., <span class="hljs-comment ngde">// other providers</span>
</span><span class="line ngde">  <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/provideSmartFeatureEntities" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">provideSmartFeatureEntities</a></span>(<span class="hljs-string ngde">'shared'</span>, [
</span><span class="line ngde">    locationsDefinition,
</span><span class="line ngde">    departmentsDefinition,
</span><span class="line ngde">    departmentChildrenDefinition,
</span><span class="line ngde">    lookupTable,
</span><span class="line ngde">  ]),
</span><span class="line ngde">]
</span></code></pre>`,E=(()=>{let e=class e extends t{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent=v,this.page=n,this.demoAssets=u}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=o({type:e,selectors:[["ng-doc-page-using-smart-ng-rx-mark-and-delete-entity-mark-and-delete"]],standalone:!0,features:[r([{provide:t,useExisting:e},m,n.providers??[]]),p,c],decls:1,vars:0,template:function(a,b){a&1&&d(0,"ng-doc-page")},dependencies:[g],encapsulation:2,changeDetection:0});let s=e;return s})(),T=[i(l({},(0,f.isRoute)(n.route)?n.route:{}),{path:"",component:E,title:"Entity Mark and Delete"})],I=T;export{E as DynamicComponent,I as default};
