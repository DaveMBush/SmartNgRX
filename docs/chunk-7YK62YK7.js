import{a as p}from"./chunk-7UBZMV52.js";import"./chunk-HBZWFD3Q.js";import{a as c}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as r}from"./chunk-3NJKGVAP.js";import{X as D}from"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as i,Fa as d,Wa as m,sb as g}from"./chunk-O44Q3Q27.js";import{a,b as s,h as y}from"./chunk-TWZW5B45.js";var f=y(D());var w={title:"Introduction",mdFile:"./index.md",order:1,category:p},e=w;var l=[];var N={},u=N;var P=`<h1 id="mark-and-delete" href="using-smart-ng-rx/mark-and-delete/intro" headinglink="true" class="ngde">Mark and Delete<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="mark-and-delete"></ng-doc-heading-anchor></h1><p class="ngde">By default, the Mark and Delete mechanism in SmartNgRX will mark a row as dirty 15 minutes after it has been loaded. If the row is still being used somewhere on the screen, the system will re-request the row from the server. If the row is not being used, 15 minutes later, the row will be removed from the store. Said another way, if a row is loaded and then not used for 30 minutes, it will be removed from the store.</p><p class="ngde">Up until now we haven't even mentioned Mark and Delete because it is the default. If you don't pass any parameters for Mark and Delete, this is what you get "for free".</p><p class="ngde">But, you can customize the Mark and Delete behavior. Maybe you want to mark a row as dirty after 5 minutes instead of 15. Maybe you want rows to be deleted after an hour instead of 30 minutes. Maybe you don't want to re-retrieve rows from the server if they are still being used on the screen. Maybe you want to keep rows around forever.</p><p class="ngde">All this can be configured.</p>`,n=class t extends r{constructor(){super();this.pageType="guide";this.pageContent=P;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/mark-and-delete/intro/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/using-smart-ng-rx/mark-and-delete/intro/index.md";this.page=e;this.demoAssets=u}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=i({type:t,selectors:[["ng-doc-page-jwf5ueyf"]],features:[g([{provide:r,useExisting:t},l,e.providers??[]]),d],decls:1,vars:0,template:function(o,x){o&1&&m(0,"ng-doc-page")},dependencies:[c],encapsulation:2,changeDetection:0})}},b=[s(a({},(0,f.isRoute)(e.route)?e.route:{}),{path:"",component:n,title:"Introduction"})],L=b;export{n as PageComponent,L as default};
