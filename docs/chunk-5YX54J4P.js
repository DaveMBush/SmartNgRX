import{a as Ve,b as je,c as Ge}from"./chunk-PEMSLVYP.js";import{a as Re,b as Le,d as oe,e as Ye,g as ne,i as Ze,k as q}from"./chunk-RMIGXQ3G.js";import{A as he,Aa as Me,Ab as Z,B as ve,Ba as M,Ca as C,D as ye,Da as we,Dc as ze,Ea as Fe,Ec as Ue,F as be,Fb as dt,Ga as V,Ha as A,Hb as Ae,J as d,Jb as Be,Jc as O,K as f,Kc as P,M as W,Ma as T,Mc as te,N as xe,Na as w,Nb as Qe,Nc as qe,Oa as Oe,P as x,Pa as S,Q as N,Qa as h,Qc as We,Rc as $e,Sc as Ke,Tc as Xe,Uc as Je,V as $,Va as Pe,Vc as L,W as ae,Wa as F,X as Ne,Za as Ee,_ as g,b as de,da as _,e as E,ec as b,f as fe,fa as a,g as re,gc as ee,ib as mt,ic as se,j as le,ja as K,ka as u,la as s,lb as X,m as _e,ma as c,mb as B,n as Ce,na as m,oa as ce,ob as Q,pa as pe,pc as He,qa as R,qb as ke,ra as k,sc as z,ta as D,ua as p,ub as H,uc as U,va as Te,vc as ue,wa as Se,xa as y,ya as j,yb as J,z as De,za as Ie,zb as Y}from"./chunk-ARQ5TRRK.js";import{a as ge,b as me,f as G}from"./chunk-RS6LHQUM.js";re();var ie=(()=>{class e extends b{constructor(){super()}registerControl(){}unregisterControl(){}static \u0275fac=function(n){return new(n||e)};static \u0275dir=W({type:e,selectors:[["","diControlSilencer",""]],standalone:!0,features:[M([ee(e)]),_]})}return e})();re();var et=G(Ae(),1);var tt=(()=>{let t=class t{constructor(){this.overlayService=d(Ue)}open(n,o){return this.overlayService.open(n,me(ge({overlayContainer:ze,positionStrategy:this.overlayService.globalPositionStrategy().centerHorizontally().centerVertically(),scrollStrategy:this.overlayService.scrollStrategy().block()},o),{panelClass:["ng-doc-dialog",...(0,et.asArray)(o?.panelClass)]}))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=be({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var ft=["outletContent"];function _t(e,t){e&1&&Se(0)}var Ct=["*"],ot=(()=>{var t;let e=(t=class{constructor(){this.router=d(Z),this.route=d(J),this.dialogService=d(tt)}ngAfterContentInit(){if(this.routerOutlet){let n=new de;n.pipe(he(o=>o.beforeClose().pipe(ve(this.routerOutlet?.deactivateEvents??Ce))),ue(this)).subscribe(()=>{let o=this.route.pathFromRoot.map(i=>i.snapshot.url).filter(i=>!!i[0]).map(([i])=>i.path).join("/");this.router.navigateByUrl(o)}),_e(this.routerOutlet.activateEvents.pipe(le(()=>!0)),this.routerOutlet.deactivateEvents.pipe(le(()=>!1))).pipe(De(this.routerOutlet.isActivated),ue(this)).subscribe(o=>{o?(this.dialogRef=this.dialogService.open(this.outletContent,this.config),n.next(this.dialogRef)):this.dialogRef?.close()})}}},t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["ng-doc-dialog-outlet"]],contentQueries:function(o,i,l){if(o&1&&Oe(l,Y,5),o&2){let v;T(v=S())&&(i.routerOutlet=v.first)}},viewQuery:function(o,i){if(o&1&&w(ft,7),o&2){let l;T(l=S())&&(i.outletContent=l.first)}},inputs:{config:"config"},standalone:!0,features:[C],ngContentSelectors:Ct,decls:2,vars:0,consts:[["outletContent",""]],template:function(o,i){o&1&&(Te(),u(0,_t,1,0,"ng-template",null,0,h))},encapsulation:2,changeDetection:0}),t);return e=E([U()],e),e})();re();var nt=G(mt(),1);var it=(()=>{var t;let e=(t=class extends se{constructor(){super({onIncomingUpdate:n=>{He(this.elementRef).value=(0,nt.isPresent)(n)?String(Number(n)):""}})}blurEvent(){this.touch()}inputEvent(){this.updateModel(Number(this.elementRef.nativeElement.value))}},t.\u0275fac=function(o){return new(o||t)},t.\u0275dir=W({type:t,selectors:[["input","ngDocInputNumber",""]],hostBindings:function(o,i){o&1&&D("blur",function(){return i.blurEvent()})("input",function(){return i.inputEvent()})},standalone:!0,features:[M([{provide:se,useExisting:ye(()=>t)}]),_]}),t);return e=E([U(),fe("design:paramtypes",[])],e),e})();var rt=G(dt(),1),lt=(()=>{let t=class t{transform(n){return(0,rt.extractValue)(n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275pipe=xe({name:"ngDocExtractValue",type:t,pure:!0,standalone:!0});let e=t;return e})();function Dt(e,t){if(e&1&&(m(0,"div",2),V(1,"ngDocSanitizeHtml")),e&2){let r=p();a("innerHTML",A(1,1,r.description),$)}}var at=(()=>{let t=class t extends b{constructor(){super(),this.name="",this.description=""}get defaultValue(){return Object.prototype.hasOwnProperty.call(this,"default")?this.default:!1}updateModel(n){super.updateModel(n||(this.defaultValue?!1:this.defaultValue))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["ng-doc-boolean-control"]],standalone:!0,features:[M([ee(t)]),_,C],decls:4,vars:3,consts:[[3,"ngDocTooltip","canOpen"],["tooltipTemplate",""],[3,"innerHTML"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-checkbox",0),j(1),u(2,Dt,2,3,"ng-template",null,1,h),c()),o&2){let l=y(3);a("ngDocTooltip",l)("canOpen",!!i.description),g(1),Me(" ",i.name," ")}},dependencies:[Le,L,oe],styles:["[_nghost-%COMP%]{display:inline-flex;width:100%}"],changeDetection:0});let e=t;return e})();function ht(e,t){if(e&1){let r=k();s(0,"button",4),D("click",function(){x(r);let o=p(2),i;return N(o.updateModel((i=o.default)!==null&&i!==void 0?i:null))})("focusout",function(){x(r);let o=p(2);return N(o.touch())}),m(1,"ng-doc-icon",5),c()}if(e&2){let r=p(2);a("ngDocFocusable",!1)("disabled",r.disabled)("rounded",!1)}}function vt(e,t){if(e&1&&u(0,ht,2,3,"button",3),e&2){let r=p();a("ngIf",r.model()&&r.model()!==r.default)}}var pt=(()=>{let t=class t extends b{constructor(){super()}changeModel(n){this.updateModel(n===null&&this.default?this.default:n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["ng-doc-number-control"]],inputs:{default:"default"},standalone:!0,features:[_,C],decls:4,vars:2,consts:[["diControlSilencer","",3,"rightContent"],["ngDocInputNumber","","type","number",3,"ngModel","ngModelChange"],["rightContent",""],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout",4,"ngIf"],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout"],["icon","x"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-input-wrapper",0)(1,"input",1),D("ngModelChange",function(v){return i.changeModel(v)}),c(),u(2,vt,1,1,"ng-template",null,2,h),c()),o&2){let l=y(3);a("rightContent",l),g(1),a("ngModel",i.model)}},dependencies:[te,ie,it,H,X,ke,B,Q,F,P,z,O],styles:["[_nghost-%COMP%]{display:block;width:100%}"],changeDetection:0});let e=t;return e})();function yt(e,t){if(e&1){let r=k();s(0,"button",4),D("click",function(){x(r);let o=p(2),i;return N(o.updateModel((i=o.default)!==null&&i!==void 0?i:null))})("focusout",function(){x(r);let o=p(2);return N(o.touch())}),m(1,"ng-doc-icon",5),c()}if(e&2){let r=p(2);a("ngDocFocusable",!1)("disabled",r.disabled)("rounded",!1)}}function bt(e,t){if(e&1&&u(0,yt,2,3,"button",3),e&2){let r=p();a("ngIf",r.model()&&r.model()!==r.default)}}var st=(()=>{let t=class t extends b{constructor(){super()}changeModel(n){this.updateModel(n===null&&this.default?this.default:n)}writeValue(n){super.writeValue(n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["ng-doc-string-control"]],inputs:{default:"default"},standalone:!0,features:[_,C],decls:4,vars:2,consts:[["diControlSilencer","",3,"rightContent"],["ngDocInputString","",3,"ngModel","ngModelChange"],["rightContent",""],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout",4,"ngIf"],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout"],["icon","x"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-input-wrapper",0)(1,"input",1),D("ngModelChange",function(v){return i.changeModel(v)}),c(),u(2,bt,1,1,"ng-template",null,2,h),c()),o&2){let l=y(3);a("rightContent",l),g(1),a("ngModel",i.model())}},dependencies:[H,X,B,Q,te,qe,F,P,z,O,ie],styles:["[_nghost-%COMP%]{display:block;width:100%}"],changeDetection:0});let e=t;return e})();function xt(e,t){e&1&&R(0)}var Nt=e=>({$implicit:e});function Tt(e,t){if(e&1&&(ce(0),s(1,"ng-doc-option",6),u(2,xt,1,0,"ng-container",7),c(),pe()),e&2){let r=t.ngIf;p(3);let n=y(3);g(1),a("value",r),g(1),a("ngTemplateOutlet",n)("ngTemplateOutletContext",Fe(3,Nt,r))}}function St(e,t){if(e&1&&(ce(0),u(1,Tt,3,5,"ng-container",5),V(2,"ngDocExtractValue"),pe()),e&2){let r=t.$implicit;g(1),a("ngIf",A(2,1,r))}}function It(e,t){if(e&1&&(s(0,"ng-doc-list"),u(1,St,3,3,"ng-container",4),c()),e&2){let r=p();g(1),a("ngForOf",r.options)}}function Mt(e,t){e&1&&(s(0,"span",11),j(1,"[default]"),c())}function wt(e,t){if(e&1&&(s(0,"div",8),m(1,"ng-doc-kind-icon",9),s(2,"div"),j(3),c(),u(4,Mt,2,0,"span",10),c()),e&2){let r=t.$implicit,n=p();g(1),a("kind",n.typeOf(r))("type","type")("ngDocTooltip",n.typeOf(r)),g(2),Ie(r),g(1),a("ngIf",r===n.default)}}function Ft(e,t){if(e&1){let r=k();s(0,"button",13),D("click",function(){x(r);let o=p(2),i;return N(o.updateModel((i=o.default)!==null&&i!==void 0?i:null))})("focusout",function(){x(r);let o=p(2);return N(o.touch())}),m(1,"ng-doc-icon",14),c()}if(e&2){let r=p(2);a("ngDocFocusable",!1)("disabled",r.disabled)("rounded",!1)}}function Ot(e,t){if(e&1&&u(0,Ft,2,3,"button",12),e&2){let r=p();a("ngIf",r.model()&&r.model()!==r.default)}}var ut=(()=>{let t=class t extends b{constructor(){super()}typeOf(n){return typeof n}changeModel(n){this.updateModel(n===null&&this.default?this.default:n)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["ng-doc-type-alias-control"]],inputs:{default:"default"},standalone:!0,features:[_,C],decls:6,vars:5,consts:[[3,"ngModel","readonly","valueContent","clearButton","rightContent","ngModelChange"],[4,"ngDocData"],["valueTemplate",""],["rightContent",""],[4,"ngFor","ngForOf"],[4,"ngIf"],[3,"value"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["ng-doc-text",""],["positions","left-center","ngDocTextLeft","",3,"kind","type","ngDocTooltip"],["ng-doc-text","","color","muted","size","small","ngDocTextRight","",4,"ngIf"],["ng-doc-text","","color","muted","size","small","ngDocTextRight",""],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout",4,"ngIf"],["ng-doc-button-icon","","size","large",3,"ngDocFocusable","disabled","rounded","click","focusout"],["icon","x"]],template:function(o,i){if(o&1&&(s(0,"ng-doc-combobox",0),D("ngModelChange",function(v){return i.changeModel(v)}),u(1,It,2,1,"ng-doc-list",1)(2,wt,5,5,"ng-template",null,2,h)(4,Ot,1,1,"ng-template",null,3,h),c()),o&2){let l=y(3),v=y(5);a("ngModel",i.model())("readonly",!0)("valueContent",l)("clearButton",!1)("rightContent",v)}},dependencies:[Ge,H,B,Q,je,We,Pe,F,$e,Ee,Je,Ve,Ke,L,Xe,P,z,O,lt],styles:["[_nghost-%COMP%]{display:block;width:100%}"],changeDetection:0});let e=t;return e})();var gt=G(Ae(),1);var Pt=["pageContainer"],Et=["pageBreadcrumbs"],Rt=["pageNavigation"],kt=["pageToc"],Vt=["childOutlet"];function At(e,t){if(e&1&&(s(0,"a",9),m(1,"ng-doc-icon",10),c()),e&2){let r=p();a("href",r.rootPage.editSourceFileUrl,ae)}}function Bt(e,t){if(e&1&&(s(0,"a",11),m(1,"ng-doc-icon",12),c()),e&2){let r=p();a("href",r.rootPage.viewSourceFileUrl,ae)}}var Qt=()=>({width:"100vw",height:"100vh"});function Ht(e,t){e&1&&(s(0,"ng-doc-dialog-outlet",13)(1,"div",14),m(2,"router-outlet"),c()()),e&2&&a("config",we(1,Qt))}var cn=(()=>{var t;let e=(t=class{constructor(){this.rootPage=d(Re),this.skeleton=d(Qe),this.context=d(Be),this.router=d(Z),this.breadcrumbs=d(J).pathFromRoot.filter(n=>!n.snapshot.url.length).map(n=>n.snapshot.title).filter(gt.isPresent)}ngAfterViewInit(){this.rootPage.pageType==="guide"&&(this.skeleton.breadcrumbs&&ne(this.pageBreadcrumbs,this.skeleton.breadcrumbs,{breadcrumbs:this.breadcrumbs}),this.skeleton.navigation&&ne(this.pageNavigation,this.skeleton.navigation,this.navigationInputs())),Promise.resolve().then(()=>{this.pageToc&&this.skeleton.toc&&ne(this.pageToc,this.skeleton.toc,{tableOfContent:Ze(this.pageContainer.nativeElement)??[]})})}navigationInputs(){let n=i=>i.map(l=>[l.children?.length?n(l.children):l]).flat(2),o=n(this.context.navigation);return{prevPage:o[o.findIndex(i=>this.url===i.route)-1],nextPage:o[o.findIndex(i=>this.url===i.route)+1]}}get url(){let n=this.router.parseUrl(this.router.url);return n.queryParams={},n.fragment=null,n.toString()}},t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=f({type:t,selectors:[["ng-doc-page"]],viewQuery:function(o,i){if(o&1&&(w(Pt,7,Ne),w(Et,7,K),w(Rt,7,K),w(kt,5,K),w(Vt,5)),o&2){let l;T(l=S())&&(i.pageContainer=l.first),T(l=S())&&(i.pageBreadcrumbs=l.first),T(l=S())&&(i.pageNavigation=l.first),T(l=S())&&(i.pageToc=l.first),T(l=S())&&(i.childOutlet=l.first)}},standalone:!0,features:[M([q("NgDocTypeAlias",ut,{order:10}),q("string",st,{order:20}),q("number",pt,{order:30}),q("boolean",at,{hideLabel:!0,order:40})]),C],decls:14,vars:6,consts:[["pageBreadcrumbs",""],[1,"ng-doc-page-controls"],["ng-doc-button-icon","","target","_blank","ngDocTooltip","Suggest Edits",3,"href",4,"ngIf"],["ng-doc-button-icon","","target","_blank","ngDocTooltip","View Source",3,"href",4,"ngIf"],["ngDocPageProcessor","",1,"ng-doc-page-wrapper",3,"innerHTML"],["pageContainer",""],["pageNavigation",""],[3,"config",4,"ngIf"],["pageToc",""],["ng-doc-button-icon","","target","_blank","ngDocTooltip","Suggest Edits",3,"href"],["icon","edit-2"],["ng-doc-button-icon","","target","_blank","ngDocTooltip","View Source",3,"href"],["icon","code"],[3,"config"],[1,"ng-doc-fullscreen-wrapper"]],template:function(o,i){o&1&&(s(0,"article"),R(1,null,0),s(3,"div",1),u(4,At,2,1,"a",2)(5,Bt,2,1,"a",3),c(),m(6,"div",4,5),V(8,"ngDocSanitizeHtml"),R(9,null,6),c(),u(11,Ht,3,2,"ng-doc-dialog-outlet",7),R(12,null,8)),o&2&&(g(4),a("ngIf",i.rootPage.editSourceFileUrl),g(1),a("ngIf",i.rootPage.viewSourceFileUrl),g(1),a("innerHTML",A(8,4,i.rootPage.pageContent),$),g(5),a("ngIf",!(i.rootPage.page!=null&&i.rootPage.page.disableFullscreenRoutes)))},dependencies:[F,P,L,O,oe,Ye,Y,ot],styles:["[_nghost-%COMP%]{display:flex;--ng-doc-toc-margin: calc(var(--ng-doc-base-gutter) * 5)}[_nghost-%COMP%]   article[_ngcontent-%COMP%]{position:relative;width:var(--ng-doc-article-width, 100%);margin-left:auto;margin-right:auto;overflow:hidden}[_nghost-%COMP%]   article[_ngcontent-%COMP%]   .ng-doc-page-controls[_ngcontent-%COMP%]{position:absolute;display:flex;grid-gap:var(--ng-doc-base-gutter);top:0;right:0}.ng-doc-fullscreen-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;height:100%}"],changeDetection:0}),t);return e=E([U()],e),e})();export{cn as a};
