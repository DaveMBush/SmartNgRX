import{a as o}from"./chunk-FVRGWNNR.js";import"./chunk-VM5ESKQM.js";import{a}from"./chunk-C6HCTMWR.js";import{L as s,Qa as c,Ra as l,ia as i,va as d}from"./chunk-O5TFSMGJ.js";import"./chunk-JPKLQMV2.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Function">Function</span></div><h1 id="delayedregisterentity" class="ngde">delayedRegisterEntity<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/delayedRegisterEntity#delayedregisterentity"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">We can't, necessarily, register an entity as part of the provideSmartFeatureEntities() function because it gets called while the Routes are being registered. This means that the getGlobalMarkAndDeleteInit() function will return an empty object when it should return a full MarkAndDeleteInit object.</p><p class="ngde">This function exists to wait until the MarkAndDeleteInit object is fully populated before registering the entity.</p></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/delayedRegisterEntity#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">function</span> <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/delayedRegisterEntity" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">delayedRegisterEntity</a></span>(<span class="hljs-params ngde">featureName: <span class="hljs-built_in ngde">string</span>, entityName: <span class="hljs-built_in ngde">string</span>, entityDefinition: <a href="/api/smart-ngrx/interfaces/SmartEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartEntityDefinition</a>&#x3C;<a href="/api/smart-ngrx/interfaces/SmartNgRXRowBase" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartNgRXRowBase</a>></span>): <span class="hljs-built_in ngde">boolean</span>;
</span></code></pre></section><section class="ngde"><h2 id="parameters" class="ngde">Parameters<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/delayedRegisterEntity#parameters"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">featureName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the feature to register</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the entity in the feature to register</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityDefinition<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">SmartEntityDefinition&#x3C;SmartNgRXRowBase></code></td><td class="ngde"><p class="ngde">the entity definition that was originally passed to provideSmartFeatureEntities()</p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["ng-doc-page-api-smart-ngrx-functions-delayed-register-entity"]],standalone:!0,features:[c([{provide:a,useExisting:e}]),i,l],decls:1,vars:0,template:function(t,f){t&1&&d(0,"ng-doc-page")},dependencies:[o],encapsulation:2,changeDetection:0});let n=e;return n})(),h=[{path:"",component:p,title:"delayedRegisterEntity"}],m=h;export{p as DynamicComponent,m as default};
