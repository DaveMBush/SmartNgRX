import{a as r}from"./chunk-6KUCJPJZ.js";import"./chunk-E7THTKCZ.js";import{a}from"./chunk-KWJISZMY.js";import{L as t,Qa as c,Ra as o,ia as i,va as d}from"./chunk-KMVYO2OY.js";import"./chunk-JPKLQMV2.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Function">Function</span></div><h1 id="providesmartfeatureentities" class="ngde">provideSmartFeatureEntities<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/provideSmartFeatureEntities#providesmartfeatureentities"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">This provides all the NgRX parts for a given feature and entity</p><p class="ngde">Note: the generic parameters are implied so they are not documented here.</p><h2 id="usage" class="ngde">Usage:<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/provideSmartFeatureEntities#usage"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-attr ngde">providers</span>: [
</span><span class="line ngde">...
</span><span class="line ngde"><span class="hljs-title function_ ngde">provideEntities</span>(<span class="hljs-string ngde">'someFeature'</span>, entityDefinitions),
</span><span class="line ngde">...
</span><span class="line ngde">],
</span></code></pre></section><section indexable="false" class="ngde"><h2 id="see-also" class="ngde">See Also<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/provideSmartFeatureEntities#see-also"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><ul class="ng-doc-see-also ngde"><li class="ngde"><p class="ngde"><code class="ngde">EntityDefinition</code></p></li></ul></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/provideSmartFeatureEntities#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">function</span> <span class="hljs-title function_ ngde"><a href="/api/smart-ngrx/functions/provideSmartFeatureEntities" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">provideSmartFeatureEntities</a></span>(<span class="hljs-params ngde">featureName: StringLiteralSource&#x3C;F>, entityDefinitions: <a href="/api/smart-ngrx/interfaces/SmartEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartEntityDefinition</a>&#x3C;<a href="/api/smart-ngrx/interfaces/SmartNgRXRowBase" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartNgRXRowBase</a>>[]</span>): <span class="hljs-title class_ ngde">EnvironmentProviders</span>;
</span></code></pre></section><section class="ngde"><h2 id="parameters" class="ngde">Parameters<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/functions/provideSmartFeatureEntities#parameters"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">featureName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">StringLiteralSource&#x3C;F></code></td><td class="ngde"><p class="ngde">This is the name you would use for forFeature() in standard NgRX code.</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityDefinitions<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">SmartEntityDefinition&#x3C;SmartNgRXRowBase>[]</code></td><td class="ngde"><p class="ngde">An array of entity definitions.</p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-api-smart-ngrx-functions-provide-smart-feature-entities"]],standalone:!0,features:[c([{provide:a,useExisting:e}]),i,o],decls:1,vars:0,template:function(s,f){s&1&&d(0,"ng-doc-page")},dependencies:[r],encapsulation:2,changeDetection:0});let n=e;return n})(),h=[{path:"",component:p,title:"provideSmartFeatureEntities"}],v=h;export{p as DynamicComponent,v as default};
