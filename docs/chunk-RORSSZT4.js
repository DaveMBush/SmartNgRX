import{a as h}from"./chunk-NCOWMHCX.js";import{a as p}from"./chunk-6KUCJPJZ.js";import"./chunk-E7THTKCZ.js";import{a as i}from"./chunk-KWJISZMY.js";import{L as d,Qa as l,Ra as g,Rb as k,ia as r,va as c}from"./chunk-KMVYO2OY.js";import{a,b as o,g as w}from"./chunk-JPKLQMV2.js";var m=w(k());var v={title:"Entity Definitions",mdFile:"./index.md",order:4,category:h},n=v;var f=[];var j={},u=j;var x=`<h1 id="entity-definitions" class="ngde">Entity Definitions<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#entity-definitions"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">As mentioned earlier, most of NgRX is hidden from you by Smart NgRX. The first API that allows us to do this is the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/provideSmartFeatureEntities" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">provideSmartFeatureEntities</a></code> function. This is a functional provider that allows us to register all the entities for a feature.</p><p class="ngde">We've found that the best way to use this provider is to create the entity definitions as objects in a separate file that we import into the location we want to register the entities. Each object would live with the entity code it represents. For example, if we have a <code class="ngde">User</code> entity, we would create a <code class="ngde">users-definition.ts</code> file that would contain the entity definition. We would then import that file into the the module file where our <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/provideSmartFeatureEntities" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">provideSmartFeatureEntities</a></code> function is located so we can register the entity.</p><p class="ngde">Let's take a look at an example. In this example, we'll create a <code class="ngde">users-definition.ts</code> file that contains the entity definition for the <code class="ngde">User</code> entity. We'll then import that file into the <code class="ngde">users.module.ts</code> file so we can register the entity.</p><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde"><span class="hljs-comment ngde">// users-definition.ts</span>
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> { <span class="hljs-title class_ ngde">EntityDefinition</span> } <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'@smart/smart-ngrx/types/entity-definition.interface'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> { <span class="hljs-title class_ ngde">User</span> } <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'./user.interface'</span>;
</span><span class="line ngde"><span class="hljs-keyword ngde">import</span> { userEffectsServiceToken } <span class="hljs-keyword ngde">from</span> <span class="hljs-string ngde">'./user-effects.service-token'</span>;
</span><span class="line ngde">
</span><span class="line ngde"><span class="hljs-keyword ngde">export</span> <span class="hljs-keyword ngde">const</span> <span class="hljs-attr ngde">usersDefinition</span>: <span class="hljs-title class_ ngde"><a href="/api/smart-ngrx/interfaces/SmartEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartEntityDefinition</a></span>&#x3C;<span class="hljs-title class_ ngde">User</span>> = {
</span><span class="line ngde">  <span class="hljs-attr ngde">entityName</span>: <span class="hljs-string ngde">'users'</span>,
</span><span class="line ngde">  <span class="hljs-attr ngde">effectServiceToken</span>: userEffectsServiceToken,
</span><span class="line ngde">  <span class="hljs-attr ngde">defaultRow</span>: <span class="hljs-function ngde">(<span class="hljs-params ngde">id</span>) =></span> ({
</span><span class="line ngde">    id,
</span><span class="line ngde">    <span class="hljs-attr ngde">name</span>: <span class="hljs-string ngde">''</span>,
</span><span class="line ngde">    <span class="hljs-attr ngde">children</span>: [],
</span><span class="line ngde">    <span class="hljs-attr ngde">isDirty</span>: <span class="hljs-literal ngde">false</span>,
</span><span class="line ngde">  }),
</span><span class="line ngde">};
</span></code></pre><p class="ngde">As outlined in the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/interfaces/SmartEntityDefinition" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">SmartEntityDefinition</a></code> interface, we need to provide the following information:</p><h2 id="entityname" class="ngde">entityName<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#entityname"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The field name that you'd usually use in the reducer object you'd use in StoreModule.forFeature(featureName, reducer) OR the name you'd use in provideState(featureName, reducer)</p><p class="ngde">We also use this name along with the feature as the Source field in actions but this should not matter to you because you'll either be using actions we've created or using your own actions for your specific purposes.</p><p class="ngde">If you think of this as the name of the NgRX entity, you'll be fine.</p><h2 id="effectservicetoken" class="ngde">effectServiceToken<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#effectservicetoken"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">The Injection Token for the Effect Service that will be used by the entity. This is the service that the effect will call to perform CRUD operations against the server.</p><h2 id="defaultrow" class="ngde">defaultRow<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#defaultrow"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">A function that returns a default row for the entity. This is used by the reducer to create a new row when the <code class="ngde">addToStore</code> action is dispatched. The function takes an <code class="ngde">id</code> parameter that is the id of the row that is being created. This is useful if you need to create a row that has a reference to the id of the row that is being created.</p><h2 id="optional-fields" class="ngde">Optional Fields<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#optional-fields"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><p class="ngde">You can also provide the following optional fields as your needs dictate:</p><h3 id="entityadapter" class="ngde">entityAdapter<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#entityadapter"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><p class="ngde">This field will let you supply your own EntityAdapter for the entity. This would be useful if your code uses a field other than <code class="ngde">id</code> as the primary key for the entity. Nothing in SmartNgRX makes use of the sortComparer function so you can ignore that.</p><h3 id="markanddelete" class="ngde">markAndDelete<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#markanddelete"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><p class="ngde">This provides configuration information for the mark and delete feature that we will cover later.</p><h3 id="isinitialrow" class="ngde">isInitialRow<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/entity-definitions#isinitialrow"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h3><p class="ngde">Set this field to true if this is a top level row. Top level rows are used as a mechanism to retrieve data from the server without having a parent row, typically used to retrieve the top level of entities your application needs.</p>`,S=(()=>{let e=class e extends i{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent=x,this.page=n,this.demoAssets=u}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["ng-doc-page-using-smart-ng-rx-entity-definitions"]],standalone:!0,features:[l([{provide:i,useExisting:e},f,n.providers??[]]),r,g],decls:1,vars:0,template:function(t,E){t&1&&c(0,"ng-doc-page")},dependencies:[p],encapsulation:2,changeDetection:0});let s=e;return s})(),D=[o(a({},(0,m.isRoute)(n.route)?n.route:{}),{path:"",component:S,title:"Entity Definitions"})],I=D;export{S as DynamicComponent,I as default};
