import{a as o}from"./chunk-RUBCGYW7.js";import"./chunk-ZC5ZGUG3.js";import{a}from"./chunk-3GD2QQWW.js";import{M as t,Sa as i,Ta as l,ka as d,xa as c}from"./chunk-CQ6NMILN.js";import"./chunk-P2VZOJAX.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Function">Function</span></div><h1 id="realormocked" class="ngde">realOrMocked<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/realOrMocked#realormocked"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">Internal function used by <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/createInnerSmartSelector" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">createInnerSmartSelector</a></code> use to load the data if it doesn't exist in the store and return a placeholder row if it doesn't</p></section><section indexable="false" class="ngde"><h2 id="see-also" class="ngde">See Also<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/realOrMocked#see-also"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ul class="ng-doc-see-also ngde"><li class="ngde"><p class="ngde"><code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/createInnerSmartSelector" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">createInnerSmartSelector</a></code></p></li></ul></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/realOrMocked#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">function</span> <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/realOrMocked" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">realOrMocked</a></span>(<span class="hljs-params ngde">entityState: EntityState&#x3C;T>, id: <span class="hljs-built_in ngde">string</span>, defaultObject: T, childDefinition: <a href="/api/smart-ngrx/interfaces/ChildDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">ChildDefinition</a>&#x3C;P, <span class="hljs-built_in ngde">string</span>, <span class="hljs-built_in ngde">string</span>, <span class="hljs-built_in ngde">string</span>, <span class="hljs-built_in ngde">string</span>></span>): T;
</span></code></pre></section><section class="ngde"><h2 id="parameters" class="ngde">Parameters<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/realOrMocked#parameters"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">entityState<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">EntityState&#x3C;T></code></td><td class="ngde"><p class="ngde">the entity used to lookup the id</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">id<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the id to lookup</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">defaultObject<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">T</code></td><td class="ngde"><p class="ngde">the default object to return if the id doesn't exist</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">childDefinition<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ChildDefinition&#x3C;P, string, string, string, string></code></td><td class="ngde"><p class="ngde">the definition of the child object that lets us retrieve the feature and entity names</p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-api-smart-ngrx-functions-real-or-mocked"]],standalone:!0,features:[i([{provide:a,useExisting:e}]),d,l],decls:1,vars:0,template:function(s,f){s&1&&c(0,"ng-doc-page")},dependencies:[o],encapsulation:2,changeDetection:0});let n=e;return n})(),h=[{path:"",component:p,title:"realOrMocked"}],x=h;export{p as DynamicComponent,x as default};
