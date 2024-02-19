import{a as d}from"./chunk-JPQZCOTC.js";import"./chunk-RWEY7HJP.js";import{a as s}from"./chunk-JSKR5BFP.js";import{G as t,Ta as l,Ua as c,la as o,ya as i}from"./chunk-WRNO36ZM.js";import"./chunk-P2VZOJAX.js";var g=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Variable">Variable</span></div><h1 id="globalstore" class="ngde">globalStore<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/variables/globalStore#globalstore"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">This code allows us to make the store globally available without using dependency injection.</p><p class="ngde">This is set by the StoreEffects code where DI puts it in the constructor which then calls this function.</p></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/variables/globalStore#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">let</span> <span class="hljs-attr ngde"><a href="/api/smart-ngrx/variables/globalStore" class="ng-doc-code-anchor ngde" data-link-type="Variable" class="ngde">globalStore</a></span>: <span class="hljs-title class_ ngde">Store</span>&#x3C;<span class="hljs-built_in ngde">object</span>> | <span class="hljs-literal ngde">undefined</span>;
</span></code></pre></section>`,p=(()=>{let e=class e extends s{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-api-smart-ngrx-variables-global-store"]],standalone:!0,features:[l([{provide:s,useExisting:e}]),o,c],decls:1,vars:0,template:function(a,u){a&1&&i(0,"ng-doc-page")},dependencies:[d],encapsulation:2,changeDetection:0});let n=e;return n})(),h=[{path:"",component:p,title:"globalStore"}],m=h;export{p as DynamicComponent,m as default};
