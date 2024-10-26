import{a as r}from"./chunk-ICC3I7U3.js";import"./chunk-3NO74SQX.js";import"./chunk-A7763QJH.js";import{a as s}from"./chunk-JHHDKBNU.js";import"./chunk-4NKWSBMZ.js";import"./chunk-PTJD77X5.js";import{Pa as d,S as t,lb as o,mb as c,za as i}from"./chunk-UDQB7DFD.js";import"./chunk-TWZW5B45.js";var g=`<p class="ngde">This registers the adapter for the entity definition.</p><section indexable="false" class="ngde"><h2 id="see-also" href="api/functions/smart-ngrx/entityDefinitionCache" headinglink="true" class="ngde">See Also<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="see-also"></ng-doc-heading-anchor></h2><ul class="ng-doc-see-also ngde"><li class="ngde"><p class="ngde"><code class="ngde">EntityDefinition</code></p></li></ul></section><h2 id="presentation" href="api/functions/smart-ngrx/entityDefinitionCache" headinglink="true" class="ngde">Presentation<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="presentation"></ng-doc-heading-anchor></h2><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">function</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="api/functions/smart-ngrx/entityDefinitionCache" class="ng-doc-code-anchor ngde">entityDefinitionCache</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  featureName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  entityName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  entityDefinition</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">?:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> <a href="api/interfaces/smart-ngrx/SmartEntityDefinition" class="ng-doc-code-anchor ngde">SmartEntityDefinition</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">T</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">> </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">|</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> undefined</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> <a href="api/type-aliases/smart-ngrx/SmartValidatedEntityDefinition" class="ng-doc-code-anchor ngde">SmartValidatedEntityDefinition</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">T</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><h2 id="returns" href="api/functions/smart-ngrx/entityDefinitionCache" headinglink="true" class="ngde">Returns<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="returns"></ng-doc-heading-anchor></h2><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/type-aliases/smart-ngrx/SmartValidatedEntityDefinition" class="ng-doc-code-anchor ngde">SmartValidatedEntityDefinition</a>&#x3C;T></code> <span class="ngde">-</span><p class="ngde">the entity definition</p></div><h2 id="parameters" href="api/functions/smart-ngrx/entityDefinitionCache" headinglink="true" class="ngde">Parameters<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="parameters"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">featureName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the feature the entity belongs to</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the entity name to register the adapter for</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityDefinition<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="api/interfaces/smart-ngrx/SmartEntityDefinition" class="ng-doc-code-anchor ngde">SmartEntityDefinition</a>&#x3C;T> | undefined</code></td><td class="ngde"><p class="ngde">the <code class="ngde ng-doc-code-with-link"><a href="api/interfaces/smart-ngrx/SmartEntityDefinition" class="ng-doc-code-anchor ngde">SmartEntityDefinition</a></code> to register the adapter for</p></td></tr></tbody></table></div>`,a=class e extends s{constructor(){super();this.pageType="api";this.pageContent=g;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/libs/smart-ngrx/src/registrations/entity-definition-cache.function.ts?message=docs(): describe your changes here...#L27";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/libs/smart-ngrx/src/registrations/entity-definition-cache.function.ts#L27"}static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275cmp=t({type:e,selectors:[["ng-doc-page-75z3smis"]],standalone:!0,features:[o([{provide:s,useExisting:e}]),i,c],decls:1,vars:0,template:function(n,f){n&1&&d(0,"ng-doc-page")},dependencies:[r],encapsulation:2,changeDetection:0})}},p=[{path:"",component:a,title:"entityDefinitionCache"}],D=p;export{a as PageComponent,D as default};
