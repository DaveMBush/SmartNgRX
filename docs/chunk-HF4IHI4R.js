import{a as h}from"./chunk-NCOWMHCX.js";import{a as g}from"./chunk-TD4XB5UG.js";import"./chunk-NGTZT3PE.js";import{a as t}from"./chunk-MHNQVTJN.js";import{L as l,Qa as r,Ra as d,Ub as y,ia as o,va as i}from"./chunk-3EY2YW7E.js";import{a as c,b as p,g as k}from"./chunk-JPKLQMV2.js";var u=k(y());var v={title:"Injection Token",mdFile:"./index.md",order:3,category:h},e=v;var m=[];var x={},j=x;var S=`<h1 id="injection-token" class="ngde">Injection Token<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/injection-token#injection-token"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">For each service, you'll need to create an Injection Token.</p><p class="ngde">Continuing with the example of a <code class="ngde">UserEffectsService</code>, we'll create an Injection Token for it.</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-keyword ngde">import</span> { <span class="hljs-title class_ ngde">InjectionToken</span> } <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@angular/core'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> { <span class="hljs-title class_ ngde">UserEffectsService</span> } <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'./department-effects.service'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">const</span> userEffectsServiceToken = <span class="hljs-keyword ngde">new</span> <span class="hljs-title class_ ngde">InjectionToken</span>&#x3C;<span class="hljs-title class_ ngde">UserEffectsService</span>>(<span class="hljs-string ngde">'UserEffectsService'</span>);
</span></code></pre><p class="ngde">Which we can use to register the service in our module:</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-meta ngde">@NgModule</span>({
</span><span class="line ngde">  <span class="hljs-attr ngde">imports</span>: [
</span><span class="line ngde">    <span class="hljs-comment ngde">// ...</span>
</span><span class="line ngde">  ],
</span><span class="line ngde">  <span class="hljs-attr ngde">providers</span>: [
</span><span class="line ngde">    <span class="hljs-comment ngde">// ...</span>
</span><span class="line ngde">    {
</span><span class="line ngde">      <span class="hljs-attr ngde">provide</span>: userEffectsServiceToken,
</span><span class="line ngde">      <span class="hljs-attr ngde">useClass</span>: <span class="hljs-title class_ ngde">UserEffectsService</span>,
</span><span class="line ngde">    },
</span><span class="line ngde">    <span class="hljs-comment ngde">// ...</span>
</span><span class="line ngde">  ],
</span><span class="line ngde">  <span class="hljs-comment ngde">// ...</span>
</span><span class="line ngde">})
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">class</span> <span class="hljs-title class_ ngde">SharedModule</span> {}
</span></code></pre>`,w=(()=>{let s=class s extends t{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent=S,this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/injection-token/index.md?message=docs(injection-token): describe your changes here...",this.page=e,this.demoAssets=j}};s.\u0275fac=function(a){return new(a||s)},s.\u0275cmp=l({type:s,selectors:[["ng-doc-page-using-smart-ng-rx-injection-token"]],standalone:!0,features:[r([{provide:t,useExisting:s},m,e.providers??[]]),o,d],decls:1,vars:0,template:function(a,T){a&1&&i(0,"ng-doc-page")},dependencies:[g],encapsulation:2,changeDetection:0});let n=s;return n})(),D=[p(c({},(0,u.isRoute)(e.route)?e.route:{}),{path:"",component:w,title:"Injection Token"})],M=D;export{w as DynamicComponent,M as default};
