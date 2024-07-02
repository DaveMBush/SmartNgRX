import{a as c}from"./chunk-YWRD4FHU.js";import"./chunk-WDR7ZGDV.js";import{a as t}from"./chunk-RVP6FOET.js";import{L as s,Qa as l,Ra as o,ia as i,va as d}from"./chunk-ECT43PI4.js";import"./chunk-JPKLQMV2.js";var r=`<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="TypeAlias">TypeAlias</span></div><h1 id="smartvalidatedentitydefinition" class="ngde">SmartValidatedEntityDefinition<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/type-aliases/SmartValidatedEntityDefinition#smartvalidatedentitydefinition"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">We need a type that makes the entityAdapter field in SmartEntityDefinition not optional once it has been provided by the code. This is that type.</p></section><section class="ngde"><h2 id="presentation" class="ngde">Presentation<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/type-aliases/SmartValidatedEntityDefinition#presentation"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><pre class="ngde hljs"><code lang="typescript" class="hljs language-typescript code-lines ngde"><span class="line ngde"><span class="hljs-keyword ngde">type</span> <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/type-aliases/SmartValidatedEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="TypeAlias" class="ngde">SmartValidatedEntityDefinition</a></span> = <span class="hljs-title class_ ngde">Omit</span>&#x3C;
</span><span class="line ngde">  <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/interfaces/SmartEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartEntityDefinition</a></span>&#x3C;<span class="hljs-title class_ ngde">Row</span>>,
</span><span class="line ngde">  <span class="hljs-string ngde">'entityAdapter'</span>
</span><span class="line ngde">> &#x26;
</span><span class="line ngde">  <span class="hljs-title class_ ngde">ValidOptionalEntityDefinition</span>&#x3C;<span class="hljs-title class_ ngde">Row</span>>;
</span></code></pre></section>`,g=(()=>{let e=class e extends t{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=r,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=s({type:e,selectors:[["ng-doc-page-api-smart-ngrx-type-aliases-smart-validated-entity-definition"]],standalone:!0,features:[l([{provide:t,useExisting:e}]),i,o],decls:1,vars:0,template:function(a,f){a&1&&d(0,"ng-doc-page")},dependencies:[c],encapsulation:2,changeDetection:0});let n=e;return n})(),h=[{path:"",component:g,title:"SmartValidatedEntityDefinition"}],u=h;export{g as DynamicComponent,u as default};
