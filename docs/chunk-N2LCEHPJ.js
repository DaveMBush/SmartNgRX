import{a as et}from"./chunk-QCRGZPLW.js";import{a as w,b as z,c as gt}from"./chunk-OI3PHM5G.js";import{F as nt,G as ot,H as it,I as rt,a as $,b as V,c as q,e as W,g as K,h as U,i as J,j as Q,k as X,pa as at,qa as pt,ta as st,ua as lt}from"./chunk-QXTZ4AYG.js";import{Ba as u,Da as I,Eb as v,Fa as f,H as L,Ha as m,Ma as p,Mb as R,Nb as j,Qa as P,Ra as x,S as d,Sa as y,Ta as D,Ua as i,Ub as H,Va as r,Wa as C,bb as T,ca as O,cb as _,db as A,eb as E,ec as Ct,ga as F,ic as Y,kc as Z,lc as tt,mb as s,nb as b,ob as h,ra as n,sb as G,ub as B,vc as ct}from"./chunk-O44Q3Q27.js";import{a as N,b as S,h as ft}from"./chunk-TWZW5B45.js";var M=ft(Ct(),1);var _t=["ng-doc-button-toggle",""],ht=["*"],mt=(()=>{class e extends ot{constructor(){super({host:rt()})}clickEvent(){this.updateModel(this.checked()?null:this.value)}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["","ng-doc-button-toggle",""]],hostBindings:function(o,c){o&1&&T("click",function(){return c.clickEvent()})},features:[f],attrs:_t,ngContentSelectors:ht,decls:1,vars:0,template:function(o,c){o&1&&(A(),E(0))},styles:["[_nghost-%COMP%]{font-family:var(--ng-doc-font-family);font-variant:no-contextual;color:var(--ng-doc-text);line-height:var(--ng-doc-line-height);font-size:var(--ng-doc-font-size);font-weight:var(--ng-doc-font-weight);position:relative;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border-radius:calc(var(--ng-doc-base-gutter) / 2);border:1px solid var(--ng-doc-button-border-color, transparent);padding:var(--ng-doc-button-padding, calc(var(--ng-doc-base-gutter) / 2) var(--ng-doc-base-gutter));background:var(--ng-doc-button-background)}[_nghost-%COMP%]:hover{text-decoration:none;border:1px solid var(--ng-doc-button-hover-border-color, var(--ng-doc-base-3))}[aria-checked=true][_nghost-%COMP%]{border:1px solid var(--ng-doc-button-hover-border-color, var(--ng-doc-base-3));background:var(--ng-doc-button-checked-background, var(--ng-doc-base-1));--ng-doc-text: var(--ng-doc-heading-color)}"],changeDetection:0})}}return e})();var ut=(()=>{class e extends nt{constructor(){super()}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275dir=I({type:e,selectors:[["","ngDocRadioGroup",""]],features:[G([it(e)]),f]})}}return e})();var vt=e=>[e];function Mt(e,a){if(e&1&&(i(0,"li")(1,"button",9),C(2,"ng-doc-kind-icon",10),s(3),r()()),e&2){let t=a.$implicit;n(),p("value",t),n(),p("kind",t),n(),h(" ",t," ")}}function Ot(e,a){if(e&1&&(i(0,"h3"),s(1,"Declaration types"),r(),i(2,"ul",8),y(3,Mt,4,3,"li",null,x),r()),e&2){let t=_();n(3),D(t.types())}}function Pt(e,a){if(e&1&&(i(0,"li")(1,"button",9),s(2),r()()),e&2){let t=a.$implicit;n(),p("value",t),n(),h(" ",t," ")}}function xt(e,a){if(e&1&&(i(0,"h3"),s(1,"Scopes"),r(),i(2,"ul",11),y(3,Pt,3,2,"li",null,x),r()),e&2){let t=_();n(3),D(t.scopes())}}function yt(e,a){if(e&1&&(i(0,"li",17)(1,"a",18),C(2,"ng-doc-kind-icon",19),s(3),r()()),e&2){let t=a.$implicit;n(),p("routerLink",B(4,vt,t.route)),n(),p("kind",t.type)("ngDocTooltip",t.type),n(),h(" ",t.name," ")}}function Dt(e,a){if(e&1&&(i(0,"ul",15),m(1,yt,4,6,"li",16),r()),e&2){let t=_().$implicit;n(),p("ngForOf",t.items)}}function bt(e,a){if(e&1&&(i(0,"div",12)(1,"h3",13),s(2),r(),m(3,Dt,2,1,"ul",14),r()),e&2){let t=a.$implicit;n(2),b(t.title),n(),p("ngIf",t.items.length)}}var $t=(()=>{class e{constructor(){this.title=O("API References"),this.segment=O(),this.apiList=F([]),this.formBuilder=d(J),this.route=d(Y),this.router=d(Z),this.httpClient=d(H),this.formGroup=this.formBuilder.group({filter:[""],scope:[""],type:[""]}),this.filter=z(this.formGroup.valueChanges.pipe(L(this.formGroup.value)),{initialValue:this.formGroup.value}),this.scopes=v(()=>(0,M.asArray)(new Set(this.apiList().flatMap(t=>t.title))).sort()),this.types=v(()=>(0,M.asArray)(new Set(this.apiList().flatMap(t=>t.items).flatMap(t=>t.type))).sort()),this.route.queryParamMap.pipe(w()).subscribe(t=>this.formGroup.setValue({filter:t.get("filter")||null,scope:t.get("scope")||null,type:t.get("type")||null})),this.formGroup.valueChanges.pipe(w()).subscribe(t=>this.router.navigate([],{relativeTo:this.route,queryParams:t,queryParamsHandling:"merge"})),this.filteredApiList=v(()=>{let{filter:t,scope:o,type:c}=this.filter();return this.apiList().filter(g=>!o||g.title===o).map(g=>S(N({},g),{items:g.items.filter(l=>l.name.toLowerCase().includes(t?.toLowerCase()??"")&&(!c||l.type===c)).sort((l,k)=>l.type.localeCompare(k.type)||l.name.localeCompare(k.name))})).filter(g=>g.items.length)})}ngOnInit(){this.httpClient.get((0,M.asArray)("assets/ng-doc",this.segment(),"api-list.json").join("/")).subscribe(t=>this.apiList.set(t))}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["ng-doc-api-list"]],inputs:{title:[1,"title"],segment:[1,"segment"]},decls:13,vars:5,consts:[["ng-doc-text",""],[1,"ng-doc-api-list-wrapper"],[3,"formGroup"],[1,"ng-doc-api-list-filter-input"],["icon","search","ngDocInputWrapperLeft",""],["ngDocInputString","","formControlName","filter","placeholder","Declaration name...","ngDocAutofocus",""],[1,"ng-doc-api-list"],["class","ng-doc-api-scope",4,"ngFor","ngForOf"],["ngDocRadioGroup","","formControlName","type",1,"ng-doc-filter-list"],["ng-doc-button-toggle","",1,"ng-doc-filter-button",3,"value"],["size","medium",3,"kind"],["ngDocRadioGroup","","formControlName","scope",1,"ng-doc-filter-list"],[1,"ng-doc-api-scope"],["ng-doc-text","",1,"ng-doc-scope-title"],["class","ng-doc-scope-items",4,"ngIf"],[1,"ng-doc-scope-items"],["class","ng-doc-scope-item",4,"ngFor","ngForOf"],[1,"ng-doc-scope-item"],[1,"ng-doc-scope-item-link",3,"routerLink"],["size","medium",3,"kind","ngDocTooltip"]],template:function(o,c){o&1&&(i(0,"h1",0),s(1),r(),i(2,"div",1)(3,"form",2),m(4,Ot,5,0)(5,xt,5,0),i(6,"h3"),s(7,"Filter"),r(),i(8,"ng-doc-input-wrapper",3),C(9,"ng-doc-icon",4)(10,"input",5),r()(),i(11,"div",6),m(12,bt,4,2,"div",7),r()()),o&2&&(n(),b(c.title()),n(2),p("formGroup",c.formGroup),n(),P(c.types().length?4:-1),n(),P(c.scopes().length?5:-1),n(7),p("ngForOf",c.filteredApiList()))},dependencies:[st,j,Q,W,$,V,q,X,K,U,at,ct,pt,gt,R,et,lt,tt,ut,mt],styles:["[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0}[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,1fr);gap:var(--ng-doc-base-gutter);list-style:none;padding:0}@container api-list-wrapper (max-width: 775px){[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]{grid-template-columns:repeat(4,1fr)}}@container api-list-wrapper (max-width: 600px){[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]{grid-template-columns:repeat(3,1fr)}}@container api-list-wrapper (max-width: 500px){[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}@container api-list-wrapper (max-width: 350px){[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]{grid-template-columns:repeat(1,1fr)}}[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]   .ng-doc-filter-button[_ngcontent-%COMP%]{justify-content:flex-start;text-wrap:nowrap;width:100%}[_nghost-%COMP%]   .ng-doc-filter-list[_ngcontent-%COMP%]   .ng-doc-filter-button[_ngcontent-%COMP%]   ng-doc-kind-icon[_ngcontent-%COMP%]{margin-right:var(--ng-doc-base-gutter)}[_nghost-%COMP%]   .ng-doc-api-list-filter-input[_ngcontent-%COMP%]{max-width:450px}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]{container:api-list-wrapper/inline-size}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-filter[_ngcontent-%COMP%]{display:flex;margin-top:calc(var(--ng-doc-base-gutter) * 3);flex-wrap:wrap;gap:calc(var(--ng-doc-base-gutter) * 2)}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-filter[_ngcontent-%COMP%]   .ng-doc-api-filter-item[_ngcontent-%COMP%]{width:200px}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]{margin-top:calc(var(--ng-doc-base-gutter) * 2)}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]{display:flex;flex-direction:column}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]{margin-top:calc(var(--ng-doc-base-gutter) * 3);list-style:none;padding:0}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]{float:left;width:33%;overflow:hidden;min-width:330px;text-overflow:ellipsis;white-space:nowrap}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]   .ng-doc-scope-item-link[_ngcontent-%COMP%]{display:flex;align-items:center;border-left:1px solid var(--ng-doc-border-color);padding:var(--ng-doc-base-gutter);color:var(--ng-doc-text);background:color-mix(in srgb,var(--ng-doc-scope-item-link-background),transparent 90%);text-decoration:none}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]   .ng-doc-scope-item-link[_ngcontent-%COMP%]:hover{color:var(--ng-doc-heading-color);border-left-color:var(--ng-doc-primary);--ng-doc-scope-item-link-background: var(--ng-doc-primary)}[_nghost-%COMP%]   .ng-doc-api-list-wrapper[_ngcontent-%COMP%]   .ng-doc-api-list[_ngcontent-%COMP%]   .ng-doc-api-scope[_ngcontent-%COMP%]   .ng-doc-scope-items[_ngcontent-%COMP%]   .ng-doc-scope-item[_ngcontent-%COMP%]   .ng-doc-scope-item-link[_ngcontent-%COMP%]   ng-doc-kind-icon[_ngcontent-%COMP%]{margin-right:var(--ng-doc-base-gutter);text-decoration:none!important}[_nghost-%COMP%]   ng-doc-input-wrapper[_ngcontent-%COMP%]   ng-doc-icon[_ngcontent-%COMP%]{--ng-doc-icon-color: var(--ng-doc-text-muted)}"],changeDetection:0})}}return e})();export{$t as a};
