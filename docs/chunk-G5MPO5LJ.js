import{a as o}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as s}from"./chunk-3NJKGVAP.js";import"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as t,Fa as i,Wa as d,sb as r}from"./chunk-O44Q3Q27.js";import"./chunk-TWZW5B45.js";var c=`<p class="ngde">We can't, necessarily, register an entity as part of the provideSmartFeatureEntities() function because it gets called while the Routes are being registered. This means that the getGlobalMarkAndDeleteInit() function will return an empty object when it should return a full MarkAndDeleteInit object.</p><p class="ngde">This function exists to wait until the MarkAndDeleteInit object is fully populated before registering the entity.</p><h2 id="presentation" href="internal-api/functions/internal-api/delayedRegisterEntity" headinglink="true" class="ngde">Presentation<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="presentation"></ng-doc-heading-anchor></h2><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">function</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="internal-api/functions/internal-api/delayedRegisterEntity" class="ng-doc-code-anchor ngde">delayedRegisterEntity</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  featureName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  entityName</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  entityDefinition</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> <a href="public-api/interfaces/public-api/SmartEntityDefinition" class="ng-doc-code-anchor ngde">SmartEntityDefinition</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> boolean</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><h2 id="returns" href="internal-api/functions/internal-api/delayedRegisterEntity" headinglink="true" class="ngde">Returns<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="returns"></ng-doc-heading-anchor></h2><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">boolean</code> <span class="ngde">-</span><p class="ngde">true if the entity can't be registered yet and false if it has this is so it works with the takeWhile() in the calling code.</p></div><h2 id="parameters" href="internal-api/functions/internal-api/delayedRegisterEntity" headinglink="true" class="ngde">Parameters<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="parameters"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">featureName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param featureName the feature to register</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityName<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param entityName the entity in the feature to register</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entityDefinition<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartEntityDefinition" class="ng-doc-code-anchor ngde">SmartEntityDefinition</a>&#x3C;<a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>></code></td><td class="ngde"><p class="ngde">@param entityDefinition the entity definition that was originally passed to provideSmartFeatureEntities()</p></td></tr></tbody></table></div>`,n=class e extends s{constructor(){super();this.pageType="api";this.pageContent=c;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/libs/smart-ngrx/src/providers/delayed-register-entity.function.ts?message=docs(): describe your changes here...#L26";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/libs/smart-ngrx/src/providers/delayed-register-entity.function.ts#L26"}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275cmp=t({type:e,selectors:[["ng-doc-page-y6aqx34a"]],features:[r([{provide:s,useExisting:e}]),i],decls:1,vars:0,template:function(a,h){a&1&&d(0,"ng-doc-page")},dependencies:[o],encapsulation:2,changeDetection:0})}},g=[{path:"",component:n,title:"delayedRegisterEntity"}],m=g;export{n as PageComponent,m as default};
