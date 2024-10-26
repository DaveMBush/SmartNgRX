import{a as k}from"./chunk-HBZWFD3Q.js";import{a as g}from"./chunk-ICC3I7U3.js";import"./chunk-3NO74SQX.js";import"./chunk-A7763QJH.js";import{a as n}from"./chunk-JHHDKBNU.js";import{X as D}from"./chunk-4NKWSBMZ.js";import"./chunk-PTJD77X5.js";import{Pa as c,S as r,lb as p,mb as d,za as t}from"./chunk-UDQB7DFD.js";import{a as i,b as l,h as m}from"./chunk-TWZW5B45.js";var y=m(D());var f={title:"Injection Token",mdFile:"./index.md",order:3,category:k},s=f;var B=[];var u={},h=u;var E=`<h1 id="injection-token" href="using-smart-ng-rx/injection-token" headinglink="true" class="ngde">Injection Token<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="injection-token"></ng-doc-heading-anchor></h1><p class="ngde">For each service, you'll need to create an Injection Token.</p><p class="ngde">Continuing with the example of a <code class="ngde">UserEffectsService</code>, we'll create an Injection Token for it.</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">import</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> { InjectionToken } </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">from</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> '@angular/core'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">import</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> { UserEffectsService } </span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">from</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde"> './department-effects.service'</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">export</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> const</span><span style="color:#005CC5;--shiki-dark:#BFBDB6" class="ngde"> userEffectsServiceToken</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> =</span><span style="color:#D73A49;--shiki-dark:#F29668" class="ngde"> new</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde"> InjectionToken</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">&#x3C;</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde">UserEffectsService</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">>(</span><span style="color:#032F62;--shiki-dark:#AAD94C" class="ngde">'UserEffectsService'</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">)</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">;</span></span></code></pre><p class="ngde">Which we can use to register the service in our module:</p><pre class="shiki shiki-themes github-light ayu-dark" style="background-color:#fff;--shiki-dark-bg:#0b0e14;color:#24292e;--shiki-dark:#bfbdb6" tabindex="0"><code class="language-typescript"><span class="line"><span style="color:#24292E;--shiki-dark:#E6B673" class="ngde">@</span><span style="color:#6F42C1;--shiki-dark:#FFB454" class="ngde">NgModule</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">({</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  imports</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">    // ...</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  ]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  providers</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> [</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">    // ...</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">      provide</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#E6B673" class="ngde"> userEffectsServiceToken</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">      useClass</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">:</span><span style="color:#24292E;--shiki-dark:#E6B673" class="ngde"> UserEffectsService</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">    }</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">    // ...</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">  ]</span><span style="color:#24292E;--shiki-dark:#BFBDB6B3" class="ngde">,</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#ACB6BF8C;font-style:inherit;--shiki-dark-font-style:italic" class="ngde">  // ...</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde">})</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde">export</span><span style="color:#D73A49;--shiki-dark:#FF8F40" class="ngde"> class</span><span style="color:#6F42C1;--shiki-dark:#59C2FF" class="ngde"> SharedModule</span><span style="color:#24292E;--shiki-dark:#BFBDB6" class="ngde"> {}</span></span></code></pre>`,o=class e extends n{constructor(){super();this.pageType="guide";this.pageContent=E;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/injection-token/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/using-smart-ng-rx/injection-token/index.md";this.page=s;this.demoAssets=h}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275cmp=r({type:e,selectors:[["ng-doc-page-4aj8yuf1"]],standalone:!0,features:[p([{provide:n,useExisting:e},B,s.providers??[]]),t,d],decls:1,vars:0,template:function(a,N){a&1&&c(0,"ng-doc-page")},dependencies:[g],encapsulation:2,changeDetection:0})}},C=[l(i({},(0,y.isRoute)(s.route)?s.route:{}),{path:"",component:o,title:"Injection Token"})],L=C;export{o as PageComponent,L as default};
