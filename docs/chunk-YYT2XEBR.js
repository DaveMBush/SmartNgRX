import{a as p}from"./chunk-CGH4GANM.js";import"./chunk-NCOWMHCX.js";import{a as h}from"./chunk-RUBCGYW7.js";import"./chunk-ZC5ZGUG3.js";import{a as r}from"./chunk-3GD2QQWW.js";import{M as d,Sa as l,Ta as g,Tb as x,ka as c,xa as i}from"./chunk-CQ6NMILN.js";import{a as s,b as n,g as w}from"./chunk-P2VZOJAX.js";var y=w(x());var P={title:"Create (Add) a Row",mdFile:"./index.md",order:3,category:p},t=P;var m=[];var v={},u=v;var A=`<h1 id="create-add-a-row" class="ngde">Create (Add) a Row<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/crud-support/create#create-add-a-row"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">By now, you should be familiar with the structure of SmartNgRX rows. A row can have zero or more children. The children are represented by an <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/classes/ArrayProxy" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">ArrayProxy</a></code> object. To add a child row, you need to first call the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/classes/ArrayProxy" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">ArrayProxy</a></code>'s <code class="ngde">addToStore</code> method, passing it a dummy row you want to add, including a unique ID. This will add the row to the store and the ID to the array.</p><p class="ngde">At this point, the row is in the store and you can edit it like you would edit an already existing row. The only difference is that the row is not yet in the server.</p><p class="ngde">To save the row to the server, you update the row in the same way you would update any other row. The system is smart enough to know that the row is new and will ultimately call the <code class="ngde">add</code> method in the corresponding <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/classes/EffectService" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">EffectService</a></code>.</p><p class="ngde">To remove a row that has not been saved to the server yet, you would call the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/classes/ArrayProxy" class="ng-doc-code-anchor ngde" data-link-type="Class" class="ngde">ArrayProxy</a></code>'s <code class="ngde">removeFromStore</code> method. This will remove the row from the store and the ID from the array.</p>`,C=(()=>{let e=class e extends r{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent=A,this.page=t,this.demoAssets=u}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=d({type:e,selectors:[["ng-doc-page-using-smart-ng-rx-crud-support-create"]],standalone:!0,features:[l([{provide:r,useExisting:e},m,t.providers??[]]),c,g],decls:1,vars:0,template:function(a,R){a&1&&i(0,"ng-doc-page")},dependencies:[h],encapsulation:2,changeDetection:0});let o=e;return o})(),D=[n(s({},(0,y.isRoute)(t.route)?t.route:{}),{path:"",component:C,title:"Create (Add) a Row"})],b=D;export{C as DynamicComponent,b as default};
