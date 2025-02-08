import{a as k}from"./chunk-HBZWFD3Q.js";import{a as t}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as e}from"./chunk-3NJKGVAP.js";import{X as D}from"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as c,Fa as d,Wa as r,sb as p}from"./chunk-O44Q3Q27.js";import{a as o,b as i,h as y}from"./chunk-TWZW5B45.js";var B=y(D());var E={title:"WebSockets",mdFile:"./index.md",order:13,category:k},s=E;var h=[];var m={},g=m;var u=`<h1 id="websockets" href="using-smart-ng-rx/web-sockets" headinglink="true" class="ngde">WebSockets<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="websockets"></ng-doc-heading-anchor></h1><p class="ngde">To use SmartNgRX with WebSockets, you'll need to establish your own WebSocket connection. The only information you'll need to pass up to the client are which type of action needs to be performed, the table name that is impacted, and the ids of the records that are impacted.</p><h2 id="updates" href="using-smart-ng-rx/web-sockets" headinglink="true" class="ngde">Updates<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="updates"></ng-doc-heading-anchor></h2><p class="ngde">So, as an example, if you update the content of a row in the <code class="ngde">users</code> table, you'll need to send a message to the client that might like this:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-json"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">{</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "action"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "update"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "table"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "users"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "ids"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">"1"</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span></span></code></pre><p class="ngde">Normally, there will only be one element in the array, but we've created the APIs to handle multiple IDs in case you need to update multiple records at once.</p><p class="ngde">Then you would pass this information to SmartNgRX using this code:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">import</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> { <a href="public-api/functions/public-api/handleSocketNotification" class="ng-doc-code-anchor ngde">handleSocketNotification</a> } </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">from</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> '@smarttools/smart-ngrx'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"><a href="public-api/functions/public-api/handleSocketNotification" class="ng-doc-code-anchor ngde">handleSocketNotification</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">action</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><h2 id="creates" href="using-smart-ng-rx/web-sockets" headinglink="true" class="ngde">Creates<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="creates"></ng-doc-heading-anchor></h2><p class="ngde">When you add a row to the <code class="ngde">users</code> table, you might think that you'd send a message the might look like this:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-json"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">{</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "action"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "create"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "table"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "users"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "ids"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">"1"</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span></span></code></pre><p class="ngde">But, when you add a row, you'd typically add it as a child of another row, so what you really want to update is the parent row. So, you'd send a message that might look like this:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-json"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">{</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "action"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "update"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "table"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "organizations"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "ids"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">"1"</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span></span></code></pre><p class="ngde">Where, <code class="ngde">organizations</code> is the table that is the parent of the <code class="ngde">users</code> table. In this case, the <code class="ngde">ids</code> array would contain the id of the organizations row that is affected, not the users row.</p><h2 id="deletes" href="using-smart-ng-rx/web-sockets" headinglink="true" class="ngde">Deletes<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="deletes"></ng-doc-heading-anchor></h2><p class="ngde">Given this, you might think that deleting a row would also use the update method, but in this case it is more difficult to determine all the places the row might be referenced from, but we already know all the places it is referenced from on the client side, so we can just send a message that looks like this:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-json"><span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">{</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "action"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "delete"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "table"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> "users"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#005CC5;--shiki-dark:#39BAE6" class="ngde">  "ids"</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">"1"</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">]</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span></span></code></pre><p class="ngde">And then we pass it to SmartNgRX using this code:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">import</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> { <a href="public-api/functions/public-api/handleSocketNotification" class="ng-doc-code-anchor ngde">handleSocketNotification</a> } </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">from</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> '@smarttools/smart-ngrx'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"><a href="public-api/functions/public-api/handleSocketNotification" class="ng-doc-code-anchor ngde">handleSocketNotification</a></span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">(data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">action</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><p class="ngde">And SmartNgRX will take care of the rest.</p><h2 id="translations" href="using-smart-ng-rx/web-sockets" headinglink="true" class="ngde">Translations<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="translations"></ng-doc-heading-anchor></h2><p class="ngde">In the demo code, we have rows that we modify that aren't directly parented by tables represented in the UI. That is, on the server, we have <code class="ngde">Docs</code>, <code class="ngde">Folders</code>, etc., but they are represented in the UI as <code class="ngde">departmentChildren</code>. Since good programming practice says that the server should not know how the client uses the data, what the server sends up is going to have a value for <code class="ngde">table</code> that is the same as the table name on the server, and the client will have a map that maps the server table name to the client table name. In the demo code, we've mapped the table like this:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">switch</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> (data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table) {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  case</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'docs'</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'departmentChildren'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">map</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">((</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> \`docs:</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">\${</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">}</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">\`</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">    break</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  case</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'lists'</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'departmentChildren'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">map</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">((</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> \`lists:</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">\${</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">}</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">\`</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">    break</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  case</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'folders'</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'departmentChildren'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">map</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">((</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> \`folders:</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">\${</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">}</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">\`</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">    break</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  case</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'sprintFolders'</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">:</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">table </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> 'departmentChildren'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids </span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde">=</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> data</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">ids</span><span style="color:#24292E;--shiki-dark:#F29668" class="ngde">.</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">map</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">((</span><span style="color:#E36209;--shiki-dark:#D2A6FF" class="ngde">id</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">) </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">=></span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> \`sprint-folders:</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">\${</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">id</span><span style="color:#032F62;--shiki-dark:#FF8F40" class="ngde">}</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">\`</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">    break</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">  default</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">:</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">    break</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">}</span></span></code></pre><p class="ngde">before we pass it on down to SmartNgRX.</p>`,l=class a extends e{constructor(){super();this.pageType="guide";this.pageContent=u;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/web-sockets/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/using-smart-ng-rx/web-sockets/index.md";this.page=s;this.demoAssets=g}static{this.\u0275fac=function(n){return new(n||a)}}static{this.\u0275cmp=c({type:a,selectors:[["ng-doc-page-layahn39"]],features:[p([{provide:e,useExisting:a},h,s.providers??[]]),d],decls:1,vars:0,template:function(n,f){n&1&&r(0,"ng-doc-page")},dependencies:[t],encapsulation:2,changeDetection:0})}},b=[i(o({},(0,B.isRoute)(s.route)?s.route:{}),{path:"",component:l,title:"WebSockets"})],M=b;export{l as PageComponent,M as default};
