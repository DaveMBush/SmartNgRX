import{a as ft,b as yt}from"./chunk-4C4RTYJT.js";import{a as it,b as pt,c as lt}from"./chunk-RWEY7HJP.js";import{$ as o,Ba as T,Bb as Y,Db as Z,Eb as tt,Fa as g,Fb as h,G as D,Gb as et,Hb as nt,Hc as rt,Ic as b,Kb as A,Ma as y,Mb as E,Na as _,Nb as ot,Oa as $,Pa as P,Ta as V,Ua as F,Ub as I,Va as j,Vc as at,Wa as M,Xc as N,Ya as q,Yc as ct,Za as K,Zc as st,aa as C,ab as O,ad as mt,bd as gt,cd as ut,e as v,ed as dt,f,fb as U,fd as _t,g as Ft,gb as z,j as S,jb as W,kb as X,ma as p,oa as i,p as G,vb as Mt,wa as c,xa as a,xb as H,ya as u,yb as J,z as B,zb as Q}from"./chunk-WRNO36ZM.js";import{a as w,b as R,g as Pt}from"./chunk-P2VZOJAX.js";Ft();var k=Pt(Mt(),1);function ht(t,e){t&1&&u(0,"ng-doc-icon",15)}function At(t,e){t&1&&T(0)}var xt=t=>({$implicit:t});function Et(t,e){if(t&1&&(c(0,"ng-doc-option",20),p(1,At,1,0,"ng-container",21),a()),t&2){let n=e.$implicit;g(2);let r=y(4);i("value",n),o(),i("ngTemplateOutlet",r)("ngTemplateOutletContext",M(3,xt,n))}}function It(t,e){if(t&1&&(c(0,"ng-doc-list"),p(1,Et,2,5,"ng-doc-option",19),a()),t&2){let n=g(3);o(),i("ngForOf",n.scopes)}}function bt(t,e){if(t&1&&_(0),t&2){let n=e.$implicit;P(" ",n," ")}}function St(t,e){if(t&1&&(c(0,"label",16)(1,"ng-doc-combobox",17),p(2,It,2,1,"ng-doc-list",11)(3,bt,1,1,"ng-template",null,18,O),a()()),t&2){let n=y(4),r=g(2);o(),i("formControl",r.formGroup.controls.scope)("valueContent",n)("readonly",!0)}}function Tt(t,e){t&1&&T(0)}function Nt(t,e){if(t&1&&(c(0,"ng-doc-option",20),p(1,Tt,1,0,"ng-container",21),a()),t&2){let n=e.$implicit;g(2);let r=y(12);i("value",n),o(),i("ngTemplateOutlet",r)("ngTemplateOutletContext",M(3,xt,n))}}function kt(t,e){if(t&1&&(c(0,"ng-doc-list"),p(1,Nt,2,5,"ng-doc-option",19),a()),t&2){let n=g(2);o(),i("ngForOf",n.types)}}var Lt=()=>["left-center","right-center"];function wt(t,e){if(t&1&&(c(0,"div",0),u(1,"ng-doc-kind-icon",22),_(2),a()),t&2){let n=e.$implicit;o(),i("kind",n)("ngDocTooltip",n)("positions",j(4,Lt)),o(),P(" ",n," ")}}var Rt=t=>[t];function Gt(t,e){if(t&1&&(c(0,"li",28)(1,"a",29),u(2,"ng-doc-kind-icon",30),_(3),a()()),t&2){let n=e.$implicit;o(),i("routerLink",M(4,Rt,n.route)),o(),i("kind",n.type)("ngDocTooltip",n.type),o(),P(" ",n.name," ")}}function Bt(t,e){if(t&1&&(c(0,"ul",26),p(1,Gt,4,6,"li",27),a()),t&2){let n=g().$implicit;o(),i("ngForOf",n.items)}}function $t(t,e){if(t&1&&(c(0,"div",23)(1,"h3",24),_(2),a(),p(3,Bt,2,1,"ul",25),a()),t&2){let n=e.$implicit;o(2),$(n.title),o(),i("ngIf",n.items.length)}}function Vt(t,e){if(t&1&&(c(0,"div",2)(1,"form",3)(2,"label",4)(3,"ng-doc-input-wrapper",5),p(4,ht,1,0,"ng-template",null,6,O),u(6,"input",7),a()(),p(7,St,5,3,"label",8),c(8,"label",9)(9,"ng-doc-combobox",10),p(10,kt,2,1,"ng-doc-list",11)(11,wt,3,5,"ng-template",null,12,O),a()()(),c(13,"div",13),p(14,$t,4,2,"div",14),a()()),t&2){let n=e.ngIf,r=y(5),s=y(12),m=g();o(),i("formGroup",m.formGroup),o(2),i("leftContent",r),o(3),i("formControl",m.formGroup.controls.filter),o(),i("ngIf",m.scopes.length),o(2),i("formControl",m.formGroup.controls.type)("valueContent",s)("readonly",!0),o(5),i("ngForOf",n)}}var Ct=(()=>{var e;let t=(e=class{constructor(r,s,m,Dt){this.apiList=r,this.formBuilder=s,this.route=m,this.router=Dt,this.formGroup=this.formBuilder.group({filter:[""],scope:[""],type:[""]}),this.route.queryParamMap.pipe(b(this)).subscribe(l=>this.formGroup.setValue({filter:l.get("filter")||null,scope:l.get("scope")||null,type:l.get("type")||null})),this.formGroup.valueChanges.pipe(b(this)).subscribe(l=>this.router.navigate([],{relativeTo:this.route,queryParams:l,queryParamsHandling:"merge"})),this.api$=this.formGroup.valueChanges.pipe(G(100),B(null),S(()=>this.formGroup.value),S(l=>this.apiList.filter(d=>!l?.scope||d.title===l?.scope).map(d=>R(w({},d),{items:d.items.filter(x=>x.name.toLowerCase().includes(l?.filter?.toLowerCase()??"")&&(!l?.type||x.type===l?.type)).sort((x,L)=>x.type.localeCompare(L.type)||x.name.localeCompare(L.name))})).filter(d=>d.items.length)),b(this))}get scopes(){return(0,k.asArray)(new Set(this.apiList.flatMap(r=>r.title))).sort()}get types(){return(0,k.asArray)(new Set(this.apiList.flatMap(r=>r.items).flatMap(r=>r.type))).sort()}},e.\u0275fac=function(s){return new(s||e)(C(I),C(h),C(A),C(E))},e.\u0275cmp=D({type:e,selectors:[["ng-doc-api-list"]],standalone:!0,features:[F],decls:4,vars:3,consts:[["ng-doc-text",""],["class","ng-doc-api-list-wrapper",4,"ngIf"],[1,"ng-doc-api-list-wrapper"],[1,"ng-doc-api-filter",3,"formGroup"],["ng-doc-label","Filter",1,"ng-doc-api-filter-item"],[3,"leftContent"],["leftContent",""],["ngDocInputString","","placeholder","Type the name","ngDocAutofocus","",3,"formControl"],["class","ng-doc-api-filter-item","ng-doc-label","Scope",4,"ngIf"],["ng-doc-label","Type",1,"ng-doc-api-filter-item"],["placeholder","Choose the entity type",3,"formControl","valueContent","readonly"],[4,"ngDocData"],["comboboxTypeItem",""],[1,"ng-doc-api-list"],["class","ng-doc-api-scope",4,"ngFor","ngForOf"],["icon","search"],["ng-doc-label","Scope",1,"ng-doc-api-filter-item"],["placeholder","Choose the scope",3,"formControl","valueContent","readonly"],["comboboxScopeItem",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["ngDocTextLeft","",3,"kind","ngDocTooltip","positions"],[1,"ng-doc-api-scope"],["ng-doc-text","",1,"ng-doc-scope-title"],["class","ng-doc-scope-items",4,"ngIf"],[1,"ng-doc-scope-items"],["class","ng-doc-scope-item",4,"ngFor","ngForOf"],[1,"ng-doc-scope-item"],[1,"ng-doc-scope-item-link",3,"routerLink"],[3,"kind","ngDocTooltip"]],template:function(s,m){s&1&&(c(0,"h1",0),_(1,"API List"),a(),p(2,Vt,15,8,"div",1),q(3,"async")),s&2&&(o(2),i("ngIf",K(3,1,m.api$)))},dependencies:[dt,z,et,Y,H,J,Q,nt,Z,tt,ft,ct,at,st,yt,lt,pt,mt,U,gt,W,it,ut,_t,ot,X],styles:["[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-filter[_ngcontent-%COMP%]{display:flex;margin-top:calc(var(--ng-doc-base-gutter) * 3);flex-wrap:wrap;grid-gap:calc(var(--ng-doc-base-gutter) * 2);gap:calc(var(--ng-doc-base-gutter) * 2)}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-filter[_ngcontent-%COMP%]   .ng-doc-api-filter-item[_ngcontent-%COMP%]{width:200px}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]{margin-top:calc(var(--ng-doc-base-gutter) * 2)}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]{display:flex;flex-direction:column}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]{margin-top:calc(var(--ng-doc-base-gutter) * 3);list-style:none;padding:0}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]{margin:var(--ng-doc-base-gutter) 0;float:left;width:33%;overflow:hidden;min-width:330px;text-overflow:ellipsis;white-space:nowrap}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]   .ng-doc-scope-item-link[_ngcontent-%COMP%]{display:flex;align-items:center;color:var(--ng-doc-text);text-decoration:none}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]   .ng-doc-scope-item-link[_ngcontent-%COMP%]:hover{text-decoration:underline}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]   .ng-doc-scope-item-link[_ngcontent-%COMP%]   ng-doc-kind-icon[_ngcontent-%COMP%]{margin-right:var(--ng-doc-base-gutter);text-decoration:none!important}[_nghost-%COMP%]   ng-doc-input-wrapper[_ngcontent-%COMP%]   ng-doc-icon[_ngcontent-%COMP%]{--ng-doc-icon-color: var(--ng-doc-text-muted)}"],changeDetection:0}),e);return v([N,f("design:type",Array),f("design:paramtypes",[])],t.prototype,"scopes",null),v([N,f("design:type",Array),f("design:paramtypes",[])],t.prototype,"types",null),t=v([rt(),f("design:paramtypes",[Array,h,A,E])],t),t})();var vt=[{title:"smart-ngrx",items:[{route:"smart-ngrx/functions/assert",type:"Function",name:"assert"},{route:"smart-ngrx/functions/castTo",type:"Function",name:"castTo"},{route:"smart-ngrx/functions/forNext",type:"Function",name:"forNext"},{route:"smart-ngrx/functions/isNullOrUndefined",type:"Function",name:"isNullOrUndefined"},{route:"smart-ngrx/variables/isProxy",type:"Variable",name:"isProxy"},{route:"smart-ngrx/variables/psi",type:"Variable",name:"psi"},{route:"smart-ngrx/functions/zoneless",type:"Function",name:"zoneless"},{route:"smart-ngrx/functions/bufferAction",type:"Function",name:"bufferAction"},{route:"smart-ngrx/classes/EffectService",type:"Class",name:"EffectService"},{route:"smart-ngrx/interfaces/EffectsFactory",type:"Interface",name:"EffectsFactory"},{route:"smart-ngrx/functions/effectsFactory",type:"Function",name:"effectsFactory"},{route:"smart-ngrx/type-aliases/LoadByIdsEffect",type:"TypeAlias",name:"LoadByIdsEffect"},{route:"smart-ngrx/type-aliases/LoadEffect",type:"TypeAlias",name:"LoadEffect"},{route:"smart-ngrx/functions/loadByIdsEffect",type:"Function",name:"loadByIdsEffect"},{route:"smart-ngrx/functions/loadByIdsPreloadEffect",type:"Function",name:"loadByIdsPreloadEffect"},{route:"smart-ngrx/functions/loadEffect",type:"Function",name:"loadEffect"},{route:"smart-ngrx/functions/updateEffect",type:"Function",name:"updateEffect"},{route:"smart-ngrx/functions/manageMaps",type:"Function",name:"manageMaps"},{route:"smart-ngrx/interfaces/ActionGroup",type:"Interface",name:"ActionGroup"},{route:"smart-ngrx/functions/actionFactory",type:"Function",name:"actionFactory"},{route:"smart-ngrx/functions/delayedRegisterEntity",type:"Function",name:"delayedRegisterEntity"},{route:"smart-ngrx/functions/provideSmartFeatureEntities",type:"Function",name:"provideSmartFeatureEntities"},{route:"smart-ngrx/functions/provideSmartNgRX",type:"Function",name:"provideSmartNgRX"},{route:"smart-ngrx/functions/registerEntity",type:"Function",name:"registerEntity"},{route:"smart-ngrx/functions/getEntityRegistry",type:"Function",name:"getEntityRegistry"},{route:"smart-ngrx/functions/unregisterEntity",type:"Function",name:"unregisterEntity"},{route:"smart-ngrx/functions/resolveRemoveTime",type:"Function",name:"resolveRemoveTime"},{route:"smart-ngrx/functions/reducerFactory",type:"Function",name:"reducerFactory"},{route:"smart-ngrx/functions/markAndDeleteEntity",type:"Function",name:"markAndDeleteEntity"},{route:"smart-ngrx/functions/markAndDeleteFeaturesInterval",type:"Function",name:"markAndDeleteFeaturesInterval"},{route:"smart-ngrx/functions/processMarkAndDelete",type:"Function",name:"processMarkAndDelete"},{route:"smart-ngrx/functions/getMarkAndDeleteEntityMap",type:"Function",name:"getMarkAndDeleteEntityMap"},{route:"smart-ngrx/functions/markAndDeleteEntities",type:"Function",name:"markAndDeleteEntities"},{route:"smart-ngrx/functions/registerGlobalMarkAndDeleteInit",type:"Function",name:"registerGlobalMarkAndDeleteInit"},{route:"smart-ngrx/functions/getGlobalMarkAndDeleteInit",type:"Function",name:"getGlobalMarkAndDeleteInit"},{route:"smart-ngrx/variables/markAndDeleteEffect",type:"Variable",name:"markAndDeleteEffect"},{route:"smart-ngrx/functions/registerEntityRows",type:"Function",name:"registerEntityRows"},{route:"smart-ngrx/functions/unregisterEntityRows",type:"Function",name:"unregisterEntityRows"},{route:"smart-ngrx/functions/defaultRows",type:"Function",name:"defaultRows"},{route:"smart-ngrx/functions/rowProxy",type:"Function",name:"rowProxy"},{route:"smart-ngrx/classes/ArrayProxy",type:"Class",name:"ArrayProxy"},{route:"smart-ngrx/functions/createInnerSmartSelector",type:"Function",name:"createInnerSmartSelector"},{route:"smart-ngrx/functions/createSmartSelector",type:"Function",name:"createSmartSelector"},{route:"smart-ngrx/functions/ensureDataLoaded",type:"Function",name:"ensureDataLoaded"},{route:"smart-ngrx/functions/getArrayItem",type:"Function",name:"getArrayItem"},{route:"smart-ngrx/functions/isArrayProxy",type:"Function",name:"isArrayProxy"},{route:"smart-ngrx/type-aliases/ParentSelector",type:"TypeAlias",name:"ParentSelector"},{route:"smart-ngrx/functions/realOrMocked",type:"Function",name:"realOrMocked"},{route:"smart-ngrx/variables/storeEffect",type:"Variable",name:"storeEffect"},{route:"smart-ngrx/functions/store",type:"Function",name:"store"},{route:"smart-ngrx/variables/globalStore",type:"Variable",name:"globalStore"},{route:"smart-ngrx/functions/convertEntityIdToName",type:"Function",name:"convertEntityIdToName"},{route:"smart-ngrx/functions/entityStateFactory",type:"Function",name:"entityStateFactory"},{route:"smart-ngrx/interfaces/Entity",type:"Interface",name:"Entity"},{route:"smart-ngrx/type-aliases/EffectServiceToken",type:"TypeAlias",name:"EffectServiceToken"},{route:"smart-ngrx/interfaces/EntityAttributes",type:"Interface",name:"EntityAttributes"},{route:"smart-ngrx/interfaces/IdProp",type:"Interface",name:"IdProp"},{route:"smart-ngrx/interfaces/IdsProp",type:"Interface",name:"IdsProp"},{route:"smart-ngrx/interfaces/MarkAndDeleteInit",type:"Interface",name:"MarkAndDeleteInit"},{route:"smart-ngrx/type-aliases/MarkAndDeleteSelector",type:"TypeAlias",name:"MarkAndDeleteSelector"},{route:"smart-ngrx/interfaces/MarkAndDelete",type:"Interface",name:"MarkAndDelete"},{route:"smart-ngrx/interfaces/ProxyChild",type:"Interface",name:"ProxyChild"},{route:"smart-ngrx/interfaces/RowProp",type:"Interface",name:"RowProp"},{route:"smart-ngrx/interfaces/RowsProp",type:"Interface",name:"RowsProp"},{route:"smart-ngrx/interfaces/SmartEntityDefinition",type:"Interface",name:"SmartEntityDefinition"}]}];var qt=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=D({type:e,selectors:[["ng-doc-api-list-page-api"]],standalone:!0,features:[V([{provide:I,useValue:vt}]),F],decls:1,vars:0,template:function(s,m){s&1&&u(0,"ng-doc-api-list")},dependencies:[Ct],encapsulation:2,changeDetection:0});let t=e;return t})(),Kt=[{path:"",component:qt},{path:"smart-ngrx",loadChildren:()=>import("./chunk-IV46GTKX.js")}],pe=Kt;export{qt as DynamicComponent,pe as default};
