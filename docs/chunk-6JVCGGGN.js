import{$ as qr,Aa as j,Ca as br,Da as yr,Ea as T,Fa as _r,P as kr,Q as E,R as pr,S,T as dr,U as lr,V as Vr,W as re,X as R,Y as ee,Z as xr,_ as te,aa as hr,ba as oe,ca as fe,da as ae,ea as ne,fa as I,ga as gr,ha as m,ia as ie,ja as w,ka as se,la as fr,na as q,oa as H,pa as ue,qa as z,ra as N,sa as cr,ta as me,ua as C,va as L,wa as pe,xa as Y,ya as de,za as Z}from"./chunk-JLOY7TBK.js";function no(r,e){for(var t=-1,o=r==null?0:r.length;++t<o&&e(r[t],t,r)!==!1;);return r}var Ar=no;function io(r){return w(r)?me(r):br(r)}var h=io;function so(r,e){return r&&N(e,h(e),r)}var le=so;function uo(r,e){return r&&N(e,C(e),r)}var xe=uo;function mo(r,e){for(var t=-1,o=r==null?0:r.length,f=0,a=[];++t<o;){var n=r[t];e(n,t,r)&&(a[f++]=n)}return a}var Or=mo;function po(){return[]}var Er=po;var lo=Object.prototype,xo=lo.propertyIsEnumerable,he=Object.getOwnPropertySymbols,ho=he?function(r){return r==null?[]:(r=Object(r),Or(he(r),function(e){return xo.call(r,e)}))}:Er,$=ho;function go(r,e){return N(r,$(r),e)}var ge=go;function co(r,e){for(var t=-1,o=e.length,f=r.length;++t<o;)r[f+t]=e[t];return r}var J=co;var bo=Object.getOwnPropertySymbols,yo=bo?function(r){for(var e=[];r;)J(e,$(r)),r=ae(r);return e}:Er,Ir=yo;function _o(r,e){return N(r,Ir(r),e)}var ce=_o;function Ao(r,e,t){var o=e(r);return m(r)?o:J(o,t(r))}var Tr=Ao;function Oo(r){return Tr(r,h,$)}var ar=Oo;function Eo(r){return Tr(r,C,Ir)}var be=Eo;var Io=Object.prototype,To=Io.hasOwnProperty;function vo(r){var e=r.length,t=new r.constructor(e);return e&&typeof r[0]=="string"&&To.call(r,"index")&&(t.index=r.index,t.input=r.input),t}var ye=vo;function So(r,e){var t=e?hr(r.buffer):r.buffer;return new r.constructor(t,r.byteOffset,r.byteLength)}var _e=So;var wo=/\w*$/;function Co(r){var e=new r.constructor(r.source,wo.exec(r));return e.lastIndex=r.lastIndex,e}var Ae=Co;var Oe=E?E.prototype:void 0,Ee=Oe?Oe.valueOf:void 0;function Lo(r){return Ee?Object(Ee.call(r)):{}}var Ie=Lo;var Po="[object Boolean]",Mo="[object Date]",Fo="[object Map]",Ro="[object Number]",No="[object RegExp]",Bo="[object Set]",Do="[object String]",Go="[object Symbol]",Uo="[object ArrayBuffer]",Wo="[object DataView]",jo="[object Float32Array]",Ko="[object Float64Array]",qo="[object Int8Array]",Ho="[object Int16Array]",zo="[object Int32Array]",Yo="[object Uint8Array]",Zo="[object Uint8ClampedArray]",$o="[object Uint16Array]",Jo="[object Uint32Array]";function Xo(r,e,t){var o=r.constructor;switch(e){case Uo:return hr(r);case Po:case Mo:return new o(+r);case Wo:return _e(r,t);case jo:case Ko:case qo:case Ho:case zo:case Yo:case Zo:case $o:case Jo:return oe(r,t);case Fo:return new o;case Ro:case Do:return new o(r);case No:return Ae(r);case Bo:return new o;case Go:return Ie(r)}}var Te=Xo;var Qo="[object Map]";function ko(r){return I(r)&&T(r)==Qo}var ve=ko;var Se=H&&H.isMap,Vo=Se?q(Se):ve,we=Vo;var rf="[object Set]";function ef(r){return I(r)&&T(r)==rf}var Ce=ef;var Le=H&&H.isSet,tf=Le?q(Le):Ce,Pe=tf;var of=1,ff=2,af=4,Me="[object Arguments]",nf="[object Array]",sf="[object Boolean]",uf="[object Date]",mf="[object Error]",Fe="[object Function]",pf="[object GeneratorFunction]",df="[object Map]",lf="[object Number]",Re="[object Object]",xf="[object RegExp]",hf="[object Set]",gf="[object String]",cf="[object Symbol]",bf="[object WeakMap]",yf="[object ArrayBuffer]",_f="[object DataView]",Af="[object Float32Array]",Of="[object Float64Array]",Ef="[object Int8Array]",If="[object Int16Array]",Tf="[object Int32Array]",vf="[object Uint8Array]",Sf="[object Uint8ClampedArray]",wf="[object Uint16Array]",Cf="[object Uint32Array]",x={};x[Me]=x[nf]=x[yf]=x[_f]=x[sf]=x[uf]=x[Af]=x[Of]=x[Ef]=x[If]=x[Tf]=x[df]=x[lf]=x[Re]=x[xf]=x[hf]=x[gf]=x[cf]=x[vf]=x[Sf]=x[wf]=x[Cf]=!0;x[mf]=x[Fe]=x[bf]=!1;function vr(r,e,t,o,f,a){var n,i=e&of,s=e&ff,u=e&af;if(t&&(n=f?t(r,o,f,a):t(r)),n!==void 0)return n;if(!S(r))return r;var p=m(r);if(p){if(n=ye(r),!i)return fe(r,n)}else{var d=T(r),l=d==Fe||d==pf;if(fr(r))return te(r,i);if(d==Re||d==Me||l&&!f){if(n=s||l?{}:ne(r),!i)return s?ce(r,xe(n,r)):ge(r,le(n,r))}else{if(!x[d])return f?r:{};n=Te(r,d,i)}}a||(a=new R);var O=a.get(r);if(O)return O;a.set(r,n),Pe(r)?r.forEach(function(g){n.add(vr(g,e,t,g,r,a))}):we(r)&&r.forEach(function(g,b){n.set(b,vr(g,e,t,b,r,a))});var y=u?s?be:ar:s?C:h,_=p?void 0:y(r);return Ar(_||r,function(g,b){_&&(b=g,g=r[b]),z(n,b,vr(g,e,t,b,r,a))}),n}var Sr=vr;var Lf=4;function Pf(r){return Sr(r,Lf)}var Mf=Pf;var Ff="[object Symbol]";function Rf(r){return typeof r=="symbol"||I(r)&&pr(r)==Ff}var A=Rf;function Nf(r,e){for(var t=-1,o=r==null?0:r.length,f=Array(o);++t<o;)f[t]=e(r[t],t,r);return f}var P=Nf;var Bf=1/0,Ne=E?E.prototype:void 0,Be=Ne?Ne.toString:void 0;function De(r){if(typeof r=="string")return r;if(m(r))return P(r,De)+"";if(A(r))return Be?Be.call(r):"";var e=r+"";return e=="0"&&1/r==-Bf?"-0":e}var Ge=De;var Df=/\s/;function Gf(r){for(var e=r.length;e--&&Df.test(r.charAt(e)););return e}var Ue=Gf;var Uf=/^\s+/;function Wf(r){return r&&r.slice(0,Ue(r)+1).replace(Uf,"")}var We=Wf;var je=NaN,jf=/^[-+]0x[0-9a-f]+$/i,Kf=/^0b[01]+$/i,qf=/^0o[0-7]+$/i,Hf=parseInt;function zf(r){if(typeof r=="number")return r;if(A(r))return je;if(S(r)){var e=typeof r.valueOf=="function"?r.valueOf():r;r=S(e)?e+"":e}if(typeof r!="string")return r===0?r:+r;r=We(r);var t=Kf.test(r);return t||qf.test(r)?Hf(r.slice(2),t?2:8):jf.test(r)?je:+r}var Ke=zf;var qe=1/0,Yf=17976931348623157e292;function Zf(r){if(!r)return r===0?r:0;if(r=Ke(r),r===qe||r===-qe){var e=r<0?-1:1;return e*Yf}return r===r?r:0}var X=Zf;function $f(r){var e=X(r),t=e%1;return e===e?t?e-t:e:0}var He=$f;function Jf(){}var ze=Jf;function Xf(r,e,t,o){for(var f=r.length,a=t+(o?1:-1);o?a--:++a<f;)if(e(r[a],a,r))return a;return-1}var wr=Xf;function Qf(r){return r!==r}var Ye=Qf;function kf(r,e,t){for(var o=t-1,f=r.length;++o<f;)if(r[o]===e)return o;return-1}var Ze=kf;function Vf(r,e,t){return e===e?Ze(r,e,t):wr(r,Ye,t)}var $e=Vf;function ra(r,e){var t=r==null?0:r.length;return!!t&&$e(r,e,0)>-1}var Je=ra;var ea=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ta=/^\w*$/;function oa(r,e){if(m(r))return!1;var t=typeof r;return t=="number"||t=="symbol"||t=="boolean"||r==null||A(r)?!0:ta.test(r)||!ea.test(r)||e!=null&&r in Object(e)}var Q=oa;var fa=500;function aa(r){var e=re(r,function(o){return t.size===fa&&t.clear(),o}),t=e.cache;return e}var Xe=aa;var na=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ia=/\\(\\)?/g,sa=Xe(function(r){var e=[];return r.charCodeAt(0)===46&&e.push(""),r.replace(na,function(t,o,f,a){e.push(f?a.replace(ia,"$1"):o||t)}),e}),Qe=sa;function ua(r){return r==null?"":Ge(r)}var Cr=ua;function ma(r,e){return m(r)?r:Q(r,e)?[r]:Qe(Cr(r))}var B=ma;var pa=1/0;function da(r){if(typeof r=="string"||A(r))return r;var e=r+"";return e=="0"&&1/r==-pa?"-0":e}var M=da;function la(r,e){e=B(e,r);for(var t=0,o=e.length;r!=null&&t<o;)r=r[M(e[t++])];return t&&t==o?r:void 0}var D=la;function xa(r,e,t){var o=r==null?void 0:D(r,e);return o===void 0?t:o}var ke=xa;var Ve=E?E.isConcatSpreadable:void 0;function ha(r){return m(r)||gr(r)||!!(Ve&&r&&r[Ve])}var rt=ha;function et(r,e,t,o,f){var a=-1,n=r.length;for(t||(t=rt),f||(f=[]);++a<n;){var i=r[a];e>0&&t(i)?e>1?et(i,e-1,t,o,f):J(f,i):o||(f[f.length]=i)}return f}var k=et;function ga(r){var e=r==null?0:r.length;return e?k(r,1):[]}var Hr=ga;function ca(r){return de(pe(r,void 0,Hr),r+"")}var tt=ca;var ba="\\ud800-\\udfff",ya="\\u0300-\\u036f",_a="\\ufe20-\\ufe2f",Aa="\\u20d0-\\u20ff",Oa=ya+_a+Aa,Ea="\\ufe0e\\ufe0f",Ia="\\u200d",Ta=RegExp("["+Ia+ba+Oa+Ea+"]");function va(r){return Ta.test(r)}var ot=va;function Sa(r,e,t,o){var f=-1,a=r==null?0:r.length;for(o&&a&&(t=r[++f]);++f<a;)t=e(t,r[f],f,r);return t}var ft=Sa;var wa=1,Ca=4;function La(r){return Sr(r,wa|Ca)}var Pa=La;var Ma="__lodash_hash_undefined__";function Fa(r){return this.__data__.set(r,Ma),this}var at=Fa;function Ra(r){return this.__data__.has(r)}var nt=Ra;function Lr(r){var e=-1,t=r==null?0:r.length;for(this.__data__=new Vr;++e<t;)this.add(r[e])}Lr.prototype.add=Lr.prototype.push=at;Lr.prototype.has=nt;var Pr=Lr;function Na(r,e){for(var t=-1,o=r==null?0:r.length;++t<o;)if(e(r[t],t,r))return!0;return!1}var it=Na;function Ba(r,e){return r.has(e)}var Mr=Ba;var Da=1,Ga=2;function Ua(r,e,t,o,f,a){var n=t&Da,i=r.length,s=e.length;if(i!=s&&!(n&&s>i))return!1;var u=a.get(r),p=a.get(e);if(u&&p)return u==e&&p==r;var d=-1,l=!0,O=t&Ga?new Pr:void 0;for(a.set(r,e),a.set(e,r);++d<i;){var y=r[d],_=e[d];if(o)var g=n?o(_,y,d,e,r,a):o(y,_,d,r,e,a);if(g!==void 0){if(g)continue;l=!1;break}if(O){if(!it(e,function(b,W){if(!Mr(O,W)&&(y===b||f(y,b,t,o,a)))return O.push(W)})){l=!1;break}}else if(!(y===_||f(y,_,t,o,a))){l=!1;break}}return a.delete(r),a.delete(e),l}var Fr=Ua;function Wa(r){var e=-1,t=Array(r.size);return r.forEach(function(o,f){t[++e]=[f,o]}),t}var st=Wa;function ja(r){var e=-1,t=Array(r.size);return r.forEach(function(o){t[++e]=o}),t}var V=ja;var Ka=1,qa=2,Ha="[object Boolean]",za="[object Date]",Ya="[object Error]",Za="[object Map]",$a="[object Number]",Ja="[object RegExp]",Xa="[object Set]",Qa="[object String]",ka="[object Symbol]",Va="[object ArrayBuffer]",rn="[object DataView]",ut=E?E.prototype:void 0,zr=ut?ut.valueOf:void 0;function en(r,e,t,o,f,a,n){switch(t){case rn:if(r.byteLength!=e.byteLength||r.byteOffset!=e.byteOffset)return!1;r=r.buffer,e=e.buffer;case Va:return!(r.byteLength!=e.byteLength||!a(new qr(r),new qr(e)));case Ha:case za:case $a:return lr(+r,+e);case Ya:return r.name==e.name&&r.message==e.message;case Ja:case Qa:return r==e+"";case Za:var i=st;case Xa:var s=o&Ka;if(i||(i=V),r.size!=e.size&&!s)return!1;var u=n.get(r);if(u)return u==e;o|=qa,n.set(r,e);var p=Fr(i(r),i(e),o,f,a,n);return n.delete(r),p;case ka:if(zr)return zr.call(r)==zr.call(e)}return!1}var mt=en;var tn=1,on=Object.prototype,fn=on.hasOwnProperty;function an(r,e,t,o,f,a){var n=t&tn,i=ar(r),s=i.length,u=ar(e),p=u.length;if(s!=p&&!n)return!1;for(var d=s;d--;){var l=i[d];if(!(n?l in e:fn.call(e,l)))return!1}var O=a.get(r),y=a.get(e);if(O&&y)return O==e&&y==r;var _=!0;a.set(r,e),a.set(e,r);for(var g=n;++d<s;){l=i[d];var b=r[l],W=e[l];if(o)var Qr=n?o(W,b,l,e,r,a):o(b,W,l,r,e,a);if(!(Qr===void 0?b===W||f(b,W,t,o,a):Qr)){_=!1;break}g||(g=l=="constructor")}if(_&&!g){var ur=r.constructor,mr=e.constructor;ur!=mr&&"constructor"in r&&"constructor"in e&&!(typeof ur=="function"&&ur instanceof ur&&typeof mr=="function"&&mr instanceof mr)&&(_=!1)}return a.delete(r),a.delete(e),_}var pt=an;var nn=1,dt="[object Arguments]",lt="[object Array]",Rr="[object Object]",sn=Object.prototype,xt=sn.hasOwnProperty;function un(r,e,t,o,f,a){var n=m(r),i=m(e),s=n?lt:T(r),u=i?lt:T(e);s=s==dt?Rr:s,u=u==dt?Rr:u;var p=s==Rr,d=u==Rr,l=s==u;if(l&&fr(r)){if(!fr(e))return!1;n=!0,p=!1}if(l&&!p)return a||(a=new R),n||ue(r)?Fr(r,e,t,o,f,a):mt(r,e,s,t,o,f,a);if(!(t&nn)){var O=p&&xt.call(r,"__wrapped__"),y=d&&xt.call(e,"__wrapped__");if(O||y){var _=O?r.value():r,g=y?e.value():e;return a||(a=new R),f(_,g,t,o,a)}}return l?(a||(a=new R),pt(r,e,t,o,f,a)):!1}var ht=un;function gt(r,e,t,o,f){return r===e?!0:r==null||e==null||!I(r)&&!I(e)?r!==r&&e!==e:ht(r,e,t,o,gt,f)}var Nr=gt;var mn=1,pn=2;function dn(r,e,t,o){var f=t.length,a=f,n=!o;if(r==null)return!a;for(r=Object(r);f--;){var i=t[f];if(n&&i[2]?i[1]!==r[i[0]]:!(i[0]in r))return!1}for(;++f<a;){i=t[f];var s=i[0],u=r[s],p=i[1];if(n&&i[2]){if(u===void 0&&!(s in r))return!1}else{var d=new R;if(o)var l=o(u,p,s,r,e,d);if(!(l===void 0?Nr(p,u,mn|pn,o,d):l))return!1}}return!0}var ct=dn;function ln(r){return r===r&&!S(r)}var Br=ln;function xn(r){for(var e=h(r),t=e.length;t--;){var o=e[t],f=r[o];e[t]=[o,f,Br(f)]}return e}var bt=xn;function hn(r,e){return function(t){return t==null?!1:t[r]===e&&(e!==void 0||r in Object(t))}}var Dr=hn;function gn(r){var e=bt(r);return e.length==1&&e[0][2]?Dr(e[0][0],e[0][1]):function(t){return t===r||ct(t,r,e)}}var yt=gn;function cn(r,e){return r!=null&&e in Object(r)}var _t=cn;function bn(r,e,t){e=B(e,r);for(var o=-1,f=e.length,a=!1;++o<f;){var n=M(e[o]);if(!(a=r!=null&&t(r,n)))break;r=r[n]}return a||++o!=f?a:(f=r==null?0:r.length,!!f&&ie(f)&&cr(n,f)&&(m(r)||gr(r)))}var Gr=bn;function yn(r,e){return r!=null&&Gr(r,e,_t)}var Ur=yn;var _n=1,An=2;function On(r,e){return Q(r)&&Br(e)?Dr(M(r),e):function(t){var o=ke(t,r);return o===void 0&&o===e?Ur(t,r):Nr(e,o,_n|An)}}var At=On;function En(r){return function(e){return e?.[r]}}var Wr=En;function In(r){return function(e){return D(e,r)}}var Ot=In;function Tn(r){return Q(r)?Wr(M(r)):Ot(r)}var Et=Tn;function vn(r){return typeof r=="function"?r:r==null?L:typeof r=="object"?m(r)?At(r[0],r[1]):yt(r):Et(r)}var c=vn;function Sn(r,e){return r&&xr(r,e,h)}var rr=Sn;function wn(r,e){return function(t,o){if(t==null)return t;if(!w(t))return r(t,o);for(var f=t.length,a=e?f:-1,n=Object(t);(e?a--:++a<f)&&o(n[a],a,n)!==!1;);return t}}var It=wn;var Cn=It(rr),G=Cn;var Ln=function(){return kr.Date.now()},Pn=Ln;var Tt=Object.prototype,Mn=Tt.hasOwnProperty,Fn=Z(function(r,e){r=Object(r);var t=-1,o=e.length,f=o>2?e[2]:void 0;for(f&&j(e[0],e[1],f)&&(o=1);++t<o;)for(var a=e[t],n=C(a),i=-1,s=n.length;++i<s;){var u=n[i],p=r[u];(p===void 0||lr(p,Tt[u])&&!Mn.call(r,u))&&(r[u]=a[u])}return r}),Rn=Fn;function Nn(r,e,t){for(var o=-1,f=r==null?0:r.length;++o<f;)if(t(e,r[o]))return!0;return!1}var vt=Nn;function Bn(r){var e=r==null?0:r.length;return e?r[e-1]:void 0}var Dn=Bn;function Gn(r){return typeof r=="function"?r:L}var er=Gn;function Un(r,e){var t=m(r)?Ar:G;return t(r,er(e))}var v=Un;function Wn(r,e){var t=[];return G(r,function(o,f,a){e(o,f,a)&&t.push(o)}),t}var St=Wn;function jn(r,e){var t=m(r)?Or:St;return t(r,c(e,3))}var tr=jn;function Kn(r){return function(e,t,o){var f=Object(e);if(!w(e)){var a=c(t,3);e=h(e),t=function(i){return a(f[i],i,f)}}var n=r(e,t,o);return n>-1?f[a?e[n]:n]:void 0}}var wt=Kn;var qn=Math.max;function Hn(r,e,t){var o=r==null?0:r.length;if(!o)return-1;var f=t==null?0:He(t);return f<0&&(f=qn(o+f,0)),wr(r,c(e,3),f)}var Ct=Hn;var zn=wt(Ct),Yn=zn;function Zn(r,e){var t=-1,o=w(r)?Array(r.length):[];return G(r,function(f,a,n){o[++t]=e(f,a,n)}),o}var jr=Zn;function $n(r,e){var t=m(r)?P:jr;return t(r,c(e,3))}var Jn=$n;function Xn(r,e){return r==null?r:xr(r,er(e),C)}var Qn=Xn;function kn(r,e){return r&&rr(r,er(e))}var Vn=kn;function ri(r,e){return r>e}var Lt=ri;var ei=Object.prototype,ti=ei.hasOwnProperty;function oi(r,e){return r!=null&&ti.call(r,e)}var Pt=oi;function fi(r,e){return r!=null&&Gr(r,e,Pt)}var F=fi;var ai="[object String]";function ni(r){return typeof r=="string"||!m(r)&&I(r)&&pr(r)==ai}var Mt=ni;function ii(r,e){return P(e,function(t){return r[t]})}var Ft=ii;function si(r){return r==null?[]:Ft(r,h(r))}var nr=si;function ui(r){return r===void 0}var U=ui;function mi(r,e){return r<e}var Kr=mi;function pi(r,e){var t={};return e=c(e,3),rr(r,function(o,f,a){ee(t,f,e(o,f,a))}),t}var di=pi;function li(r,e,t){for(var o=-1,f=r.length;++o<f;){var a=r[o],n=e(a);if(n!=null&&(i===void 0?n===n&&!A(n):t(n,i)))var i=n,s=a}return s}var or=li;function xi(r){return r&&r.length?or(r,L,Lt):void 0}var hi=xi;function gi(r){return r&&r.length?or(r,L,Kr):void 0}var ci=gi;function bi(r,e){return r&&r.length?or(r,c(e,2),Kr):void 0}var yi=bi;function _i(r,e,t,o){if(!S(r))return r;e=B(e,r);for(var f=-1,a=e.length,n=a-1,i=r;i!=null&&++f<a;){var s=M(e[f]),u=t;if(s==="__proto__"||s==="constructor"||s==="prototype")return r;if(f!=n){var p=i[s];u=o?o(p,s,i):void 0,u===void 0&&(u=S(p)?p:cr(e[f+1])?[]:{})}z(i,s,u),i=i[s]}return r}var Rt=_i;function Ai(r,e,t){for(var o=-1,f=e.length,a={};++o<f;){var n=e[o],i=D(r,n);t(i,n)&&Rt(a,B(n,r),i)}return a}var Nt=Ai;function Oi(r,e){var t=r.length;for(r.sort(e);t--;)r[t]=r[t].value;return r}var Bt=Oi;function Ei(r,e){if(r!==e){var t=r!==void 0,o=r===null,f=r===r,a=A(r),n=e!==void 0,i=e===null,s=e===e,u=A(e);if(!i&&!u&&!a&&r>e||a&&n&&s&&!i&&!u||o&&n&&s||!t&&s||!f)return 1;if(!o&&!a&&!u&&r<e||u&&t&&f&&!o&&!a||i&&t&&f||!n&&f||!s)return-1}return 0}var Dt=Ei;function Ii(r,e,t){for(var o=-1,f=r.criteria,a=e.criteria,n=f.length,i=t.length;++o<n;){var s=Dt(f[o],a[o]);if(s){if(o>=i)return s;var u=t[o];return s*(u=="desc"?-1:1)}}return r.index-e.index}var Gt=Ii;function Ti(r,e,t){e.length?e=P(e,function(a){return m(a)?function(n){return D(n,a.length===1?a[0]:a)}:a}):e=[L];var o=-1;e=P(e,q(c));var f=jr(r,function(a,n,i){var s=P(e,function(u){return u(a)});return{criteria:s,index:++o,value:a}});return Bt(f,function(a,n){return Gt(a,n,t)})}var Ut=Ti;var vi=Wr("length"),Wt=vi;var Kt="\\ud800-\\udfff",Si="\\u0300-\\u036f",wi="\\ufe20-\\ufe2f",Ci="\\u20d0-\\u20ff",Li=Si+wi+Ci,Pi="\\ufe0e\\ufe0f",Mi="["+Kt+"]",Yr="["+Li+"]",Zr="\\ud83c[\\udffb-\\udfff]",Fi="(?:"+Yr+"|"+Zr+")",qt="[^"+Kt+"]",Ht="(?:\\ud83c[\\udde6-\\uddff]){2}",zt="[\\ud800-\\udbff][\\udc00-\\udfff]",Ri="\\u200d",Yt=Fi+"?",Zt="["+Pi+"]?",Ni="(?:"+Ri+"(?:"+[qt,Ht,zt].join("|")+")"+Zt+Yt+")*",Bi=Zt+Yt+Ni,Di="(?:"+[qt+Yr+"?",Yr,Ht,zt,Mi].join("|")+")",jt=RegExp(Zr+"(?="+Zr+")|"+Di+Bi,"g");function Gi(r){for(var e=jt.lastIndex=0;jt.test(r);)++e;return e}var $t=Gi;function Ui(r){return ot(r)?$t(r):Wt(r)}var Jt=Ui;function Wi(r,e){return Nt(r,e,function(t,o){return Ur(r,o)})}var Xt=Wi;var ji=tt(function(r,e){return r==null?{}:Xt(r,e)}),Ki=ji;var qi=Math.ceil,Hi=Math.max;function zi(r,e,t,o){for(var f=-1,a=Hi(qi((e-r)/(t||1)),0),n=Array(a);a--;)n[o?a:++f]=r,r+=t;return n}var Qt=zi;function Yi(r){return function(e,t,o){return o&&typeof o!="number"&&j(e,t,o)&&(t=o=void 0),e=X(e),t===void 0?(t=e,e=0):t=X(t),o=o===void 0?e<t?1:-1:X(o),Qt(e,t,o,r)}}var kt=Yi;var Zi=kt(),$i=Zi;function Ji(r,e,t,o,f){return f(r,function(a,n,i){t=o?(o=!1,a):e(t,a,n,i)}),t}var Vt=Ji;function Xi(r,e,t){var o=m(r)?ft:Vt,f=arguments.length<3;return o(r,c(e,4),t,f,G)}var $r=Xi;var Qi="[object Map]",ki="[object Set]";function Vi(r){if(r==null)return 0;if(w(r))return Mt(r)?Jt(r):r.length;var e=T(r);return e==Qi||e==ki?r.size:br(r).length}var rs=Vi;var es=Z(function(r,e){if(r==null)return[];var t=e.length;return t>1&&j(r,e[0],e[1])?e=[]:t>2&&j(e[0],e[1],e[2])&&(e=[e[0]]),Ut(r,k(e,1),[])}),ts=es;var os=1/0,fs=yr&&1/V(new yr([,-0]))[1]==os?function(r){return new yr(r)}:ze,ro=fs;var as=200;function ns(r,e,t){var o=-1,f=Je,a=r.length,n=!0,i=[],s=i;if(t)n=!1,f=vt;else if(a>=as){var u=e?null:ro(r);if(u)return V(u);n=!1,f=Mr,s=new Pr}else s=e?[]:i;r:for(;++o<a;){var p=r[o],d=e?e(p):p;if(p=t||p!==0?p:0,n&&d===d){for(var l=s.length;l--;)if(s[l]===d)continue r;e&&s.push(d),i.push(p)}else f(s,d,t)||(s!==i&&s.push(d),i.push(p))}return i}var eo=ns;var is=Z(function(r){return eo(k(r,1,se,!0))}),Jr=is;var ss=0;function us(r){var e=++ss;return Cr(r)+e}var ms=us;function ps(r,e,t){for(var o=-1,f=r.length,a=e.length,n={};++o<f;){var i=o<a?e[o]:void 0;t(n,r[o],i)}return n}var to=ps;function ds(r,e){return to(r||[],e||[],z)}var ls=ds;var hs="\0",K="\0",oo="",sr=class{constructor(e={}){this._isDirected=F(e,"directed")?e.directed:!0,this._isMultigraph=F(e,"multigraph")?e.multigraph:!1,this._isCompound=F(e,"compound")?e.compound:!1,this._label=void 0,this._defaultNodeLabelFn=Y(void 0),this._defaultEdgeLabelFn=Y(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children[K]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){return dr(e)||(e=Y(e)),this._defaultNodeLabelFn=e,this}nodeCount(){return this._nodeCount}nodes(){return h(this._nodes)}sources(){var e=this;return tr(this.nodes(),function(t){return _r(e._in[t])})}sinks(){var e=this;return tr(this.nodes(),function(t){return _r(e._out[t])})}setNodes(e,t){var o=arguments,f=this;return v(e,function(a){o.length>1?f.setNode(a,t):f.setNode(a)}),this}setNode(e,t){return F(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=t),this):(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=K,this._children[e]={},this._children[K][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(e){return F(this._nodes,e)}removeNode(e){var t=this;if(F(this._nodes,e)){var o=function(f){t.removeEdge(t._edgeObjs[f])};delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],v(this.children(e),function(f){t.setParent(f)}),delete this._children[e]),v(h(this._in[e]),o),delete this._in[e],delete this._preds[e],v(h(this._out[e]),o),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,t){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(U(t))t=K;else{t+="";for(var o=t;!U(o);o=this.parent(o))if(o===e)throw new Error("Setting "+t+" as parent of "+e+" would create a cycle");this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var t=this._parent[e];if(t!==K)return t}}children(e){if(U(e)&&(e=K),this._isCompound){var t=this._children[e];if(t)return h(t)}else{if(e===K)return this.nodes();if(this.hasNode(e))return[]}}predecessors(e){var t=this._preds[e];if(t)return h(t)}successors(e){var t=this._sucs[e];if(t)return h(t)}neighbors(e){var t=this.predecessors(e);if(t)return Jr(t,this.successors(e))}isLeaf(e){var t;return this.isDirected()?t=this.successors(e):t=this.neighbors(e),t.length===0}filterNodes(e){var t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph());var o=this;v(this._nodes,function(n,i){e(i)&&t.setNode(i,n)}),v(this._edgeObjs,function(n){t.hasNode(n.v)&&t.hasNode(n.w)&&t.setEdge(n,o.edge(n))});var f={};function a(n){var i=o.parent(n);return i===void 0||t.hasNode(i)?(f[n]=i,i):i in f?f[i]:a(i)}return this._isCompound&&v(t.nodes(),function(n){t.setParent(n,a(n))}),t}setDefaultEdgeLabel(e){return dr(e)||(e=Y(e)),this._defaultEdgeLabelFn=e,this}edgeCount(){return this._edgeCount}edges(){return nr(this._edgeObjs)}setPath(e,t){var o=this,f=arguments;return $r(e,function(a,n){return f.length>1?o.setEdge(a,n,t):o.setEdge(a,n),n}),this}setEdge(){var e,t,o,f,a=!1,n=arguments[0];typeof n=="object"&&n!==null&&"v"in n?(e=n.v,t=n.w,o=n.name,arguments.length===2&&(f=arguments[1],a=!0)):(e=n,t=arguments[1],o=arguments[3],arguments.length>2&&(f=arguments[2],a=!0)),e=""+e,t=""+t,U(o)||(o=""+o);var i=ir(this._isDirected,e,t,o);if(F(this._edgeLabels,i))return a&&(this._edgeLabels[i]=f),this;if(!U(o)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(t),this._edgeLabels[i]=a?f:this._defaultEdgeLabelFn(e,t,o);var s=gs(this._isDirected,e,t,o);return e=s.v,t=s.w,Object.freeze(s),this._edgeObjs[i]=s,fo(this._preds[t],e),fo(this._sucs[e],t),this._in[t][i]=s,this._out[e][i]=s,this._edgeCount++,this}edge(e,t,o){var f=arguments.length===1?Xr(this._isDirected,arguments[0]):ir(this._isDirected,e,t,o);return this._edgeLabels[f]}hasEdge(e,t,o){var f=arguments.length===1?Xr(this._isDirected,arguments[0]):ir(this._isDirected,e,t,o);return F(this._edgeLabels,f)}removeEdge(e,t,o){var f=arguments.length===1?Xr(this._isDirected,arguments[0]):ir(this._isDirected,e,t,o),a=this._edgeObjs[f];return a&&(e=a.v,t=a.w,delete this._edgeLabels[f],delete this._edgeObjs[f],ao(this._preds[t],e),ao(this._sucs[e],t),delete this._in[t][f],delete this._out[e][f],this._edgeCount--),this}inEdges(e,t){var o=this._in[e];if(o){var f=nr(o);return t?tr(f,function(a){return a.v===t}):f}}outEdges(e,t){var o=this._out[e];if(o){var f=nr(o);return t?tr(f,function(a){return a.w===t}):f}}nodeEdges(e,t){var o=this.inEdges(e,t);if(o)return o.concat(this.outEdges(e,t))}};sr.prototype._nodeCount=0;sr.prototype._edgeCount=0;function fo(r,e){r[e]?r[e]++:r[e]=1}function ao(r,e){--r[e]||delete r[e]}function ir(r,e,t,o){var f=""+e,a=""+t;if(!r&&f>a){var n=f;f=a,a=n}return f+oo+a+oo+(U(o)?hs:o)}function gs(r,e,t,o){var f=""+e,a=""+t;if(!r&&f>a){var n=f;f=a,a=n}var i={v:f,w:a};return o&&(i.name=o),i}function Xr(r,e){return ir(r,e.v,e.w,e.name)}export{Hr as a,Mf as b,Pa as c,Pn as d,Rn as e,Dn as f,v as g,tr as h,Yn as i,Jn as j,Qn as k,Vn as l,F as m,nr as n,U as o,di as p,hi as q,ci as r,yi as s,Ki as t,$i as u,$r as v,rs as w,ts as x,ms as y,ls as z,sr as A};
