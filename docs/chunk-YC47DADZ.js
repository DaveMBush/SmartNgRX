import{a as c}from"./chunk-ICC3I7U3.js";import"./chunk-3NO74SQX.js";import"./chunk-A7763QJH.js";import{a}from"./chunk-JHHDKBNU.js";import"./chunk-4NKWSBMZ.js";import"./chunk-PTJD77X5.js";import{Pa as o,S as d,lb as l,mb as i,za as t}from"./chunk-UDQB7DFD.js";import"./chunk-TWZW5B45.js";var g=`<p class="ngde">Filters out the rows we already have and provides a default row for the ones we don't have.</p><h2 id="presentation" href="api/functions/smart-ngrx/defaultRows" headinglink="true" class="ngde">Presentation<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="presentation"></ng-doc-heading-anchor></h2><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">function</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> <a href="api/functions/smart-ngrx/defaultRows" class="ng-doc-code-anchor ngde">defaultRows</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  ids</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">  entities</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> Dictionary</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">T</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">> </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">|</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> undefined</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">  defaultRow</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde"> string</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> T</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">:</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> T</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">[]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><h2 id="returns" href="api/functions/smart-ngrx/defaultRows" headinglink="true" class="ngde">Returns<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="returns"></ng-doc-heading-anchor></h2><div class="ng-doc-returns ngde"><code indexable="false" class="ngde">T[]</code> <span class="ngde">-</span><p class="ngde">The default rows for the ids that are missing</p></div><h2 id="parameters" href="api/functions/smart-ngrx/defaultRows" headinglink="true" class="ngde">Parameters<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="parameters"></ng-doc-heading-anchor></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-api-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ngde">Name</th><th class="ngde">Type</th><th class="ngde">Description</th></tr></thead><tbody class="ngde"><tr class="ngde"><td indexable="false" class="ngde">ids<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">string[]</code></td><td class="ngde"><p class="ngde">The ids to check</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">entities<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">Dictionary&#x3C;T> | undefined</code></td><td class="ngde"><p class="ngde">The Dictionary of rows</p></td></tr><tr class="ngde"><td indexable="false" class="ngde">defaultRow<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(id: string) => T</code></td><td class="ngde"><p class="ngde">The defaultRow function to use to</p></td></tr></tbody></table></div>`,n=class s extends a{constructor(){super();this.pageType="api";this.pageContent=g;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/libs/smart-ngrx/src/reducers/default-rows.function.ts?message=docs(): describe your changes here...#L16";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/libs/smart-ngrx/src/reducers/default-rows.function.ts#L16"}static{this.\u0275fac=function(e){return new(e||s)}}static{this.\u0275cmp=d({type:s,selectors:[["ng-doc-page-ot3p3s7z"]],standalone:!0,features:[l([{provide:a,useExisting:s}]),t,i],decls:1,vars:0,template:function(e,k){e&1&&o(0,"ng-doc-page")},dependencies:[c],encapsulation:2,changeDetection:0})}},p=[{path:"",component:n,title:"defaultRows"}],B=p;export{n as PageComponent,B as default};
