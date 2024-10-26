import{a as h}from"./chunk-2NLE4TRD.js";import"./chunk-HBZWFD3Q.js";import{a as k}from"./chunk-ICC3I7U3.js";import"./chunk-3NO74SQX.js";import"./chunk-A7763QJH.js";import{a as n}from"./chunk-JHHDKBNU.js";import{X as u}from"./chunk-4NKWSBMZ.js";import"./chunk-PTJD77X5.js";import{Pa as c,S as r,lb as d,mb as p,za as t}from"./chunk-UDQB7DFD.js";import{a as o,b as i,h as D}from"./chunk-TWZW5B45.js";var y=D(u());var E={title:"Retrieving Rows",mdFile:"./index.md",order:1,category:h},s=E;var g=[];var m={},B=m;var f=`<h1 id="retrieving-rows" href="using-smart-ng-rx/crud-support/retrieving" headinglink="true" class="ngde">Retrieving Rows<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="retrieving-rows"></ng-doc-heading-anchor></h1><h2 id="introduction" href="using-smart-ng-rx/crud-support/retrieving" headinglink="true" class="ngde">Introduction<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="introduction"></ng-doc-heading-anchor></h2><p class="ngde">SmartNgRX expects every row within an entity that has children to have an array of IDs that point to the children. By using the <code class="ngde ng-doc-code-with-link"><a href="api/functions/smart-ngrx/createSmartSelector" class="ng-doc-code-anchor ngde">createSmartSelector</a></code> function, you will automatically get the children of the row you are retrieving when you access the array element. You will not need to dispatch any actions for this to happen. It will just work.</p><p class="ngde">See the <a href="/using-smart-ng-rx/smart-selectors" class="ngde">Smart Selectors</a> section for more information.</p><h2 id="effects-service" href="using-smart-ng-rx/crud-support/retrieving" headinglink="true" class="ngde">Effects Service<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="effects-service"></ng-doc-heading-anchor></h2><p class="ngde">What you will need to provide is the <code class="ngde ng-doc-code-with-link"><a href="api/classes/smart-ngrx/EffectService" class="ng-doc-code-anchor ngde">EffectService</a></code> that will retrieve the rows from the server. You will need to implement the <code class="ngde">loadByIds</code> method, which will be called with the list of IDs the code has determined it does not yet have or have been marked as dirty and it needs to render on the screen some place.</p><p class="ngde">Keep in mind that any time you access an array element directly, you will trigger the retrieval process for that row. This is by design. If you want to retrieve the ID and not the row, you can use the array's <code class="ngde">rawArray</code> property. You might use this if you are iterating through the array for the purposes of virtual scrolling as we've done in the example code.</p><h2 id="sample-code" href="using-smart-ng-rx/crud-support/retrieving" headinglink="true" class="ngde">Sample Code<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="sample-code"></ng-doc-heading-anchor></h2><p class="ngde">Here is a sample implementation of a <code class="ngde">loadByIds</code> method from the SmartNgRX Demo application:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">override </span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">loadByIds</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">ids</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> Observable</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">&#x3C;</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">Location[]</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">></span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  ids</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  return</span><span style="color:#005CC5;--shiki-dark:#39BAE6;font-style:inherit;--shiki-dark-font-style:italic" class="ngde"> this</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">http</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">post</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">Location</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]>(</span><span style="color:#005CC5;--shiki-dark:#39BAE6;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">this</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">apiLocation</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> ids)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><p class="ngde">This code assumes that everything you need for the row is available from the server.</p><p class="ngde">You might notice that we are using a POST instead of a GET to retrieve the data. If you prefer, you can use a GET. We've chosen to use a POST because we can send a list of IDs to the server and we want that list of IDs to be as large as needed and not limited by the URL size restrictions inherent in using GET.</p><h2 id="retrieving-the-top-level-store" href="using-smart-ng-rx/crud-support/retrieving" headinglink="true" class="ngde">Retrieving the top level store<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="retrieving-the-top-level-store"></ng-doc-heading-anchor></h2><p class="ngde">The obvious question you might ask is, "if everything has a parent, how can I retrieve the top level data?" The answer is that you can set the <code class="ngde">isInitialRow</code> field to <code class="ngde">true</code> in the entity definition. This is a special marker that tells SmartNgRX that this row has no parent and should be retrieved when the entity is loaded.</p><p class="ngde">You'll need to specify the loadByIds method to retrieve the top level data. This will be the ids of the child fields you'll need to retrieve when the child data is requested.</p><p class="ngde">In the demo project, we've created a <code class="ngde">Top</code> Entity that has no parent.</p><p class="ngde">Here is a typical <code class="ngde">Top</code> entity definition from the demo project:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">export</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> standardTopDefinition</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> <a href="api/interfaces/smart-ngrx/SmartEntityDefinition" class="ng-doc-code-anchor ngde">SmartEntityDefinition</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">Top</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">> </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  entityName</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'top'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  effectServiceToken</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> topEffectsServiceToken</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  isInitialRow</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde"> true</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">  defaultRow</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> ({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    id</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    locations</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> []</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    isDirty</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde"> false</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  })</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><p class="ngde">It will retrieve the locations ids. You can have your top level entity retrieve as many children as you need.</p><p class="ngde">To select the locations, our code looks like this:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// First we use a standard selector to retrieve the top entity</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">export</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> selectTopEntities</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> createSelector</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(selectTreeStandardState</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">state</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  return</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> state</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">top</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">})</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// then we use a smart selector to retrieve the top row and the locations</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">export</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> selectTopLocations</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="api/functions/smart-ngrx/createSmartSelector" class="ng-doc-code-anchor ngde">createSmartSelector</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(selectTopEntities</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    childFeature</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'tree-standard'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    childEntity</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'locations'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    parentField</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'locations'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    parentFeature</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'tree-standard'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    parentEntity</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'top'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    childSelector</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> selectLocationsDepartments</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  }</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">])</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// Finally, we create a standard selector to pick the locations out of the</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">// top smart selector</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">export</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> selectLocations</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> createSelector</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(selectTopLocations</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">tops</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  return</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (tops</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde">length</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> ===</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde"> 1</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> ?</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> tops</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">entities[tops</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids[</span><span style="color:#005CC5;--shiki-dark:#D2A6FF" class="ngde">0</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">]]</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">!</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">locations </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> []) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">as</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> Location</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">})</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><p class="ngde">By setting up the code in this way, you'll never have to dispatch an action to retrieve the top level data. This is all handled internally by SmartNgRX.</p>`,l=class a extends n{constructor(){super();this.pageType="guide";this.pageContent=f;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/crud-support/retrieving/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/using-smart-ng-rx/crud-support/retrieving/index.md";this.page=s;this.demoAssets=B}static{this.\u0275fac=function(e){return new(e||a)}}static{this.\u0275cmp=r({type:a,selectors:[["ng-doc-page-ua2g72xq"]],standalone:!0,features:[d([{provide:n,useExisting:a},g,s.providers??[]]),t,p],decls:1,vars:0,template:function(e,v){e&1&&c(0,"ng-doc-page")},dependencies:[k],encapsulation:2,changeDetection:0})}},C=[i(o({},(0,y.isRoute)(s.route)?s.route:{}),{path:"",component:l,title:"Retrieving Rows"})],M=C;export{l as PageComponent,M as default};
