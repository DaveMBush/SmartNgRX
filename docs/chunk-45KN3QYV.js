import{a as p}from"./chunk-HBZWFD3Q.js";import{a as l}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as n}from"./chunk-3NJKGVAP.js";import{X as y}from"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as s,Fa as g,Wa as c,sb as d}from"./chunk-O44Q3Q27.js";import{a as r,b as i,h as D}from"./chunk-TWZW5B45.js";var h=D(y());var N={title:"Global Registration",mdFile:"./index.md",order:5,category:p},e=N;var m=[];var b={},u=b;var R=`<h1 id="global-registration" href="using-smart-ng-rx/global-registration" headinglink="true" class="ngde">Global Registration<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="global-registration"></ng-doc-heading-anchor></h1><p class="ngde">Now that we have all the pieces in place, we can register our definitions with Smart NgRX so that they can be used by the library.</p><p class="ngde">Before we do this, though, we need to register global, top level definitions using <code class="ngde ng-doc-code-with-link"><a href="public-api/functions/public-api/provideSmartNgRX" class="ng-doc-code-anchor ngde">provideSmartNgRX</a></code>.</p><p class="ngde">We recommend adding this to your app.module.ts file directly, or indirectly.</p><p class="ngde">If you are using a stand alone component for your <code class="ngde">app.component.ts</code> file, then you'll want to include this in your <code class="ngde">app.config.ts</code> file that <code class="ngde">main.ts</code> references.</p><p class="ngde">If you've jumped ahead and looked at the definition of <code class="ngde ng-doc-code-with-link"><a href="public-api/functions/public-api/provideSmartNgRX" class="ng-doc-code-anchor ngde">provideSmartNgRX</a></code>, you'll see that it takes an optional <code class="ngde ng-doc-code-with-link"><a href="internal-api/interfaces/internal-api/MarkAndDeleteInit" class="ng-doc-code-anchor ngde">MarkAndDeleteInit</a></code> object as a parameter. This allows us to configure how Mark and Delete works globally. We'll cover this in more detail in the <a href="/using-smart-ng-rx/mark-and-delete" class="ngde">Mark and Delete</a> section.</p>`,a=class o extends n{constructor(){super();this.pageType="guide";this.pageContent=R;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/global-registration/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/using-smart-ng-rx/global-registration/index.md";this.page=e;this.demoAssets=u}static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275cmp=s({type:o,selectors:[["ng-doc-page-ppmq5wfe"]],features:[d([{provide:n,useExisting:o},m,e.providers??[]]),g],decls:1,vars:0,template:function(t,v){t&1&&c(0,"ng-doc-page")},dependencies:[l],encapsulation:2,changeDetection:0})}},P=[i(r({},(0,h.isRoute)(e.route)?e.route:{}),{path:"",component:a,title:"Global Registration"})],B=P;export{a as PageComponent,B as default};
