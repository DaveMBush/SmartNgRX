import{a as l}from"./chunk-K5QFLXY4.js";import"./chunk-4WCN3XK4.js";import{a}from"./chunk-Z7774WOE.js";import{M as n,Sa as o,Ta as r,ja as d,xa as i}from"./chunk-2UQX2IQT.js";import"./chunk-P2VZOJAX.js";var g='<header class="ngde"><div class="ng-doc-page-tags ngde"><span class="ng-doc-tag ngde" indexable="false" data-content="ng-doc-scope">smart-ngrx</span> <span class="ng-doc-inline-delimiter ngde" indexable="false">/</span> <span class="ng-doc-tag ngde" indexable="false" data-content="Interface">Interface</span></div><h1 id="markanddeleteinit" class="ngde">MarkAndDeleteInit<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/interfaces/MarkAndDeleteInit#markanddeleteinit"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1></header><section class="ngde"><p class="ngde">this is the interface used to initialize the mark and delete functionality at the global or feature level</p></section><section class="ngde"><h2 id="properties" class="ngde">Properties<a title="Link to heading" class="ng-doc-header-link ngde" href="/api/smart-ngrx/interfaces/MarkAndDeleteInit#properties"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h2><div class="ng-doc-table-wrapper ngde"><table class="ng-doc-properties-table ngde"><thead class="ngde"><tr indexable="false" class="ngde"><th class="ng-doc-properties-table-name ngde">Name</th><th class="ng-doc-properties-table-type ngde">Type</th><th class="ng-doc-properties-table-description ngde">Description</th></tr></thead><tbody class="ngde"><tr data-slug="markDirtyFetchesNew" data-slugtype="member" id="markDirtyFetchesNew" class="ngde"><td indexable="false" class="ngde">markDirtyFetchesNew<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">boolean</code></td><td class="ngde"><p class="ngde">If this is set to true, than any time a row is marked as dirty the system will retrieve a new value from the server. Otherwise, it will just reset the dirty timeout internally.</p></td></tr><tr data-slug="markDirtyTime" data-slugtype="member" id="markDirtyTime" class="ngde"><td indexable="false" class="ngde">markDirtyTime<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><p class="ngde">The time in milliseconds to wait before marking a row as dirty. When a row is marked as dirty, and it is being used it will re-retrieve the row if <code class="ngde">markDirtyFetchesNew</code> is true. If <code class="ngde">markDirtyFetchesNew</code> is false, it will just reset the isDirty flag in the row. his is how we know the row is still in use, or not.</p><p class="ngde">If <code class="ngde">markDirtyTime</code> is set to -1, then the row will never be marked as dirty, and <code class="ngde">removeTime</code> will be ignored. If you manually mark a row as dirty (coming soon), the system will assume you want to refetch the row from the server, regardless of what you set here. This allows us to use the same mechanism to refresh data for automated refreshes and manual refreshes in response to websocket notification.</p><p class="ngde">If <code class="ngde">markAndDelete</code> is not set, it will default to 15 minutes.</p></td></tr><tr data-slug="removeTime" data-slugtype="member" id="removeTime" class="ngde"><td indexable="false" class="ngde">removeTime<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><p class="ngde">The time in milliseconds to wait before removing a row from the store. <code class="ngde">removeTime</code> must be greater than <code class="ngde">markDirtyTime</code>. If it is not, it will automatically set to twice <code class="ngde">markDirtyTime</code>.</p></td></tr><tr data-slug="runInterval" data-slugtype="member" id="runInterval" class="ngde"><td indexable="false" class="ngde">runInterval<div class="ng-doc-node-details ngde"></div></td><td class="ngde"><code indexable="false" class="ngde">number</code></td><td class="ngde"><p class="ngde">The time in milliseconds that determines how often the system looks at the rows to see if they need to be marked dirty or removed. If this is not set, it will default to one minute.</p><p class="ngde">runInterval is only recognized at the global level. If you want to change it, you must change it at the global level.</p></td></tr></tbody></table></div></section>',m=(()=>{let e=class e extends a{constructor(){super(),this.routePrefix=void 0,this.pageType="api",this.pageContent=g,this.demo=void 0,this.demoAssets=void 0}};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=n({type:e,selectors:[["ng-doc-page-api-smart-ngrx-interfaces-mark-and-delete-init"]],standalone:!0,features:[o([{provide:a,useExisting:e}]),d,r],decls:1,vars:0,template:function(s,p){s&1&&i(0,"ng-doc-page")},dependencies:[l],encapsulation:2,changeDetection:0});let t=e;return t})(),h=[{path:"",component:m,title:"MarkAndDeleteInit"}],y=h;export{m as DynamicComponent,y as default};
