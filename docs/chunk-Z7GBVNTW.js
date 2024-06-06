import{a as i}from"./chunk-3QZ37UL7.js";import"./chunk-PWJYSUCV.js";import{a as s}from"./chunk-6MCERC7U.js";import{Ba as l,Ca as c,K as t,da as n,na as o}from"./chunk-LZX4EJTP.js";import"./chunk-RS6LHQUM.js";var g='<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Interface">Interface</span></div><h1 id="actiongroup" class="ngde">ActionGroup<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/interfaces/ActionGroup#actiongroup"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><!-- This is a hack to make the declaration name available to the search index. --><div style="display: none" class="ngde">%%API_NAME_ANCHOR%%</div></header><section class="ngde"><span class="ng-doc-no-content ngde" indexable="false">No documentation has been provided.</span></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/interfaces/ActionGroup#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="add" data-slugtype="member" id="add" class="ngde"><td indexable="false" class="ngde">add<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Add`, (props: { row: T; options?: Record&#x3C;string, unknown> | undefined; }) => TypedAction&#x3C;`[${any}] Add`> &#x26; { row: T; options?: Record&#x3C;string, unknown> | undefined; }></code></td><td class="ngde"></td></tr><tr data-slug="addToStore" data-slugtype="member" id="addToStore" class="ngde"><td indexable="false" class="ngde">addToStore<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Add To Store`, (props: RowProp&#x3C;T>) => RowProp&#x3C;T> &#x26; TypedAction&#x3C;`[${any}] Add To Store`>></code></td><td class="ngde"></td></tr><tr data-slug="delete" data-slugtype="member" id="delete" class="ngde"><td indexable="false" class="ngde">delete<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Delete`, (props: IdProp) => IdProp &#x26; TypedAction&#x3C;`[${any}] Delete`>></code></td><td class="ngde"></td></tr><tr data-slug="garbageCollect" data-slugtype="member" id="garbageCollect" class="ngde"><td indexable="false" class="ngde">garbageCollect<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Garbage Collect`, (props: IdsProp) => IdsProp &#x26; TypedAction&#x3C;`[${any}] Garbage Collect`>></code></td><td class="ngde"></td></tr><tr data-slug="load" data-slugtype="member" id="load" class="ngde"><td indexable="false" class="ngde">load<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Load`, () => TypedAction&#x3C;`[${any}] Load`>></code></td><td class="ngde"></td></tr><tr data-slug="loadByIds" data-slugtype="member" id="loadByIds" class="ngde"><td indexable="false" class="ngde">loadByIds<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Load By Ids`, (props: IdsProp) => IdsProp &#x26; TypedAction&#x3C;`[${any}] Load By Ids`>></code></td><td class="ngde"></td></tr><tr data-slug="loadByIdsPreload" data-slugtype="member" id="loadByIdsPreload" class="ngde"><td indexable="false" class="ngde">loadByIdsPreload<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Load By Ids Preload`, (props: IdsProp) => IdsProp &#x26; TypedAction&#x3C;`[${any}] Load By Ids Preload`>></code></td><td class="ngde"></td></tr><tr data-slug="loadByIdsSuccess" data-slugtype="member" id="loadByIdsSuccess" class="ngde"><td indexable="false" class="ngde">loadByIdsSuccess<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Load By Ids Success`, (props: RowsProp&#x3C;T>) => RowsProp&#x3C;T> &#x26; TypedAction&#x3C;`[${any}] Load By Ids Success`>></code></td><td class="ngde"></td></tr><tr data-slug="loadSuccess" data-slugtype="member" id="loadSuccess" class="ngde"><td indexable="false" class="ngde">loadSuccess<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Load Success`, (props: RowsProp&#x3C;T>) => RowsProp&#x3C;T> &#x26; TypedAction&#x3C;`[${any}] Load Success`>></code></td><td class="ngde"></td></tr><tr data-slug="markDirty" data-slugtype="member" id="markDirty" class="ngde"><td indexable="false" class="ngde">markDirty<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Mark Dirty`, (props: IdsProp) => IdsProp &#x26; TypedAction&#x3C;`[${any}] Mark Dirty`>></code></td><td class="ngde"></td></tr><tr data-slug="markNotDirty" data-slugtype="member" id="markNotDirty" class="ngde"><td indexable="false" class="ngde">markNotDirty<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Mark Not Dirty`, (props: IdsProp) => IdsProp &#x26; TypedAction&#x3C;`[${any}] Mark Not Dirty`>></code></td><td class="ngde"></td></tr><tr data-slug="update" data-slugtype="member" id="update" class="ngde"><td indexable="false" class="ngde">update<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">ActionCreator&#x3C;`[${any}] Update`, (props: { old: RowProp&#x3C;T>; new: RowProp&#x3C;T>; }) => TypedAction&#x3C;`[${any}] Update`> &#x26; { old: RowProp&#x3C;T>; new: RowProp&#x3C;T>; }></code></td><td class="ngde"></td></tr></tbody></table></div></section>',p=(()=>{let e=class e extends s{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=t({type:e,selectors:[["ng-doc-page-api-smart-ngrx-interfaces-action-group"]],standalone:!0,features:[l([{provide:s,useExisting:e}]),n,c],decls:1,vars:0,template:function(a,y){a&1&&o(0,"ng-doc-page")},dependencies:[i],encapsulation:2,changeDetection:0});let d=e;return d})(),x=[{path:"",component:p,title:"ActionGroup"}],b=x;export{p as DynamicComponent,b as default};