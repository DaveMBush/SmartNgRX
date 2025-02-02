import{a as o}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as s}from"./chunk-3NJKGVAP.js";import"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as n,Fa as l,Wa as t,sb as c}from"./chunk-O44Q3Q27.js";import"./chunk-TWZW5B45.js";var r=`<p class="ngde">Class responsible for updating rows in the store</p><h2 id="constructor" href="internal-api/classes/internal-api/Update" headinglink="true" class="ngde">Constructor<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="constructor"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">constructor</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">constructor</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	readonly feature: string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	readonly entity: string</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	readonly entityAdapter: EntityAdapter</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">T</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	readonly loadByIdsSuccess: (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">rows</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> T</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> void</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): <a href="internal-api/classes/internal-api/Update" class="ng-doc-code-anchor ngde">Update</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">T</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="feature" data-slugtype="member" id="feature" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span> </span>feature<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param feature the feature name</p></td></tr><tr data-slug="entity" data-slugtype="member" id="entity" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span> </span>entity<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">@param entity the entity name</p></td></tr><tr data-slug="entityAdapter" data-slugtype="member" id="entityAdapter" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span> </span>entityAdapter<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">EntityAdapter&#x3C;T></code></td><td class="ngde"><p class="ngde">@param entityAdapter the entity adapter</p></td></tr><tr data-slug="loadByIdsSuccess" data-slugtype="member" id="loadByIdsSuccess" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span> </span>loadByIdsSuccess<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(rows: T[]) => void</code></td><td class="ngde"><p class="ngde">@param loadByIdsSuccess the loadByIdsSuccess action function</p></td></tr></tbody></table></div></td></tr></tbody></table></div><h2 id="properties" href="internal-api/classes/internal-api/Update" headinglink="true" class="ngde">Properties<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="properties"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table sticky first-colum-highlighted ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-api-table-name ngde">Name</th><th class="ng-doc-api-table-type ngde">Type</th><th class="ng-doc-api-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde" data-slug="lastRow" data-slugtype="member" id="lastRow"><td indexable="false" class="ngde"><span class="ngde">lastRow <span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected, Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> <span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span></span></span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">Map&#x3C;string, <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>></code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr><tr class="ngde" data-slug="lastRowTimeout" data-slugtype="member" id="lastRowTimeout"><td indexable="false" class="ngde"><span class="ngde">lastRowTimeout <span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Protected, Readonly" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="protected">p</span> <span class="ng-doc-badge ngde" indexable="false" data-content="readonly">r</span></span></span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">Map&#x3C;string, number></code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr></tbody></table></div><h2 id="methods" href="internal-api/classes/internal-api/Update" headinglink="true" class="ngde">Methods<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="methods"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><div class="ng-doc-modifiers-wrapper ngde" indexable="false"><span class="ng-doc-modifier ngde" indexable="false" data-content="protected">protected</span></div><h3 data-slugtype="member" id="handleupdateerror" href="internal-api/classes/internal-api/Update" headinglink="true" class="ngde">handleUpdateError()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="handleupdateerror"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Handles update errors by rolling back to the original row</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">protected </span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">handleUpdateError</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(error: unknown</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> originalRow: <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>): Observable</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">T</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">error<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">unknown</code></td><td class="ngde"><p class="ngde">@param error The error that occurred</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">originalRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></code></td><td class="ngde"><p class="ngde">@param originalRow The original row to roll back to</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">Observable&#x3C;T[]></code> <span class="ngde">-</span><p class="ngde">An observable of the original row</p></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="init" href="internal-api/classes/internal-api/Update" headinglink="true" class="ngde">init()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="init"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Initializes the update pipeline</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">init</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="update" href="internal-api/classes/internal-api/Update" headinglink="true" class="ngde">update()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="update"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">updates the row in the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">update</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(oldRow: <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> newRow: <a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">oldRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></code></td><td class="ngde"><p class="ngde">@param oldRow the row before the changes</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">newRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a></code></td><td class="ngde"><p class="ngde">@param newRow the row after the changes</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div>`,d=class a extends s{constructor(){super();this.pageType="api";this.pageContent=r;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/libs/smart-ngrx/src/actions/action.service/update.class.ts?message=docs(): describe your changes here...#L40";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/libs/smart-ngrx/src/actions/action.service/update.class.ts#L40"}static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275cmp=n({type:a,selectors:[["ng-doc-page-2iggp1bl"]],features:[c([{provide:s,useExisting:a}]),l],decls:1,vars:0,template:function(e,h){e&1&&t(0,"ng-doc-page")},dependencies:[o],encapsulation:2,changeDetection:0})}},g=[{path:"",component:d,title:"Update"}],f=g;export{d as PageComponent,f as default};
