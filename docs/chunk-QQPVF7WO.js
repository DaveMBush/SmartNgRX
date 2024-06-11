import{a as o}from"./chunk-FVRGWNNR.js";import"./chunk-VM5ESKQM.js";import{a as t}from"./chunk-C6HCTMWR.js";import{L as a,Qa as i,Ra as l,ia as d,va as c}from"./chunk-O5TFSMGJ.js";import"./chunk-JPKLQMV2.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Function">Function</span></div><h1 id="updateeffect" class="ngde">updateEffect<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/updateEffect#updateeffect"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">this handles the update by calling the effectService.update() method. Any errors and retries should be handled by the service including reverting the optimistic update the service will return the latest rows that should be sent to the store.</p><p class="ngde">To support multiple calls to the effect in sequence, we handle debounces here but we use a long debounce time of 2 seconds. Since we are using optimistic updates, the changes will be seen locally immediately and the user will not be blocked by the debounce.</p></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/updateEffect#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">function</span> <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/updateEffect" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">updateEffect</a></span>(<span class="hljs-params ngde">effectServiceToken: InjectionToken&#x3C;<a href="/api/smart-ngrx/classes/EffectService" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">EffectService</a>&#x3C;T>>, actions: <a href="/api/smart-ngrx/interfaces/ActionGroup" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">ActionGroup</a>&#x3C;T>, feature: <span class="hljs-string ngde">"source must be a string literal type"</span>, entity: <span class="hljs-string ngde">"source must be a string literal type"</span></span>): <span class="hljs-function ngde">(<span class="hljs-params ngde">actions$?: Actions&#x3C;<span class="hljs-built_in ngde">any</span>>, effectService?: EffectService&#x3C;T></span>) =></span> <span class="hljs-title class_ ngde">Observable</span>&#x3C;<span class="hljs-built_in ngde">void</span>>;
</span></code></pre></section><section class="ngde"><h2 id="parameters" class="ngde">Parameters<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/updateEffect#parameters"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">effectServiceToken<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">InjectionToken&#x3C;EffectService&#x3C;T>></code></td><td class="ngde"><p class="ngde">the token for the effectService that will be called</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">actions<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionGroup&#x3C;T></code></td><td class="ngde"><p class="ngde">the action group for the source provided</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">feature<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">"source must be a string literal type"</code></td><td class="ngde"><p class="ngde">the name of the feature this is for</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entity<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">"source must be a string literal type"</code></td><td class="ngde"><p class="ngde">the name of the entity this is for</p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends t{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=a({type:e,selectors:[["ng-doc-page-api-smart-ngrx-functions-update-effect"]],standalone:!0,features:[i([{provide:t,useExisting:e}]),d,l],decls:1,vars:0,template:function(s,h){s&1&&c(0,"ng-doc-page")},dependencies:[o],encapsulation:2,changeDetection:0});let n=e;return n})(),f=[{path:"",component:p,title:"updateEffect"}],b=f;export{p as DynamicComponent,b as default};
