import{a as Ve,b as Le,c as Ge}from"./chunk-RWEY7HJP.js";import{a as Re,b as je,d as Ye,e as Ze,g as te,i as et,k as j}from"./chunk-JSKR5BFP.js";import{$ as g,A as Ce,Aa as le,Ab as A,B as De,Ba as R,Ca as k,Cb as ke,Cc as He,Ea as f,Fa as p,Fc as Q,G as _,Ga as Te,Gb as B,Ha as Se,Hc as H,I as q,Ia as Ie,Ic as se,J as he,Ja as M,K as N,Ka as T,Kb as X,L as x,La as S,Lb as J,Ma as y,Mb as Y,N as ve,Na as U,Oa as Me,P as ye,Pa as we,Pc as ze,Qc as Ue,Rb as ft,T as be,Ta as w,Tb as Ae,Ua as D,V as m,Va as Fe,Vb as Be,Vc as O,Wa as Oe,Wc as P,Ya as W,Yc as ee,Z as Ne,Za as $,Zb as Qe,Zc as qe,_ as re,ab as h,ad as We,b as ge,bd as $e,cd as Ke,dd as Xe,e as E,ea as xe,ed as Je,f as me,fb as Pe,fd as z,g as ne,gb as F,j as ie,jb as Ee,ka as G,la as C,m as de,ma as u,n as fe,oa as l,rc as b,tc as Z,ub as dt,vc as ce,wa as s,xa as c,xb as K,ya as d,yb as V,z as _e,za as ae}from"./chunk-WRNO36ZM.js";import{a as pe,b as ue,g as L}from"./chunk-P2VZOJAX.js";ne();var oe=(()=>{class e extends b{constructor(){super()}registerControl(){}unregisterControl(){}static \u0275fac=function(n){return new(n||e)};static \u0275dir=q({type:e,selectors:[["","diControlSilencer",""]],standalone:!0,features:[w([Z(e)]),C]})}return e})();ne();var tt=L(Ae(),1);var ot=(()=>{let t=class t{constructor(){this.overlayService=m(Ue)}open(n,o){return this.overlayService.open(n,ue(pe({overlayContainer:ze,positionStrategy:this.overlayService.globalPositionStrategy().centerHorizontally().centerVertically(),scrollStrategy:this.overlayService.scrollStrategy().block()},o),{panelClass:["ng-doc-dialog",...(0,tt.asArray)(o?.panelClass)]}))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=ye({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var _t=["outletContent"];function Ct(e,t){e&1&&Se(0)}var Dt=["*"],nt=(()=>{var t;let e=(t=class{constructor(){this.router=m(Y),this.route=m(X),this.dialogService=m(ot)}ngAfterContentInit(){if(this.routerOutlet){let n=new ge;n.pipe(Ce(o=>o.beforeClose().pipe(De(this.routerOutlet?.deactivateEvents??fe))),se(this)).subscribe(()=>{let o=this.route.pathFromRoot.map(i=>i.snapshot.url).filter(i=>!!i[0]).map(([i])=>i.path).join("/");this.router.navigateByUrl(o)}),de(this.routerOutlet.activateEvents.pipe(ie(()=>!0)),this.routerOutlet.deactivateEvents.pipe(ie(()=>!1))).pipe(_e(this.routerOutlet.isActivated),se(this)).subscribe(o=>{o?(this.dialogRef=this.dialogService.open(this.outletContent,this.config),n.next(this.dialogRef)):this.dialogRef?.close()})}}},t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["ng-doc-dialog-outlet"]],contentQueries:function(o,i,a){if(o&1&&Ie(a,J,5),o&2){let v;T(v=S())&&(i.routerOutlet=v.first)}},viewQuery:function(o,i){if(o&1&&M(_t,7),o&2){let a;T(a=S())&&(i.outletContent=a.first)}},inputs:{config:"config"},standalone:!0,features:[D],ngContentSelectors:Dt,decls:2,vars:0,consts:[["outletContent",""]],template:function(o,i){o&1&&(Te(),u(0,Ct,1,0,"ng-template",null,0,h))},encapsulation:2,changeDetection:0}),t);return e=E([H()],e),e})();ne();var it=L(dt(),1);var rt=(()=>{var t;let e=(t=class extends ce{constructor(){super({onIncomingUpdate:n=>{He(this.elementRef).value=(0,it.isPresent)(n)?String(Number(n)):""}})}blurEvent(){this.touch()}inputEvent(){this.updateModel(Number(this.elementRef.nativeElement.value))}},t.\u0275fac=function(o){return new(o||t)},t.\u0275dir=q({type:t,selectors:[["input","ngDocInputNumber",""]],hostBindings:function(o,i){o&1&&f("blur",function(){return i.blurEvent()})("input",function(){return i.inputEvent()})},standalone:!0,features:[w([{provide:ce,useExisting:be(()=>t)}]),C]}),t);return e=E([H(),me("design:paramtypes",[])],e),e})();var at=L(ft(),1),lt=(()=>{let t=class t{transform(n){return(0,at.extractValue)(n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275pipe=he({name:"ngDocExtractValue",type:t,pure:!0,standalone:!0});let e=t;return e})();function ht(e,t){if(e&1&&(d(0,"div",2),W(1,"ngDocSanitizeHtml")),e&2){let r=p();l("innerHTML",$(1,1,r.description),Ne)}}var ct=(()=>{let t=class t extends b{constructor(){super(),this.name="",this.description=""}get defaultValue(){return Object.prototype.hasOwnProperty.call(this,"default")?this.default:!1}updateModel(n){super.updateModel(n||(this.defaultValue?!1:this.defaultValue))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["ng-doc-boolean-control"]],standalone:!0,features:[w([Z(t)]),C,D],decls:4,vars:3,consts:[[3,"ngDocTooltip","canOpen"],["tooltipTemplate",""],[3,"innerHTML"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-checkbox",0),U(1),u(2,ht,2,3,"ng-template",null,1,h),c()),o&2){let a=y(3);l("ngDocTooltip",a)("canOpen",!!i.description),g(),we(" ",i.name," ")}},dependencies:[je,z,Ze],styles:["[_nghost-%COMP%]{display:inline-flex;width:100%}"],changeDetection:0});let e=t;return e})();function vt(e,t){if(e&1){let r=k();s(0,"button",4),f("click",function(){N(r);let o=p(2),i;return x(o.updateModel((i=o.default)!==null&&i!==void 0?i:null))})("focusout",function(){N(r);let o=p(2);return x(o.touch())}),d(1,"ng-doc-icon",5),c()}if(e&2){let r=p(2);l("ngDocFocusable",!1)("disabled",r.disabled)("rounded",!1)}}function yt(e,t){if(e&1&&u(0,vt,2,3,"button",3),e&2){let r=p();l("ngIf",r.model()&&r.model()!==r.default)}}var pt=(()=>{let t=class t extends b{constructor(){super()}changeModel(n){this.updateModel(n===null&&this.default?this.default:n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["ng-doc-number-control"]],inputs:{default:"default"},standalone:!0,features:[C,D],decls:4,vars:2,consts:[["diControlSilencer","",3,"rightContent"],["ngDocInputNumber","","type","number",3,"ngModel","ngModelChange"],["rightContent",""],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout",4,"ngIf"],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout"],["icon","x"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-input-wrapper",0)(1,"input",1),f("ngModelChange",function(v){return i.changeModel(v)}),c(),u(2,yt,1,1,"ng-template",null,2,h),c()),o&2){let a=y(3);l("rightContent",a),g(),l("ngModel",i.model())}},dependencies:[ee,oe,rt,B,K,ke,V,A,F,P,Q,O],styles:["[_nghost-%COMP%]{display:block;width:100%}"],changeDetection:0});let e=t;return e})();function bt(e,t){if(e&1){let r=k();s(0,"button",4),f("click",function(){N(r);let o=p(2),i;return x(o.updateModel((i=o.default)!==null&&i!==void 0?i:null))})("focusout",function(){N(r);let o=p(2);return x(o.touch())}),d(1,"ng-doc-icon",5),c()}if(e&2){let r=p(2);l("ngDocFocusable",!1)("disabled",r.disabled)("rounded",!1)}}function Nt(e,t){if(e&1&&u(0,bt,2,3,"button",3),e&2){let r=p();l("ngIf",r.model()&&r.model()!==r.default)}}var ut=(()=>{let t=class t extends b{constructor(){super()}changeModel(n){this.updateModel(n===null&&this.default?this.default:n)}writeValue(n){super.writeValue(n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["ng-doc-string-control"]],inputs:{default:"default"},standalone:!0,features:[C,D],decls:4,vars:2,consts:[["diControlSilencer","",3,"rightContent"],["ngDocInputString","",3,"ngModel","ngModelChange"],["rightContent",""],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout",4,"ngIf"],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout"],["icon","x"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-input-wrapper",0)(1,"input",1),f("ngModelChange",function(v){return i.changeModel(v)}),c(),u(2,Nt,1,1,"ng-template",null,2,h),c()),o&2){let a=y(3);l("rightContent",a),g(),l("ngModel",i.model())}},dependencies:[B,K,V,A,ee,qe,F,P,Q,O,oe],styles:["[_nghost-%COMP%]{display:block;width:100%}"],changeDetection:0});let e=t;return e})();function xt(e,t){e&1&&R(0)}var Tt=e=>({$implicit:e});function St(e,t){if(e&1&&(ae(0),s(1,"ng-doc-option",6),u(2,xt,1,0,"ng-container",7),c(),le()),e&2){let r=t.ngIf;p(3);let n=y(3);g(),l("value",r),g(),l("ngTemplateOutlet",n)("ngTemplateOutletContext",Oe(3,Tt,r))}}function It(e,t){if(e&1&&(ae(0),u(1,St,3,5,"ng-container",5),W(2,"ngDocExtractValue"),le()),e&2){let r=t.$implicit;g(),l("ngIf",$(2,1,r))}}function Mt(e,t){if(e&1&&(s(0,"ng-doc-list"),u(1,It,3,3,"ng-container",4),c()),e&2){let r=p();g(),l("ngForOf",r.options)}}function wt(e,t){e&1&&(s(0,"span",11),U(1,"[default]"),c())}function Ft(e,t){if(e&1&&(s(0,"div",8),d(1,"ng-doc-kind-icon",9),s(2,"div"),U(3),c(),u(4,wt,2,0,"span",10),c()),e&2){let r=t.$implicit,n=p();g(),l("kind",n.typeOf(r))("type","type")("ngDocTooltip",n.typeOf(r)),g(2),Me(r),g(),l("ngIf",r===n.default)}}function Ot(e,t){if(e&1){let r=k();s(0,"button",13),f("click",function(){N(r);let o=p(2),i;return x(o.updateModel((i=o.default)!==null&&i!==void 0?i:null))})("focusout",function(){N(r);let o=p(2);return x(o.touch())}),d(1,"ng-doc-icon",14),c()}if(e&2){let r=p(2);l("ngDocFocusable",!1)("disabled",r.disabled)("rounded",!1)}}function Pt(e,t){if(e&1&&u(0,Ot,2,3,"button",12),e&2){let r=p();l("ngIf",r.model()&&r.model()!==r.default)}}var gt=(()=>{let t=class t extends b{constructor(){super()}typeOf(n){return typeof n}changeModel(n){this.updateModel(n===null&&this.default?this.default:n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["ng-doc-type-alias-control"]],inputs:{default:"default"},standalone:!0,features:[C,D],decls:6,vars:5,consts:[[3,"ngModel","readonly","valueContent","clearButton","rightContent","ngModelChange"],[4,"ngDocData"],["valueTemplate",""],["rightContent",""],[4,"ngFor","ngForOf"],[4,"ngIf"],[3,"value"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["ng-doc-text",""],["positions","left-center","ngDocTextLeft","",3,"kind","type","ngDocTooltip"],["ng-doc-text","","color","muted","size","small","ngDocTextRight","",4,"ngIf"],["ng-doc-text","","color","muted","size","small","ngDocTextRight",""],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout",4,"ngIf"],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout"],["icon","x"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-combobox",0),f("ngModelChange",function(v){return i.changeModel(v)}),u(1,Mt,2,1,"ng-doc-list",1)(2,Ft,5,5,"ng-template",null,2,h)(4,Pt,1,1,"ng-template",null,3,h),c()),o&2){let a=y(3),v=y(5);l("ngModel",i.model())("readonly",!0)("valueContent",a)("clearButton",!1)("rightContent",v)}},dependencies:[Ge,B,V,A,Le,We,Pe,F,$e,Ee,Je,Ve,Ke,z,Xe,P,Q,O,lt],styles:["[_nghost-%COMP%]{display:block;width:100%}"],changeDetection:0});let e=t;return e})();var mt=L(Ae(),1);var Et=["pageContainer"],Rt=["pageBreadcrumbs"],kt=["pageNavigation"],Vt=["pageToc"],At=["childOutlet"];function Bt(e,t){if(e&1&&(s(0,"a",9),d(1,"ng-doc-icon",10),c()),e&2){let r=p();l("href",r.rootPage.editSourceFileUrl,re)}}function Qt(e,t){if(e&1&&(s(0,"a",11),d(1,"ng-doc-icon",12),c()),e&2){let r=p();l("href",r.rootPage.viewSourceFileUrl,re)}}var Ht=()=>({width:"100vw",height:"100vh"});function zt(e,t){e&1&&(s(0,"ng-doc-dialog-outlet",13)(1,"div",14),d(2,"router-outlet"),c()()),e&2&&l("config",Fe(1,Ht))}var cn=(()=>{var t;let e=(t=class{constructor(){this.rootPage=m(Re),this.skeleton=m(Qe),this.context=m(Be),this.renderer=m(xe),this.router=m(Y),this.breadcrumbs=m(X).pathFromRoot.filter(n=>!n.snapshot.url.length).map(n=>n.snapshot.title).filter(mt.isPresent)}ngOnInit(){this.rootPage.pageType==="guide"&&(this.skeleton.breadcrumbs&&te(this.pageBreadcrumbs,this.skeleton.breadcrumbs,{breadcrumbs:this.breadcrumbs}),this.skeleton.navigation&&te(this.pageNavigation,this.skeleton.navigation,this.navigationInputs()))}createToc(){this.pageToc&&this.skeleton.toc&&te(this.pageToc,this.skeleton.toc,{tableOfContent:et(this.pageContainer.nativeElement)??[]})}navigationInputs(){let n=i=>i.map(a=>[a.children?.length?n(a.children):a]).flat(2),o=n(this.context.navigation);return{prevPage:o[o.findIndex(i=>this.url===i.route)-1],nextPage:o[o.findIndex(i=>this.url===i.route)+1]}}get url(){let n=this.router.parseUrl(this.router.url);return n.queryParams={},n.fragment=null,n.toString()}},t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=_({type:t,selectors:[["ng-doc-page"]],viewQuery:function(o,i){if(o&1&&(M(Et,7,ve),M(Rt,7,G),M(kt,7,G),M(Vt,7,G),M(At,5)),o&2){let a;T(a=S())&&(i.pageContainer=a.first),T(a=S())&&(i.pageBreadcrumbs=a.first),T(a=S())&&(i.pageNavigation=a.first),T(a=S())&&(i.pageToc=a.first),T(a=S())&&(i.childOutlet=a.first)}},hostAttrs:["ngSkipHydration","true"],standalone:!0,features:[w([j("NgDocTypeAlias",gt,{order:10}),j("string",ut,{order:20}),j("number",pt,{order:30}),j("boolean",ct,{hideLabel:!0,order:40})]),D],decls:13,vars:4,consts:[["pageBreadcrumbs",""],[1,"ng-doc-page-controls"],["ng-doc-button-icon","","target","_blank","ngDocTooltip","Suggest Edits",3,"href",4,"ngIf"],["ng-doc-button-icon","","target","_blank","ngDocTooltip","View Source",3,"href",4,"ngIf"],[1,"ng-doc-page-wrapper",3,"ngDocPageProcessor","afterRender"],["pageContainer",""],["pageNavigation",""],[3,"config",4,"ngIf"],["pageToc",""],["ng-doc-button-icon","","target","_blank","ngDocTooltip","Suggest Edits",3,"href"],["icon","edit-2"],["ng-doc-button-icon","","target","_blank","ngDocTooltip","View Source",3,"href"],["icon","code"],[3,"config"],[1,"ng-doc-fullscreen-wrapper"]],template:function(o,i){o&1&&(s(0,"article"),R(1,null,0),s(3,"div",1),u(4,Bt,2,1,"a",2)(5,Qt,2,1,"a",3),c(),s(6,"div",4,5),f("afterRender",function(){return i.createToc()}),c(),R(8,null,6),c(),u(10,zt,3,2,"ng-doc-dialog-outlet",7),R(11,null,8)),o&2&&(g(4),l("ngIf",i.rootPage.editSourceFileUrl),g(),l("ngIf",i.rootPage.viewSourceFileUrl),g(),l("ngDocPageProcessor",i.rootPage.pageContent),g(4),l("ngIf",!(i.rootPage.page!=null&&i.rootPage.page.disableFullscreenRoutes)))},dependencies:[F,P,z,O,Ye,J,nt],styles:["[_nghost-%COMP%]{display:flex;--ng-doc-toc-margin: calc(var(--ng-doc-base-gutter) * 5)}[_nghost-%COMP%]   article[_ngcontent-%COMP%]{position:relative;width:var(--ng-doc-article-width, 100%);margin-left:auto;margin-right:auto;overflow:hidden}[_nghost-%COMP%]   article[_ngcontent-%COMP%]   .ng-doc-page-controls[_ngcontent-%COMP%]{position:absolute;display:flex;grid-gap:var(--ng-doc-base-gutter);top:0;right:0}.ng-doc-fullscreen-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;height:100%}"],changeDetection:0}),t);return e=E([H()],e),e})();export{cn as a};
