"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3809],{3809:(f,a,e)=>{e.r(a),e.d(a,{DynamicComponent:()=>c,default:()=>y});var i=e(9649),r=e(5789),h=e(235);const o={title:"ProxyChild",mdFile:"./index.md",order:6,category:e(5040).Z},p=[],m={};var n=e(7514);let c=(()=>{var t;class d extends i.a{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent='<h1 id="proxychild" class="ngde">ProxyChild<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/proxy-child#proxychild"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">Now that we\'ve setup our state management, the last step is being able to get the data out of the store and into our components where we can see them. This is where Smart Selectors come in.</p><p class="ngde">But before we can create a selector, we need to understand the <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/interfaces/ProxyChild" class="ng-doc-code-anchor ngde" data-link-type="Interface" class="ngde">ProxyChild</a></code> interface. It has the following components, as outlined in the API documentation:</p><ul class="ngde"><li class="ngde"><p class="ngde">childFeature - The name of the feature the child entity was registered with. We need to supply this and the childFieldName so that the code can lookup information about the entity we\'ve already supplied from <code class="ngde ng-doc-code-with-link" class="ngde"><a href="/api/smart-ngrx/functions/provideSmartFeatureEntities" class="ng-doc-code-anchor ngde" data-link-type="Function" class="ngde">provideSmartFeatureEntities</a></code>.</p></li><li class="ngde"><p class="ngde">childFieldName - The name of the field the child entity was registered with.</p></li><li class="ngde"><p class="ngde">childSelector - the selector we use to retrieve the information for the child. The childSelector is an EntityState selector. This allows us to lookup an ID in the entity quickly.</p></li><li class="ngde"><p class="ngde">parentFieldName - the name of the field in the parent entity that contains the IDs of the children.</p></li></ul>',this.page=o,this.demoAssets=m}}return(t=d).\u0275fac=function(s){return new(s||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["ng-doc-page-using-smart-ng-rx-proxy-child"]],standalone:!0,features:[n._Bn([{provide:i.a,useExisting:t},p,o.providers??[]]),n.qOj,n.jDz],decls:1,vars:0,template:function(s,w){1&s&&n._UZ(0,"ng-doc-page")},dependencies:[r.z],encapsulation:2,changeDetection:0}),d})();const y=[{...(0,h.isRoute)(o.route)?o.route:{},path:"",component:c,title:"ProxyChild"}]}}]);