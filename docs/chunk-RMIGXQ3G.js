import{$ as d,Aa as N,Ab as Oe,B as re,Bb as Me,Ca as C,Ea as ve,Fa as be,H as ce,Hb as Ke,J as s,Jc as Q,K as v,Ka as Ce,Kb as we,Kc as Ne,La as j,Lb as Pe,M as y,Ma as q,N as ae,Na as G,O as se,Oc as L,Pa as Z,Pc as je,Qa as ye,T as de,Ua as De,Uc as Fe,Va as F,W as le,Wa as xe,X as m,Z as R,_ as h,aa as ge,b as Y,ba as pe,ca as he,cc as Re,da as me,e as w,ea as E,f as J,fa as l,fc as Ee,g as ee,ga as fe,hb as _e,hc as Te,ib as qe,j as _,ja as D,jb as Ge,ka as b,kb as Ze,l as te,la as g,m as U,ma as p,na as f,o as k,p as ne,rc as Ie,sc as Se,t as P,ta as T,ua as $,uc as B,v as oe,va as I,vc as H,wa as O,xa as ue,xb as ke,ya as S,z as ie}from"./chunk-ARQ5TRRK.js";import{f as M,h as X}from"./chunk-RS6LHQUM.js";var z=class{};var Be=(()=>{let e=class e{set ngDocChecked(o){this.updateProperty("checked",o||!1),this.updateProperty("indeterminate",o===null)}constructor(o,n){this.element=o,this.renderer=n,this.ngDocCheckedChange=new pe,this.updateProperty("checked",!1)}onChange({checked:o}){this.updateProperty("indeterminate",!1),this.ngDocCheckedChange.emit(o)}updateProperty(o,n){this.renderer.setProperty(this.element.nativeElement,o,n)}};e.\u0275fac=function(n){return new(n||e)(d(m),d(R))},e.\u0275dir=y({type:e,selectors:[["input","ngDocChecked",""],["input","ngDocCheckedChange",""]],hostBindings:function(n,i){n&1&&T("change",function(a){return i.onChange(a.target)})},inputs:{ngDocChecked:"ngDocChecked"},outputs:{ngDocCheckedChange:"ngDocCheckedChange"},standalone:!0});let t=e;return t})();function We(t,e){t&1&&f(0,"ng-doc-icon",8)}function Xe(t,e){t&1&&f(0,"ng-doc-icon",9)}var Ye=[[["ng-doc-icon"]],"*"],Je=["ng-doc-icon","*"],Ot=(()=>{let e=class e extends Ee{constructor(){super({host:Te({optional:!0}),compareHost:s(Re,{optional:!0})}),this.color="primary"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=v({type:e,selectors:[["ng-doc-checkbox"]],hostVars:1,hostBindings:function(n,i){n&2&&E("data-lu-color",i.color)},inputs:{color:"color"},standalone:!0,features:[me,C],ngContentSelectors:Je,decls:10,vars:5,consts:[[1,"ng-doc-checkbox-wrapper"],[1,"ng-doc-checkbox"],["type","checkbox",3,"disabled","ngDocChecked","ngDocFocusable","ngDocCheckedChange","blur"],["icon","minus",4,"ngIf"],["icon","check",4,"ngIf"],[1,"ng-doc-checkbox-content"],[1,"ng-doc-checkbox-icons"],[1,"ng-doc-checkbox-text"],["icon","minus"],["icon","check"]],template:function(n,i){n&1&&(I(Ye),g(0,"label",0)(1,"div",1)(2,"input",2),T("ngDocCheckedChange",function(){return i.toggle(),i.touch()})("blur",function(){return i.touch()}),p(),b(3,We,1,0,"ng-doc-icon",3)(4,Xe,1,0,"ng-doc-icon",4),p(),g(5,"div",5)(6,"span",6),O(7),p(),g(8,"div",7),O(9,1),p()()()),n&2&&(h(2),l("disabled",i.disabled)("ngDocChecked",i.checked())("ngDocFocusable",!1),h(1),l("ngIf",i.isIntermediate),h(1),l("ngIf",i.checked))},dependencies:[Be,Se,xe,Q],styles:["[_nghost-%COMP%]{display:inline-flex;align-items:flex-start;flex-direction:column;font-family:var(--ng-doc-font-family);font-variant:no-contextual;color:var(--ng-doc-text);line-height:var(--ng-doc-line-height);font-size:var(--ng-doc-font-size);font-weight:var(--ng-doc-font-weight)}[_nghost-%COMP%]:not(:last-of-type){margin-bottom:var(--ng-doc-list-element-vertical-space);margin-right:var(--ng-doc-list-element-horizontal-space)}[_nghost-%COMP%]:hover:not([data-checked=true])   .ng-doc-checkbox[_ngcontent-%COMP%]{border:var(--ng-doc-checkbox-border-hover)}[_nghost-%COMP%]:not([data-disabled=true])   .ng-doc-checkbox-wrapper[_ngcontent-%COMP%]{cursor:pointer}[data-checked=true][_nghost-%COMP%]   .ng-doc-checkbox[_ngcontent-%COMP%]{background-color:var(--ng-doc-checkbox-color);--ng-doc-checkbox-border: var(--ng-doc-checkbox-color);--ng-doc-checkbox-border-hover: var(--ng-doc-checkbox-color);--ng-doc-icon-color: var(--ng-doc-checkbox-color-text)}input[_ngcontent-%COMP%]{position:absolute;bottom:0;left:50%;border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;width:1px;outline:0}.ng-doc-checkbox-wrapper[_ngcontent-%COMP%]{display:flex}.ng-doc-checkbox[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;width:calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2);height:calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2);border:var(--ng-doc-checkbox-border);flex:0 0 calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2);background-color:var(--ng-doc-base-0);transition:background-color var(--ng-doc-transition);box-sizing:border-box;border-radius:calc(var(--ng-doc-base-gutter) / 2)}.ng-doc-checkbox-content[_ngcontent-%COMP%]{display:flex;align-items:flex-start}.ng-doc-checkbox-icons[_ngcontent-%COMP%]{display:flex;margin-left:var(--ng-doc-base-gutter);margin-top:calc(var(--ng-doc-base-gutter) / 2)}.ng-doc-checkbox-icons[_ngcontent-%COMP%]:empty{display:none}.ng-doc-checkbox-text[_ngcontent-%COMP%]{margin-left:var(--ng-doc-base-gutter);line-height:calc(var(--ng-doc-base-gutter) * 2 + var(--ng-doc-base-gutter) / 2)}.ng-doc-checkbox-text[_ngcontent-%COMP%]:empty{display:none}"],changeDetection:0});let t=e;return t})();ee();var He=(()=>{var e;let t=(e=class{constructor(o,n,i){this.templateRef=o,this.viewContainerRef=n,this.breakpointObserver=i,this.match=[],this.breakpoints=je,this.unsubscribe$=new Y}ngOnChanges(){this.unsubscribe$.next(),this.breakpointObserver.observe(this.match).pipe(oe("matches"),P(),re(this.unsubscribe$),H(this)).subscribe(o=>{this.viewRef?.destroy(),this.viewRef=void 0,o&&(this.viewRef=this.viewContainerRef.createEmbeddedView(this.templateRef),this.viewRef.markForCheck())})}},e.\u0275fac=function(n){return new(n||e)(d(j),d(D),d(L))},e.\u0275dir=y({type:e,selectors:[["","ngDocMediaQuery",""]],inputs:{match:["ngDocMediaQuery","match"]},exportAs:["ngDocMediaQuery"],standalone:!0,features:[se]}),e);return t=w([B(),J("design:paramtypes",[j,D,L])],t),t})();function et(t,e){if(t&1&&(g(0,"span",3)(1,"span",4),f(2,"ng-doc-icon",5),S(3),p()()),t&2){let c=e.$implicit;h(3),N(" ",c," ")}}var tt=t=>[t],$t=(()=>{let e=class e{constructor(){this.breadcrumbs=[],this.home=s(z).routePrefix||"/"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=v({type:e,selectors:[["ng-doc-breadcrumb"]],inputs:{breadcrumbs:"breadcrumbs"},standalone:!0,features:[C],decls:3,vars:4,consts:[["ng-doc-button-icon","",1,"ng-doc-breadcrumb",3,"routerLink"],["icon","home"],["class","ng-doc-breadcrumb",4,"ngFor","ngForOf"],[1,"ng-doc-breadcrumb"],["ng-doc-text",""],["icon","chevron-right"]],template:function(n,i){n&1&&(g(0,"a",0),f(1,"ng-doc-icon",1),p(),b(2,et,4,1,"span",2)),n&2&&(l("routerLink",ve(2,tt,i.home)),h(2),l("ngForOf",i.breadcrumbs))},dependencies:[Ne,Me,Q,F,Fe],styles:["[_nghost-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;margin-bottom:calc(var(--ng-doc-base-gutter) * 2);opacity:.9}[_nghost-%COMP%]   .ng-doc-breadcrumb[_ngcontent-%COMP%]:not(:first-child){margin-right:var(--ng-doc-base-gutter)}[_nghost-%COMP%]   .ng-doc-breadcrumb[_ngcontent-%COMP%]:not(:first-child):not(:last-child){opacity:.6}"],changeDetection:0});let t=e;return t})();var Zt=(()=>{let e=class e{constructor(o){this.sanitizer=o}transform(o){return this.sanitizer.bypassSecurityTrustHtml(o)}};e.\u0275fac=function(n){return new(n||e)(d(_e,16))},e.\u0275pipe=ae({name:"ngDocSanitizeHtml",type:e,pure:!0,standalone:!0});let t=e;return t})();var V=M(Ke(),1),Jt=(()=>{let e=class e{constructor(o,n){this.elementRef=o,this.viewContainerRef=n,this.processors=s(we,{optional:!0})??[],this.customProcessors=s(Pe,{optional:!0})??[],this.injector=s(de)}ngOnInit(){(0,V.asArray)(this.processors,this.customProcessors).forEach(this.process.bind(this))}process(o){this.elementRef.nativeElement.querySelectorAll(o.selector).forEach(n=>{if(n.parentNode){let i=(o.nodeToReplace&&o.nodeToReplace(n))??n,r=o.extractOptions(n,this.elementRef.nativeElement),a=this.viewContainerRef.createComponent(o.component,{projectableNodes:r.content,injector:this.injector});r.inputs&&(0,V.objectKeys)(r.inputs).forEach(u=>r.inputs&&a.setInput(u,r.inputs[u])),i.parentNode?.replaceChild(a.location.nativeElement,i),a.changeDetectorRef.markForCheck()}})}};e.\u0275fac=function(n){return new(n||e)(d(m),d(D))},e.\u0275dir=y({type:e,selectors:[["","ngDocPageProcessor",""]],standalone:!0});let t=e;return t})();ee();var A=M(qe(),1);var nt=["ng-doc-toc-element",""],ot=["*"],it=["selection"];function rt(t,e){if(t&1&&(g(0,"li",8),S(1),p()),t&2){let c=e.$implicit,o=$(2);l("href",c.path)("level",c.level)("selected",c===o.activeItem),h(1),N(" ",c.title," ")}}function ct(t,e){if(t&1&&(g(0,"div",2)(1,"div",3),f(2,"div",4,5),g(4,"ul",6),b(5,rt,2,4,"li",7),p()()()),t&2){let c=$();h(5),l("ngForOf",c.tableOfContent)}}var at=(t,e)=>[t,e],Qe=(()=>{let e=class e{constructor(o){this.elementRef=o,this.href="",this.selected=!1,this.level=1}};e.\u0275fac=function(n){return new(n||e)(d(m))},e.\u0275cmp=v({type:e,selectors:[["li","ng-doc-toc-element",""]],hostVars:2,hostBindings:function(n,i){n&2&&E("data-ng-doc-selected",i.selected)("data-ng-doc-level",i.level)},inputs:{href:"href",selected:"selected",level:"level"},standalone:!0,features:[C],attrs:nt,ngContentSelectors:ot,decls:2,vars:3,consts:[[3,"href"]],template:function(n,i){n&1&&(I(),g(0,"a",0),O(1),p()),n&2&&(fe("padding-left","calc(var(--ng-doc-toc-indent) * "+i.level+")"),l("href",i.href,le))},styles:['[_nghost-%COMP%]{display:flex;margin:0;color:var(--ng-doc-text)}[data-ng-doc-level="1"][_nghost-%COMP%]   a[_ngcontent-%COMP%]{padding-left:var(--ng-doc-base-gutter)}[data-ng-doc-selected=true][_nghost-%COMP%]{color:var(--ng-doc-primary)}[_nghost-%COMP%]:hover{cursor:pointer;color:var(--ng-doc-primary)}[_nghost-%COMP%]   a[_ngcontent-%COMP%]{font-family:var(--ng-doc-font-family);font-variant:no-contextual;color:var(--ng-doc-text);line-height:var(--ng-doc-line-height);font-size:var(--ng-doc-font-size);font-weight:var(--ng-doc-font-weight);padding:calc(var(--ng-doc-base-gutter) / 2);color:inherit;width:100%;text-decoration:none;word-break:break-word;--ng-doc-font-size: 14px}'],changeDetection:0});let t=e;return t})(),un=(()=>{var e;let t=(e=class{constructor(){this.tableOfContent=[],this.elements=new Ce,this.document=s(De),this.ngZone=s(he),this.changeDetectorRef=s(ge),this.renderer=s(R),this.router=s(Oe)}ngAfterViewInit(){let o=te(this.document,"scroll").pipe(k(()=>!!this.tableOfContent.length),_(r=>r.target.scrollingElement),ie(this.document.scrollingElement),_(r=>{let a=r.scrollTop*100/(r.scrollHeight-r.offsetHeight),u=r.scrollTop+r.offsetHeight*a/100;return this.tableOfContent.length?this.tableOfContent.reduce((K,W)=>{let Ue=K.element.getBoundingClientRect().top+r.scrollTop,$e=W.element.getBoundingClientRect().top+r.scrollTop;return Math.abs($e-u)<Math.abs(Ue-u)?W:K}):null}),k(A.isPresent)),n=this.router.events.pipe(_(r=>{if(r instanceof ke){let a=this.tableOfContent.find(u=>u.path.includes(r.routerEvent.url));if(a)return a}return null}),k(A.isPresent),ne(20)),i=this.elements.changes.pipe(_(()=>this.activeItem),k(A.isPresent));U(U(o,n).pipe(P()),i).pipe(Ie(this.ngZone),H(this)).subscribe(this.select.bind(this))}select(o){let n=this.tableOfContent.indexOf(o);if(this.selection){let i=this.elements.toArray()[n]?.elementRef.nativeElement;i&&(this.renderer.setStyle(this.selection.nativeElement,"top",`${i.offsetTop}px`),this.renderer.setStyle(this.selection.nativeElement,"height",`${i.offsetHeight}px`),i.scrollIntoView({block:"nearest"}))}this.activeItem=o,this.changeDetectorRef.detectChanges()}},e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=v({type:e,selectors:[["ng-doc-toc"]],viewQuery:function(n,i){if(n&1&&(G(it,5,m),G(Qe,5)),n&2){let r;q(r=Z())&&(i.selection=r.first),q(r=Z())&&(i.elements=r)}},inputs:{tableOfContent:"tableOfContent"},standalone:!0,features:[C],decls:2,vars:4,consts:[[3,"ngDocMediaQuery"],["mediaQuery","ngDocMediaQuery"],[1,"ng-doc-toc-wrapper"],[1,"ng-doc-toc-container"],[1,"ng-doc-toc-selection"],["selection",""],[1,"ng-doc-toc"],["ng-doc-toc-element","",3,"href","level","selected",4,"ngFor","ngForOf"],["ng-doc-toc-element","",3,"href","level","selected"]],template:function(n,i){if(n&1&&b(0,ct,6,1,"ng-template",0,1,ye),n&2){let r=ue(1);l("ngDocMediaQuery",be(1,at,r.breakpoints.Large,r.breakpoints.XLarge))}},dependencies:[F,Qe,He],styles:["[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]{position:relative;width:var(--ng-doc-toc-width)}[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]   .ng-doc-toc-container[_ngcontent-%COMP%]{position:fixed;overflow-y:auto;height:calc(100% - var(--ng-doc-navbar-height) - var(--ng-doc-base-gutter) * 5);width:var(--ng-doc-toc-width)}[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]   .ng-doc-toc-selection[_ngcontent-%COMP%]{position:absolute;transform:translate(-50%);width:calc(var(--ng-doc-base-gutter) / 2);border-radius:calc(var(--ng-doc-base-gutter) / 2);background-color:var(--ng-doc-primary);left:calc(var(--ng-doc-toc-margin) + 1px);transition:var(--ng-doc-transition)}[_nghost-%COMP%]   .ng-doc-toc-wrapper[_ngcontent-%COMP%]   .ng-doc-toc[_ngcontent-%COMP%]{list-style:none;margin:0 0 0 var(--ng-doc-toc-margin);border-left:1px solid var(--ng-doc-base-3);padding:0 0 0 var(--ng-doc-base-gutter)}"],changeDetection:0}),e);return t=w([B()],t),t})();var ze=M(Ge(),1),Ve=M(Ze(),1);function bn(t,e,c){let o=t.createComponent(e);c&&Object.entries(c).forEach(([n,i])=>{o.setInput(n,i)}),o.changeDetectorRef.detectChanges()}function Cn(t){return X(this,null,function*(){return(yield import("./chunk-7UWQMZ5F.js")).default.html(t.trim(),{wrap:50,markup:{forceIndent:!0}})})}function yn(t){let e=["h1","h2","h3","h4","h5","h6"],c=Array.from(t.querySelectorAll(e.join(", "))).filter(n=>n.id),o=(0,ze.asArray)(new Set(c.map(Le).sort()));return c.reduce((n,i)=>{let r=Le(i),a=i.querySelector("a.ng-doc-header-link");return a&&n.push({title:i.textContent?.trim()??"",element:i,path:a.pathname+a.hash,level:o.indexOf(r)+1}),n},[])}function Le(t){return Number(t.tagName.toLowerCase().replace(/[a-z]*/g,"")||1)}function Dn(t){return(0,Ve.objectKeys)(t).includes("type")}var Ae=new Map;function On(t,e,c){let o=new ce(`NG_DOC_TYPE_CONTROL_${t}`,{providedIn:"root",factory:()=>({control:e,options:c})});return Ae.set(t,o),{provide:"nothing",useValue:null}}function Mn(t){return Ae.get(t)}export{z as a,Ot as b,$t as c,Zt as d,Jt as e,un as f,bn as g,Cn as h,yn as i,Dn as j,On as k,Mn as l};
