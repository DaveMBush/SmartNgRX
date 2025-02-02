import{a as i}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a}from"./chunk-3NJKGVAP.js";import"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as d,Fa as c,Wa as t,sb as l}from"./chunk-O44Q3Q27.js";import"./chunk-TWZW5B45.js";var o=`<p class="ngde">This is an internal class used by <code class="ngde ng-doc-code-with-link"><a href="public-api/functions/public-api/createSmartSelector" class="ng-doc-code-anchor ngde">createSmartSelector</a></code> to wrap the field that represents the child array with a class that manages all the magic of loading the data from the server as it is accessed.</p><p class="ngde">Note: The constructor of this class returns a Proxy to intercept property accesses. This is an intentional and necessary design choice to achieve the desired behavior of dynamically loading data.</p><section indexable="false" class="ngde"><h2 id="see-also" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">See Also<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="see-also"></ng-doc-heading-anchor></h2><ul class="ng-doc-see-also ngde"><li class="ngde"><p class="ngde"><code class="ngde ng-doc-code-with-link"><a href="public-api/functions/public-api/createSmartSelector" class="ng-doc-code-anchor ngde">createSmartSelector</a></code></p></li></ul></section><h2 id="constructor" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">Constructor<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="constructor"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><tbody class="ngde"><tr class="ngde"><td class="ngde"><p class="ngde">The constructor for the ArrayProxy class.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">constructor</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	private childArray: string[] </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">|</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="internal-api/classes/internal-api/ArrayProxy" class="ng-doc-code-anchor ngde">ArrayProxy</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">P</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	private child: EntityState</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">	private childDefinition: <a href="internal-api/interfaces/internal-api/ChildDefinition" class="ng-doc-code-anchor ngde">ChildDefinition</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">P</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): <a href="internal-api/classes/internal-api/ArrayProxy" class="ng-doc-code-anchor ngde">ArrayProxy</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">P</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="childArray" data-slugtype="member" id="childArray" class="ngde"><td indexable="false" class="ngde">childArray<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">string[] | <a href="internal-api/classes/internal-api/ArrayProxy" class="ng-doc-code-anchor ngde">ArrayProxy</a>&#x3C;P, C></code></td><td class="ngde"><p class="ngde">@param childArray The ArrayProxy or string[] of ids to wrap</p></td></tr><tr data-slug="child" data-slugtype="member" id="child" class="ngde"><td indexable="false" class="ngde">child<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">EntityState&#x3C;C></code></td><td class="ngde"><p class="ngde">@param child The child <code class="ngde">EntityState</code> we use to find the item in the store</p></td></tr><tr data-slug="childDefinition" data-slugtype="member" id="childDefinition" class="ngde"><td indexable="false" class="ngde">childDefinition<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="internal-api/interfaces/internal-api/ChildDefinition" class="ng-doc-code-anchor ngde">ChildDefinition</a>&#x3C;P, C></code></td><td class="ngde"><p class="ngde">@param childDefinition The <code class="ngde ng-doc-code-with-link"><a href="internal-api/interfaces/internal-api/ChildDefinition" class="ng-doc-code-anchor ngde">ChildDefinition</a></code> that allows us to get at features, entities and other things we need.</p></td></tr></tbody></table></div></td></tr></tbody></table></div><h2 id="properties" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">Properties<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="properties"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table sticky first-colum-highlighted ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-api-table-name ngde">Name</th><th class="ng-doc-api-table-type ngde">Type</th><th class="ng-doc-api-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde" data-slug="[isProxy]" data-slugtype="member" id="[isProxy]"><td indexable="false" class="ngde"><span class="ngde">[isProxy]</span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">boolean</code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr><tr class="ngde" data-slug="childActionService" data-slugtype="member" id="childActionService"><td indexable="false" class="ngde"><span class="ngde">childActionService</span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link"><a href="internal-api/classes/internal-api/ActionService" class="ng-doc-code-anchor ngde">ActionService</a>&#x3C;C></code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr><tr class="ngde" data-slug="entityAdapter" data-slugtype="member" id="entityAdapter"><td indexable="false" class="ngde"><span class="ngde">entityAdapter</span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">EntityAdapter&#x3C;<a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>></code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr><tr class="ngde" data-slug="length" data-slugtype="member" id="length"><td indexable="false" class="ngde"><span class="ngde">length</span><div class="ng-doc-node-details ngde">implements <code class="ngde">ArrayLike</code></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr><tr class="ngde" data-slug="parentEntityAdapter" data-slugtype="member" id="parentEntityAdapter"><td indexable="false" class="ngde"><span class="ngde">parentEntityAdapter</span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde ng-doc-code-with-link">EntityAdapter&#x3C;<a href="public-api/interfaces/public-api/SmartNgRXRowBase" class="ng-doc-code-anchor ngde">SmartNgRXRowBase</a>></code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr><tr class="ngde" data-slug="rawArray" data-slugtype="member" id="rawArray"><td indexable="false" class="ngde"><span class="ngde">rawArray</span><div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><div class="ng-doc-api-status ngde"></div></td></tr></tbody></table></div><h2 id="methods" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">Methods<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="methods"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="symboliterator" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">[Symbol.iterator]()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="symboliterator"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde">implements <code class="ngde">Iterable</code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Implements iterator so we can use methods that depend on iterable.</p><p class="ngde">@yields The next item in the iteration.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[Symbol</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">iterator](): Iterator</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> &#x26;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="public-api/interfaces/public-api/RowProxyDelete" class="ng-doc-code-anchor ngde">RowProxyDelete</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> any</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde"> undefined</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link">Iterator&#x3C;C &#x26; <a href="public-api/interfaces/public-api/RowProxyDelete" class="ng-doc-code-anchor ngde">RowProxyDelete</a>, any, undefined></code> <span class="ngde">-</span><p class="ngde">The next item in the iteration.</p></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="addtostore" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">addToStore()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="addtostore"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde">implements <code class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartArray" class="ng-doc-code-anchor ngde">SmartArray</a></code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">This method allows us to add an item to the array. Make sure it contains and ID field and any other defaults you might need</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">addToStore</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(newRow: </span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> thisRow: </span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">P</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">newRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">C</code></td><td class="ngde"><p class="ngde">@param newRow the item to add to the array</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">thisRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">P</code></td><td class="ngde"><p class="ngde">@param thisRow the parent entity (this row) that contains the array</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="getatindex" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">getAtIndex()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="getatindex"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">Allows us to go after the data in the store based on the index of the array.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">getAtIndex</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(index: number): </span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> &#x26;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="public-api/interfaces/public-api/RowProxyDelete" class="ng-doc-code-anchor ngde">RowProxyDelete</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">index<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><p class="ngde">@param index the index into the rawArray that has the ID we will lookup in the entity.</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link">C &#x26; <a href="public-api/interfaces/public-api/RowProxyDelete" class="ng-doc-code-anchor ngde">RowProxyDelete</a></code> <span class="ngde">-</span><p class="ngde">the item from the store or the default row if it is not in the store yet.</p></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="getidatindex" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">getIdAtIndex()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="getidatindex"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde">implements <code class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartArray" class="ng-doc-code-anchor ngde">SmartArray</a></code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">returns the id at the given index, if the array is a virtual array, the id is returned without fetching from the server.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">getIdAtIndex</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(index: number): string </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">|</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde"> undefined</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">index<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><p class="ngde">@param index the index to get the id at</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">string | undefined</code> <span class="ngde">-</span><p class="ngde">the id at the given index</p></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="getservices" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">getServices()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="getservices"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">grabs common actions and store used by other methods</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"><a href="internal-api/functions/internal-api/getServices" class="ng-doc-code-anchor ngde">getServices</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(): { service</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="internal-api/classes/internal-api/ActionService" class="ng-doc-code-anchor ngde">ActionService</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">; parentService: <a href="internal-api/classes/internal-api/ActionService" class="ng-doc-code-anchor ngde">ActionService</a></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">P</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">; }</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link">{ service: <a href="internal-api/classes/internal-api/ActionService" class="ng-doc-code-anchor ngde">ActionService</a>&#x3C;C>; parentService: <a href="internal-api/classes/internal-api/ActionService" class="ng-doc-code-anchor ngde">ActionService</a>&#x3C;P>; }</code> <span class="ngde">-</span><p class="ngde">the <code class="ngde ng-doc-code-with-link"><a href="internal-api/classes/internal-api/ActionService" class="ng-doc-code-anchor ngde">ActionService</a></code> for the child and the parent</p></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="init" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">init()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="init"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">This initialized the class once it has been created. We do this so that we can test the class without having to worry about executable code in the constructor.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">init</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="removefromstore" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">removeFromStore()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="removefromstore"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde">implements <code class="ngde ng-doc-code-with-link"><a href="public-api/interfaces/public-api/SmartArray" class="ng-doc-code-anchor ngde">SmartArray</a></code></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">This removes a row from the store that was previously added, but not saved to the server yet.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">removeFromStore</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(row: </span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> parent: </span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">P</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">): </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">void</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Parameters</h5><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">row<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">C</code></td><td class="ngde"><p class="ngde">@param row the row to remove from the array</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">parent<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">P</code></td><td class="ngde"><p class="ngde">@param parent the parent entity that contains the array</p></td></tr></tbody></table></div><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">void</code></div></td></tr></tbody></table></div><div class="ng-doc-table-wrapper ngde"><table class="ngde"><thead class="ngde"><tr class="ngde"><th indexable="false" class="ngde"><h3 data-slugtype="member" id="tojson" href="internal-api/classes/internal-api/ArrayProxy" headinglink="true" class="ngde">toJSON()<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="tojson"></ng-doc-heading-anchor></h3><div class="ng-doc-node-details ngde"></div></th></tr></thead><tbody class="ngde"><tr class="ngde"><td class="ngde"><div class="ng-doc-api-status ngde"></div><p class="ngde">This primarily exist for testing so you can stringify the array and then parse it so that you get an array you can compare against instead of an object of type ArrayProxy that you can't do much with.</p></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Presentation</h5><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">toJSON</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(): (</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">C</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> &#x26;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> <a href="public-api/interfaces/public-api/RowProxyDelete" class="ng-doc-code-anchor ngde">RowProxyDelete</a>)[]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre></td></tr><tr class="ngde"><td class="ngde"><h5 class="no-anchor ng-doc-secondary-heading ngde" indexable="false">Returns</h5><div class="ng-doc-returns ngde"><code indexable="false" class="ngde ng-doc-code-with-link">(C &#x26; <a href="public-api/interfaces/public-api/RowProxyDelete" class="ng-doc-code-anchor ngde">RowProxyDelete</a>)[]</code> <span class="ngde">-</span><p class="ngde">what this would return if it were a real array. Mostly for unit testing.</p></div></td></tr></tbody></table></div>`,n=class e extends a{constructor(){super();this.pageType="api";this.pageContent=o;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/libs/smart-ngrx/src/selector/array-proxy.class.ts?message=docs(): describe your changes here...#L39";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/libs/smart-ngrx/src/selector/array-proxy.class.ts#L39"}static{this.\u0275fac=function(s){return new(s||e)}}static{this.\u0275cmp=d({type:e,selectors:[["ng-doc-page-vw3kpb2j"]],features:[l([{provide:a,useExisting:e}]),c],decls:1,vars:0,template:function(s,p){s&1&&t(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0})}},g=[{path:"",component:n,title:"ArrayProxy"}],B=g;export{n as PageComponent,B as default};
