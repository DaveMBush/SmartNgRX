import{a as i}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as e}from"./chunk-3NJKGVAP.js";import"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as n,Fa as l,Wa as c,sb as t}from"./chunk-O44Q3Q27.js";import"./chunk-TWZW5B45.js";var r=`<p class="ngde">Manages the loading of rows by their Ids</p><h2 id="constructor" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">Constructor<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="constructor"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">The constructor for the LoadByIds class.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">constructor</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	private feature: string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	private entity: string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	private <a href="public-api/functions/public-api/store" class="ng-doc-code-anchor ngde">store</a>: Store</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">object</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): <a href="internal-api/classes/internal-api/LoadByIds" class="ng-doc-code-anchor ngde">LoadByIds</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="feature" data-slugtype="member" id="feature" class="ngde"><td indexable="false" class="ngde">feature<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param feature the name of the feature this class is for</p></td></tr><tr data-slug="entity" data-slugtype="member" id="entity" class="ngde"><td indexable="false" class="ngde">entity<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param entity the name of the entity this class is for</p></td></tr><tr data-slug="store" data-slugtype="member" id="store" class="ngde"><td indexable="false" class="ngde">store<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">Store&#x3C;object></code></td><td class="ngde"><p class="ngde">@param store the store to dispatch the actions to</p></td></tr></tbody></table></div></td></tr></tbody></table></div><h2 id="methods" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">Methods<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="methods"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="init" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">init()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="init"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Initializes the service with the actions and starts the dispatcher.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">init</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(actions: <a href="internal-api/interfaces/internal-api/ActionGroup" class="ng-doc-code-anchor ngde">ActionGroup</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> entities: Observable</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">Dictionary</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">>></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> defaultRow: (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">actions<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="internal-api/interfaces/internal-api/ActionGroup" class="ng-doc-code-anchor ngde">ActionGroup</a>&#x3C;<a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>></code></td><td class="ngde"><p class="ngde">@param actions the actions to use</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entities<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">Observable&#x3C;Dictionary&#x3C;<a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>>></code></td><td class="ngde"><p class="ngde">@param entities the entities to check for loading</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">defaultRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">(id: string) => <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></code></td><td class="ngde"><p class="ngde">@param defaultRow the default row to use</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyids" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">loadByIds()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="loadbyids"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">buffers the Id in the loadByIdsSubject.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">loadByIds</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(ids: string): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param ids the ids to load</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyidsdispatcher" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">loadByIdsDispatcher()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="loadbyidsdispatcher"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Dispatches the loadByIds action after buffering the ids.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">loadByIdsDispatcher</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyidspreload" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">loadByIdsPreload()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="loadbyidspreload"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Calls the loadByIdsPreload action to load the rows into the store.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">loadByIdsPreload</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(ids: string[]): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">@param ids the ids to load</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyidssuccess" href="internal-api/classes/internal-api/LoadByIds" headinglink="true" class="ngde">loadByIdsSuccess()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="loadbyidssuccess"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">puts the rows in the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">loadByIdsSuccess</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(rows: <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>[]): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">rows<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>[]</code></td><td class="ngde"><p class="ngde">@param rows the rows to put in the store</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div>`,d=class s extends e{constructor(){super();this.pageType="api";this.pageContent=r;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/libs/smart-ngrx/src/actions/action.service/load-by-ids.class.ts?message=docs(): describe your changes here...#L35";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/libs/smart-ngrx/src/actions/action.service/load-by-ids.class.ts#L35"}static{this.\u0275fac=function(a){return new(a||s)}}static{this.\u0275cmp=n({type:s,selectors:[["ng-doc-page-d4ldo75s"]],features:[t([{provide:e,useExisting:s}]),l],decls:1,vars:0,template:function(a,p){a&1&&c(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0})}},g=[{path:"",component:d,title:"LoadByIds"}],f=g;export{d as PageComponent,f as default};
