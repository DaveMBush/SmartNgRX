import{a as i}from"./chunk-RUBCGYW7.js";import"./chunk-ZC5ZGUG3.js";import{a as d}from"./chunk-3GD2QQWW.js";import{M as t,Sa as l,Ta as o,ka as n,xa as c}from"./chunk-CQ6NMILN.js";import"./chunk-P2VZOJAX.js";var r='<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Class">Class</span></div><span class="ng-doc-modifier ngde" indexable="false" data-content="abstract">abstract</span><h1 id="effectservice" class="ngde">EffectService<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/EffectService#effectservice"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">This is the abstract class that all services the Effects use must implement.</p></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/classes/EffectService#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="add" data-slugtype="member" id="add" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Abstract" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="abstract">a</span> </span>add<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(row: T) => Observable&#x3C;T[]></code></td><td class="ngde"><p class="ngde">Sends a new row to the server</p></td></tr><tr data-slug="delete" data-slugtype="member" id="delete" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Abstract" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="abstract">a</span> </span>delete<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(id: string) => Observable&#x3C;void></code></td><td class="ngde"><p class="ngde">Deletes the row represented by the id from the server</p></td></tr><tr data-slug="load" data-slugtype="member" id="load" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Abstract" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="abstract">a</span> </span>load<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">() => Observable&#x3C;T[]></code></td><td class="ngde"><p class="ngde">Used to load ALL the rows from the server for the given entity.</p></td></tr><tr data-slug="loadByIds" data-slugtype="member" id="loadByIds" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Abstract" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="abstract">a</span> </span>loadByIds<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(ids: string[]) => Observable&#x3C;T[]></code></td><td class="ngde"><p class="ngde">Loads the rows represented by the array of ids passed in from the server</p></td></tr><tr data-slug="update" data-slugtype="member" id="update" class="ngde"><td indexable="false" class="ngde"><span class="ng-doc-badge-wrapper ngde" ngdoctooltip="Abstract" indexable="false"><span class="ng-doc-badge ngde" indexable="false" data-content="abstract">a</span> </span>update<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">(oldRow: T, newRow: T) => Observable&#x3C;T[]></code></td><td class="ngde"><p class="ngde">Sends the updated row in the store to the server.</p></td></tr></tbody></table></div></section>',p=(()=>{let e=class e extends d{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=r,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-api-smart-ngrx-classes-effect-service"]],standalone:!0,features:[l([{provide:d,useExisting:e}]),n,o],decls:1,vars:0,template:function(s,f){s&1&&c(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0});let a=e;return a})(),b=[{path:"",component:p,title:"EffectService"}],v=b;export{p as DynamicComponent,v as default};
