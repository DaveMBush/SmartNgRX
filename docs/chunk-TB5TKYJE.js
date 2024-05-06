import{a as o}from"./chunk-K5QFLXY4.js";import"./chunk-4WCN3XK4.js";import{a}from"./chunk-Z7774WOE.js";import{M as t,Sa as l,Ta as d,ja as c,xa as i}from"./chunk-2UQX2IQT.js";import"./chunk-P2VZOJAX.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Function">Function</span></div><h1 id="bufferaction" class="ngde">bufferAction<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/bufferAction#bufferaction"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">This is an internal function that is used by the Effects to buffer IDs of an action coming into an effect so that we can dispatch them independently but send them to the server in a single request.</p><p class="ngde">NOTE: bufferAction assumes an array of ids is passed to the action it is buffering.</p><h2 id="usage" class="ngde">Usage:<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/bufferAction#usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">load$ = <span class="hljs-title function_ ngde">createEffect</span>(
</span><span class="line ngde">(<span class="hljs-params ngde"></span>
</span><span class="line ngde"><span class="hljs-params ngde">actions$ = inject(Actions),</span>
</span><span class="line ngde"><span class="hljs-params ngde">actionService = inject(effectServiceToken),</span>
</span><span class="line ngde"><span class="hljs-params ngde">zone: NgZone = inject(NgZone)</span>
</span><span class="line ngde"><span class="hljs-params ngde"></span>) => {
</span><span class="line ngde"><span class="hljs-keyword ngde">return</span> actions$.<span class="hljs-title function_ ngde">pipe</span>(
</span><span class="line ngde"><span class="hljs-title function_ ngde">ofType</span>(actions.<span class="hljs-property ngde">loadByIds</span>),
</span><span class="line ngde"><span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/bufferAction" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">bufferAction</a></span>(zone), <span class="hljs-comment ngde">// &#x3C;--- buffer the ids</span>
</span><span class="line ngde"><span class="hljs-title function_ ngde">mergeMap</span>(<span class="hljs-function ngde">(<span class="hljs-params ngde">ids</span>) =></span> actionService.<span class="hljs-title function_ ngde">loadByIds</span>(ids)),
</span><span class="line ngde"><span class="hljs-title function_ ngde">map</span>(<span class="hljs-function ngde">(<span class="hljs-params ngde">rows</span>) =></span> actions.<span class="hljs-title function_ ngde">loadByIdsSuccess</span>({ rows }))
</span><span class="line ngde">);
</span><span class="line ngde">},
</span><span class="line ngde">{ <span class="hljs-attr ngde">functional</span>: <span class="hljs-literal ngde">true</span> }
</span><span class="line ngde">);
</span></code></pre></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/bufferAction#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">function</span> <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/bufferAction" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">bufferAction</a></span>(<span class="hljs-params ngde">ngZone: NgZone, bufferTime: <span class="hljs-built_in ngde">number</span> = <span class="hljs-number ngde">1</span></span>): <span class="hljs-function ngde">(<span class="hljs-params ngde">source: Observable&#x3C;Action></span>) =></span> <span class="hljs-title class_ ngde">Observable</span>&#x3C;<span class="hljs-built_in ngde">string</span>[]>;
</span></code></pre></section><section class="ngde"><h2 id="parameters" class="ngde">Parameters<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/bufferAction#parameters"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ngZone<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">NgZone</code></td><td class="ngde"><p class="ngde">The zone to use to run outside of Angular.</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">bufferTime<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><p class="ngde">The time to buffer the ids before sending them to the server. The default is 1ms which only allow the buffer to last until the thread frees up and is probably all we will ever need.</p></td></tr></tbody></table></div></section>`,r=(()=>{let n=class n extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t({type:n,selectors:[["ng-doc-page-api-smart-ngrx-functions-buffer-action"]],standalone:!0,features:[l([{provide:a,useExisting:n}]),c,d],decls:1,vars:0,template:function(e,h){e&1&&i(0,"ng-doc-page")},dependencies:[o],encapsulation:2,changeDetection:0});let s=n;return s})(),f=[{path:"",component:r,title:"bufferAction"}],b=f;export{r as DynamicComponent,b as default};
