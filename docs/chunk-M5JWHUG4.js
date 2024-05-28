import{a as i}from"./chunk-6KUCJPJZ.js";import"./chunk-E7THTKCZ.js";import{a as d}from"./chunk-KWJISZMY.js";import{L as n,Qa as c,Ra as g,ia as t,va as l}from"./chunk-KMVYO2OY.js";import"./chunk-JPKLQMV2.js";var o=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Class">Class</span></div><h1 id="actionservice" class="ngde">ActionService<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#actionservice"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">Action Service is what we call to dispatch actions and do whatever logic is needed prior to the dispatch. This reduces the number of actions we need to create, makes the code easier to read, centralizes the access to the store, and keeps logic out of the reducer and effects without scattering the logic throughout the application.</p></section><section class="ngde"><h2 id="constructor" class="ngde">Constructor<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#constructor"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">constructor for the ActionService</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">constructor</span>(<span class="hljs-params ngde"></span>
</span><span class="line ngde"><span class="hljs-params ngde">	feature: StringLiteralSource&#x3C;Feature>, </span>
</span><span class="line ngde"><span class="hljs-params ngde">	entity: StringLiteralSource&#x3C;<a href="/api/smart-ngrx/interfaces/Entity" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">Entity</a>></span>
</span><span class="line ngde"><span class="hljs-params ngde"></span>): <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/classes/ActionService" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">ActionService</a></span>&#x3C;T, <span class="hljs-title class_ ngde">Feature</span>, <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/interfaces/Entity" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">Entity</a></span>>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="feature" data-slugtype="member" id="feature" class="ngde"><td indexable="false" class="ngde">feature<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">StringLiteralSource&#x3C;Feature></code></td><td class="ngde"><p class="ngde">the name of the feature this class is for</p></td></tr><tr data-slug="entity" data-slugtype="member" id="entity" class="ngde"><td indexable="false" class="ngde">entity<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">StringLiteralSource&#x3C;Entity></code></td><td class="ngde"><p class="ngde">the name of the entity this class is for</p></td></tr></tbody></table></div></td></tr></tbody></table></div></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="entities" data-slugtype="member" id="entities" class="ngde"><td indexable="false" class="ngde">entities<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">Observable&#x3C;Dictionary&#x3C;T>></code></td><td class="ngde"></td></tr><tr data-slug="entityAdapter" data-slugtype="member" id="entityAdapter" class="ngde"><td indexable="false" class="ngde">entityAdapter<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">EntityAdapter&#x3C;SmartNgRXRowBase></code></td><td class="ngde"><p class="ngde">entityAdapter is needed for delete</p></td></tr></tbody></table></div></section><section class="ngde"><h2 id="methods" class="ngde">Methods<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#methods"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="add" class="ngde">add()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#add"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">adds a row to the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">add</span>(<span class="hljs-attr ngde">row</span>: T, <span class="hljs-attr ngde">parentId</span>: <span class="hljs-built_in ngde">string</span>, <span class="hljs-attr ngde">parentService</span>: <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/classes/ActionService" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">ActionService</a></span>&#x3C;<span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/interfaces/SmartNgRXRowBase" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartNgRXRowBase</a></span>, <span class="hljs-built_in ngde">string</span>, <span class="hljs-built_in ngde">string</span>>): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">row<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">T</code></td><td class="ngde"><p class="ngde">the row to add</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">parentId<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the id of the parent row</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">parentService<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionService&#x3C;SmartNgRXRowBase, string, string></code></td><td class="ngde"><p class="ngde">the service for the parent row</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="delete" class="ngde">delete()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#delete"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Deletes the row represented by the Id from the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">delete</span>(<span class="hljs-attr ngde">id</span>: <span class="hljs-built_in ngde">string</span>): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">id<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string</code></td><td class="ngde"><p class="ngde">the id of the row to delete</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="garbagecollect" class="ngde">garbageCollect()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#garbagecollect"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Rows that can be removed are unregisterd from the garbage collection and then removed from the store if they are not being edited.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">garbageCollect</span>(<span class="hljs-attr ngde">ids</span>: <span class="hljs-built_in ngde">string</span>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">the ids to remove</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyids" class="ngde">loadByIds()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#loadbyids"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">Calls the loadByIds action to load the rows into the store.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">loadByIds</span>(<span class="hljs-attr ngde">ids</span>: <span class="hljs-built_in ngde">string</span>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">the ids to load</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyidspreload" class="ngde">loadByIdsPreload()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#loadbyidspreload"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">adds dummy rows to the store for ones we are retrieving</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">loadByIdsPreload</span>(<span class="hljs-attr ngde">ids</span>: <span class="hljs-built_in ngde">string</span>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">the ids we are retrieving</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="loadbyidssuccess" class="ngde">loadByIdsSuccess()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#loadbyidssuccess"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">puts the rows in the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">loadByIdsSuccess</span>(<span class="hljs-attr ngde">rows</span>: T[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">rows<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">T[]</code></td><td class="ngde"><p class="ngde">the rows to put in the store</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="markdirty" class="ngde">markDirty()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#markdirty"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">marks the rows as dirty</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">markDirty</span>(<span class="hljs-attr ngde">ids</span>: <span class="hljs-built_in ngde">string</span>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">the ids to mark as dirty</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="marknotdirty" class="ngde">markNotDirty()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#marknotdirty"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">marks the rows represented by the ids as not dirty</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">markNotDirty</span>(<span class="hljs-attr ngde">ids</span>: <span class="hljs-built_in ngde">string</span>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">the ids to mark as not dirty</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="remove" class="ngde">remove()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#remove"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">removes the rows represented by ids from the store unconditionally</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">remove</span>(<span class="hljs-attr ngde">ids</span>: <span class="hljs-built_in ngde">string</span>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">the ids of the rows to remove from the store</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="update" class="ngde">update()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#update"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">updates the row in the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">update</span>(<span class="hljs-attr ngde">oldRow</span>: T, <span class="hljs-attr ngde">newRow</span>: T): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">oldRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">T</code></td><td class="ngde"><p class="ngde">the row before the changes</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">newRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">T</code></td><td class="ngde"><p class="ngde">the row after the changes</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-method-table ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="updatemany" class="ngde">updateMany()<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/ActionService#updatemany"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">updates many rows in the store</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-title function_ ngde">updateMany</span>(<span class="hljs-attr ngde">changes</span>: <span class="hljs-title class_ ngde">UpdateStr</span>&#x3C;T>[]): <span class="hljs-built_in ngde">void</span>;
</span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-parameters-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-parameters-table-name ngde">Name</th><th class="ng-doc-parameters-table-type ngde">Type</th><th class="ng-doc-parameters-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">changes<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">UpdateStr&#x3C;T>[]</code></td><td class="ngde"><p class="ngde">the changes to make</p></td></tr></tbody></table></div><h5 class="no-anchor ngde" indexable="false">Returns</h5><p class="ngde"><code indexable="false" class="ngde">void</code></p></td></tr></tbody></table></div></section>`,p=(()=>{let e=class e extends d{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=o,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=n({type:e,selectors:[["ng-doc-page-api-smart-ngrx-classes-action-service"]],standalone:!0,features:[c([{provide:d,useExisting:e}]),t,g],decls:1,vars:0,template:function(a,b){a&1&&l(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0});let s=e;return s})(),h=[{path:"",component:p,title:"ActionService"}],v=h;export{p as DynamicComponent,v as default};
