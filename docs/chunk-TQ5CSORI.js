import{a as l}from"./chunk-5YX54J4P.js";import"./chunk-PEMSLVYP.js";import{a}from"./chunk-RMIGXQ3G.js";import{Ba as i,Ca as r,K as t,da as d,na as c}from"./chunk-ARQ5TRRK.js";import"./chunk-RS6LHQUM.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Function">Function</span></div><h1 id="reducerfactory" class="ngde">reducerFactory<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/reducerFactory#reducerfactory"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">This creates a reducer for the give source. It is used internally and documented here for future contributions. Application code should never need to use this function.</p></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/reducerFactory#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">function</span> <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/reducerFactory" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">reducerFactory</a></span>(<span class="hljs-params ngde"></span>
</span><span class="line ngde"><span class="hljs-params ngde">  feature: StringLiteralSource&#x3C;F>,</span>
</span><span class="line ngde"><span class="hljs-params ngde">  entity: StringLiteralSource&#x3C;E>,</span>
</span><span class="line ngde"><span class="hljs-params ngde">  defaultRow: (id: </span><span class="hljs-built_in ngde">string</span><span class="hljs-params ngde">) => T</span>
</span><span class="line ngde"><span class="hljs-params ngde"></span>): <span class="hljs-title class_ ngde">ActionReducer</span>&#x3C;<span class="hljs-title class_ ngde">EntityState</span>&#x3C;T>, <span class="hljs-title class_ ngde">Action</span>>;
</span></code></pre></section><section class="ngde"><h2 id="parameters" class="ngde">Parameters<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/reducerFactory#parameters"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">feature<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">StringLiteralSource&#x3C;F></code></td><td class="ngde"><p class="ngde">The feature name for this reducer</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entity<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">StringLiteralSource&#x3C;E></code></td><td class="ngde"><p class="ngde">The entity name (source) for this reducer</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">defaultRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(id: string) => T</code></td><td class="ngde"><p class="ngde">A function that returns a default row for the given id</p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-api-smart-ngrx-functions-reducer-factory"]],standalone:!0,features:[i([{provide:a,useExisting:e}]),d,r],decls:1,vars:0,template:function(s,h){s&1&&c(0,"ng-doc-page")},dependencies:[l],encapsulation:2,changeDetection:0});let n=e;return n})(),u=[{path:"",component:p,title:"reducerFactory"}],x=u;export{p as DynamicComponent,x as default};
