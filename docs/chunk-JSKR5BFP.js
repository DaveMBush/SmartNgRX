import{$ as g,E as k,Ea as E,Ec as we,F as W,Fa as me,Fc as Ee,G as f,Ga as R,Ha as D,Hc as Re,I as P,Ic as Te,J as Y,Ja as z,Jb as ye,Ka as L,La as A,Mb as xe,N as u,Na as T,Nb as De,O as J,Pa as I,R as X,Tb as Ue,Ua as v,V as c,Vc as S,Wa as fe,Wb as _e,Wc as Ie,X as ee,Xb as Oe,Y as te,_ as ne,aa as x,db as ue,e as G,ea as C,ed as Se,f as U,fa as oe,fb as ve,g as Qe,ga as re,gb as Ce,ha as ie,ia as ce,j as b,ja as ae,ka as se,l as $,la as le,m as H,ma as M,na as w,o as y,oa as p,p as B,pa as de,pc as ke,sc as Pe,t as Z,ta as ge,tb as be,ua as pe,ub as Ve,uc as Me,va as he,vb as qe,wa as l,wb as Ge,xa as d,ya as h,z as K}from"./chunk-WRNO36ZM.js";import{g as O,i as q}from"./chunk-P2VZOJAX.js";var N=class{};var Ne=(()=>{let e=class e{set ngDocChecked(o){this.updateProperty("checked",o||!1),this.updateProperty("indeterminate",o===null)}constructor(o,n){this.element=o,this.renderer=n,this.ngDocCheckedChange=new k,this.updateProperty("checked",!1)}onChange({checked:o}){this.updateProperty("indeterminate",!1),this.ngDocCheckedChange.emit(o)}updateProperty(o,n){this.renderer.setProperty(this.element.nativeElement,o,n)}};e.\u0275fac=function(n){return new(n||e)(x(u),x(C))},e.\u0275dir=P({type:e,selectors:[["input","ngDocChecked",""],["input","ngDocCheckedChange",""]],hostBindings:function(n,r){n&1&&E("change",function(s){return r.onChange(s.target)})},inputs:{ngDocChecked:"ngDocChecked"},outputs:{ngDocCheckedChange:"ngDocCheckedChange"},standalone:!0});let t=e;return t})();function $e(t,e){t&1&&h(0,"ng-doc-icon",8)}function Ze(t,e){t&1&&h(0,"ng-doc-icon",9)}var Ke=[[["ng-doc-icon"]],"*"],We=["ng-doc-icon","*"],yt=(()=>{let e=class e extends Pe{constructor(){super({host:Me({optional:!0}),compareHost:c(ke,{optional:!0})}),this.color="primary"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f({type:e,selectors:[["ng-doc-checkbox"]],hostVars:1,hostBindings:function(n,r){n&2&&w("data-lu-color",r.color)},inputs:{color:"color"},standalone:!0,features:[le,v],ngContentSelectors:We,decls:10,vars:5,consts:[[1,"ng-doc-checkbox-wrapper"],[1,"ng-doc-checkbox"],["type","checkbox",3,"disabled","ngDocChecked","ngDocFocusable","ngDocCheckedChange","blur"],["icon","minus",4,"ngIf"],["icon","check",4,"ngIf"],[1,"ng-doc-checkbox-content"],[1,"ng-doc-checkbox-icons"],[1,"ng-doc-checkbox-text"],["icon","minus"],["icon","check"]],template:function(n,r){n&1&&(R(Ke),l(0,"label",0)(1,"div",1)(2,"input",2),E("ngDocCheckedChange",function(){return r.toggle(),r.touch()})("blur",function(){return r.touch()}),d(),M(3,$e,1,0,"ng-doc-icon",3)(4,Ze,1,0,"ng-doc-icon",4),d(),l(5,"div",5)(6,"span",6),D(7),d(),l(8,"div",7),D(9,1),d()()()),n&2&&(g(2),p("disabled",r.disabled)("ngDocChecked",r.checked())("ngDocFocusable",!1),g(),p("ngIf",r.isIntermediate),g(),p("ngIf",r.checked()))},dependencies:[Ne,Ee,Ce,S],styles:["[_nghost-%COMP%]{display:inline-flex;align-items:flex-start;flex-direction:column;font-family:var(--ng-doc-font-family);font-variant:no-contextual;color:var(--ng-doc-text);line-height:var(--ng-doc-line-height);font-size:var(--ng-doc-font-size);font-weight:var(--ng-doc-font-weight)}[_nghost-%COMP%]:not(:last-of-type){margin-bottom:var(--ng-doc-list-element-vertical-space);margin-right:var(--ng-doc-list-element-horizontal-space)}[_nghost-%COMP%]:hover:not([data-checked=true])   .ng-doc-checkbox[_ngcontent-%COMP%]{border:var(--ng-doc-checkbox-border-hover)}[_nghost-%COMP%]:not([data-disabled=true])   .ng-doc-checkbox-wrapper[_ngcontent-%COMP%]{cursor:pointer}[data-checked=true][_nghost-%COMP%]   .ng-doc-checkbox[_ngcontent-%COMP%]{background-color:var(--ng-doc-checkbox-color);--ng-doc-checkbox-border: var(--ng-doc-checkbox-color);--ng-doc-checkbox-border-hover: var(--ng-doc-checkbox-color);--ng-doc-icon-color: var(--ng-doc-checkbox-color-text)}input[_ngcontent-%COMP%]{position:absolute;bottom:0;left:50%;border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;width:1px;outline:0}.ng-doc-checkbox-wrapper[_ngcontent-%COMP%]{display:flex}.ng-doc-checkbox[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;width:calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2);height:calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2);border:var(--ng-doc-checkbox-border);flex:0 0 calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2);background-color:var(--ng-doc-base-0);transition:background-color var(--ng-doc-transition);box-sizing:border-box;border-radius:calc(var(--ng-doc-base-gutter) / 2)}.ng-doc-checkbox-content[_ngcontent-%COMP%]{display:flex;align-items:flex-start}.ng-doc-checkbox-icons[_ngcontent-%COMP%]{display:flex;margin-left:var(--ng-doc-base-gutter);margin-top:calc(var(--ng-doc-base-gutter) / 2)}.ng-doc-checkbox-icons[_ngcontent-%COMP%]:empty{display:none}.ng-doc-checkbox-text[_ngcontent-%COMP%]{margin-left:var(--ng-doc-base-gutter);line-height:calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2)}.ng-doc-checkbox-text[_ngcontent-%COMP%]:empty{display:none}"],changeDetection:0});let t=e;return t})();function Ye(t,e){if(t&1&&(l(0,"span",3)(1,"span",4),h(2,"ng-doc-icon",5),T(3),d()()),t&2){let a=e.$implicit;g(3),I(" ",a," ")}}var Je=t=>[t],Rt=(()=>{let e=class e{constructor(){this.breadcrumbs=[],this.home=c(N).routePrefix||"/"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f({type:e,selectors:[["ng-doc-breadcrumb"]],inputs:{breadcrumbs:"breadcrumbs"},standalone:!0,features:[v],decls:3,vars:4,consts:[["ng-doc-button-icon","",1,"ng-doc-breadcrumb",3,"routerLink"],["icon","home"],["class","ng-doc-breadcrumb",4,"ngFor","ngForOf"],[1,"ng-doc-breadcrumb"],["ng-doc-text",""],["icon","chevron-right"]],template:function(n,r){n&1&&(l(0,"a",0),h(1,"ng-doc-icon",1),d(),M(2,Ye,4,1,"span",2)),n&2&&(p("routerLink",fe(2,Je,r.home)),g(2),p("ngForOf",r.breadcrumbs))},dependencies:[Ie,De,S,ve,Se],styles:["[_nghost-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;margin-bottom:calc(var(--ng-doc-base-gutter) * 2);opacity:.9}[_nghost-%COMP%]   .ng-doc-breadcrumb[_ngcontent-%COMP%]:not(:first-child){margin-right:var(--ng-doc-base-gutter)}[_nghost-%COMP%]   .ng-doc-breadcrumb[_ngcontent-%COMP%]:not(:first-child):not(:last-child){opacity:.6}"],changeDetection:0});let t=e;return t})();var F=O(Ue(),1),Ht=(()=>{let e=class e{constructor(){this.html="",this.afterRender=new k,this.processors=c(_e,{optional:!0})??[],this.customProcessors=c(Oe,{optional:!0})??[],this.elementRef=c(u),this.viewContainerRef=c(se),this.injector=c(te),this.renderer=c(C)}ngOnChanges({html:o}){o&&(this.renderer.setProperty(this.elementRef.nativeElement,"innerHTML",this.html),this.afterRender.emit())}ngOnInit(){(0,F.asArray)(this.processors,this.customProcessors).forEach(this.process.bind(this))}process(o){Array.from(this.elementRef.nativeElement.querySelectorAll(o.selector)).forEach(n=>{if(n.parentNode){let r=(o.nodeToReplace&&o.nodeToReplace(n,this.injector))??n,i=o.extractOptions(n,this.elementRef.nativeElement),s=this.viewContainerRef.createComponent(o.component,{projectableNodes:i.content,injector:this.injector});i.inputs&&(0,F.objectKeys)(i.inputs).forEach(m=>i.inputs&&s.setInput(m,i.inputs[m])),r.parentNode?.replaceChild(s.location.nativeElement,r),s.changeDetectorRef.markForCheck()}})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=P({type:e,selectors:[["","ngDocPageProcessor",""]],hostAttrs:["ngSkipHydration","true"],inputs:{html:[W.None,"ngDocPageProcessor","html"]},outputs:{afterRender:"afterRender"},standalone:!0,features:[ee]});let t=e;return t})();Qe();var j=O(Ve(),1);var Xe=["ng-doc-toc-element",""],et=["*"],tt=["selection"];function nt(t,e){if(t&1&&(l(0,"li",5),T(1),d()),t&2){let a=e.$implicit,o=me();p("href",a.path)("level",a.level)("selected",a===o.activeItem()),g(),I(" ",a.title," ")}}var Fe=(()=>{let e=class e{constructor(){this.href="",this.selected=!1,this.level=1,this.elementRef=c(u)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f({type:e,selectors:[["li","ng-doc-toc-element",""]],hostVars:2,hostBindings:function(n,r){n&2&&w("data-ng-doc-selected",r.selected)("data-ng-doc-level",r.level)},inputs:{href:"href",selected:"selected",level:"level"},standalone:!0,features:[v],attrs:Xe,ngContentSelectors:et,decls:2,vars:3,consts:[[3,"href"]],template:function(n,r){n&1&&(R(),l(0,"a",0),D(1),d()),n&2&&(de("padding-left","calc(var(--ng-doc-toc-indent) * "+r.level+")"),p("href",r.href,ne))},styles:['[_nghost-%COMP%]{display:flex;margin:0;color:var(--ng-doc-text)}[data-ng-doc-level="1"][_nghost-%COMP%]   a[_ngcontent-%COMP%]{padding-left:var(--ng-doc-base-gutter)}[data-ng-doc-selected=true][_nghost-%COMP%]{color:var(--ng-doc-primary)}[_nghost-%COMP%]:hover{cursor:pointer;color:var(--ng-doc-primary)}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{font-family:var(--ng-doc-font-family);font-variant:no-contextual;color:var(--ng-doc-text);line-height:var(--ng-doc-line-height);font-size:var(--ng-doc-font-size);font-weight:var(--ng-doc-font-weight);padding:calc(var(--ng-doc-base-gutter) / 2);color:inherit;width:100%;text-decoration:none;word-break:break-word;--ng-doc-font-size: 14px}'],changeDetection:0});let t=e;return t})(),tn=(()=>{var e;let t=(e=class{constructor(){this.tableOfContent=[],this.elements=new J,this.activeItem=oe(void 0),this.document=c(ue),this.ngZone=c(ie),this.changeDetectorRef=c(re),this.renderer=c(C),this.router=c(xe),ae(()=>{let o=$(this.document,"scroll").pipe(y(()=>!!this.tableOfContent.length),b(i=>i.target.scrollingElement),K(this.document.scrollingElement),b(i=>{let s=i.scrollTop*100/(i.scrollHeight-i.offsetHeight),m=i.scrollTop+i.offsetHeight*s/100;return this.tableOfContent.length?this.tableOfContent.reduce((Q,V)=>{let Le=Q.element.getBoundingClientRect().top+i.scrollTop,Ae=V.element.getBoundingClientRect().top+i.scrollTop;return Math.abs(Ae-m)<Math.abs(Le-m)?V:Q}):null}),y(j.isPresent)),n=this.router.events.pipe(b(i=>{if(i instanceof ye){let s=this.tableOfContent.find(m=>m.path.includes(i.routerEvent.url));if(s)return s}return null}),y(j.isPresent),B(20)),r=this.elements.changes.pipe(b(()=>this.activeItem()),y(j.isPresent));H(H(o,n).pipe(Z()),r).pipe(B(0),we(this.ngZone),Te(this)).subscribe(this.select.bind(this))},{phase:ce.Write})}ngOnInit(){this.activeItem.set(this.tableOfContent[0])}select(o){let n=this.tableOfContent.indexOf(o);if(this.selection){let r=this.elements.toArray()[n]?.elementRef.nativeElement;r&&(this.renderer.setStyle(this.selection.nativeElement,"top",`${r.offsetTop}px`),this.renderer.setStyle(this.selection.nativeElement,"height",`${r.offsetHeight}px`),r.scrollIntoView({block:"nearest"}))}this.activeItem.set(o)}},e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f({type:e,selectors:[["ng-doc-toc"]],viewQuery:function(n,r){if(n&1&&(z(tt,5,u),z(Fe,5)),n&2){let i;L(i=A())&&(r.selection=i.first),L(i=A())&&(r.elements=i)}},inputs:{tableOfContent:"tableOfContent"},standalone:!0,features:[v],decls:7,vars:0,consts:[[1,"ng-doc-toc-wrapper"],[1,"ng-doc-toc-container"],[1,"ng-doc-toc-selection"],["selection",""],[1,"ng-doc-toc"],["ng-doc-toc-element","",3,"href","level","selected"]],template:function(n,r){n&1&&(l(0,"div",0)(1,"div",1),h(2,"div",2,3),l(4,"ul",4),pe(5,nt,2,4,"li",5,ge),d()()()),n&2&&(g(5),he(r.tableOfContent))},dependencies:[Fe],styles:["[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]{position:relative;width:var(--ng-doc-toc-width)}[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]   .ng-doc-toc-container[_ngcontent-%COMP%]{position:fixed;overflow-y:auto;height:calc(100% - var(--ng-doc-navbar-height) - var(--ng-doc-base-gutter) * 5);width:var(--ng-doc-toc-width)}[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]   .ng-doc-toc-selection[_ngcontent-%COMP%]{position:absolute;transform:translate(-50%);width:calc(var(--ng-doc-base-gutter) / 2);border-radius:calc(var(--ng-doc-base-gutter) / 2);background-color:var(--ng-doc-primary);left:calc(var(--ng-doc-toc-margin) + 1px);transition:var(--ng-doc-transition)}[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]   .ng-doc-toc[_ngcontent-%COMP%]{list-style:none;margin:0 0 0 var(--ng-doc-toc-margin);border-left:1px solid var(--ng-doc-base-3);padding:0 0 0 var(--ng-doc-base-gutter)}@media (max-width: 1200px){[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]{display:none}}"],changeDetection:0}),e);return t=G([Re(),U("design:paramtypes",[])],t),t})();var He=O(qe(),1),Be=O(Ge(),1);function on(t,e,a){t.clear();let o=t.createComponent(e);a&&Object.entries(a).forEach(([n,r])=>{o.setInput(n,r)})}function rn(t){return q(this,null,function*(){return(yield import("./chunk-PIG2VQS4.js")).default.html(t.trim(),{wrap:50,markup:{forceIndent:!0}})})}function cn(t){let e=["h1","h2","h3","h4","h5","h6"],a=Array.from(t.querySelectorAll(e.join(", "))).filter(n=>n.id),o=(0,He.asArray)(new Set(a.map(je).sort()));return a.reduce((n,r)=>{let i=je(r),s=r.querySelector("a.ng-doc-header-link");return s&&n.push({title:r.textContent?.trim()??"",element:r,path:s.pathname+s.hash,level:o.indexOf(i)+1}),n},[])}function je(t){return Number(t.tagName.toLowerCase().replace(/[a-z]*/g,"")||1)}function an(t){return(0,Be.objectKeys)(t).includes("type")}var ze=new Map;function gn(t,e,a){let o=new X(`NG_DOC_TYPE_CONTROL_${t}`,{providedIn:"root",factory:()=>({control:e,options:a})});return ze.set(t,o),{provide:"nothing",useValue:null}}function pn(t){return ze.get(t)}var fn=(()=>{let e=class e{constructor(o){this.sanitizer=o}transform(o){return this.sanitizer.bypassSecurityTrustHtml(o)}};e.\u0275fac=function(n){return new(n||e)(x(be,16))},e.\u0275pipe=Y({name:"ngDocSanitizeHtml",type:e,pure:!0,standalone:!0});let t=e;return t})();export{N as a,yt as b,Rt as c,Ht as d,fn as e,tn as f,on as g,rn as h,cn as i,an as j,gn as k,pn as l};
