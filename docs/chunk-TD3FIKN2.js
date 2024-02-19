import{a as g}from"./chunk-CGH4GANM.js";import"./chunk-NCOWMHCX.js";import{a as h}from"./chunk-JPQZCOTC.js";import"./chunk-RWEY7HJP.js";import{a as t}from"./chunk-JSKR5BFP.js";import{G as p,Ta as r,Tb as j,Ua as c,la as d,ya as i}from"./chunk-WRNO36ZM.js";import{a as o,b as l,g as y}from"./chunk-P2VZOJAX.js";var m=y(j());var v={title:"Updates",mdFile:"./index.md",order:2,category:g},s=v;var u=[];var b={},w=b;var x=`<h1 id="updates" class="ngde">Updates<a title="Link to heading" class="ng-doc-header-link ngde" href="/using-smart-ng-rx/crud-support/updates#updates"><ng-doc-icon icon="link-2" size="16" class="ngde"></ng-doc-icon></a></h1><p class="ngde">Any row that has been exposed to your main application via a smart selector will automatically be available for update. All you have to do is assign a row. All the necessary dispatches to the reducer and effects will be handled for you.</p><p class="ngde">You will need to implement the update method in your effects service for the row the entity lives in.</p><p class="ngde">As an example, here is how we've updated the <code class="ngde">update</code> method in the <code class="ngde">DepartmentEffectsService</code> in the demo:</p><ng-doc-blockquote class="ngde"><p class="ngde"><strong class="ngde">Note:</strong> explanation of this code will follow</p></ng-doc-blockquote><pre class="ngde hljs"><code class="hljs language-typescript code-lines ngde" lang="typescript" name="" icon="" highlightedlines="[]"><span class="line ngde">  <span class="hljs-keyword ngde">override</span> <span class="hljs-attr ngde">update</span>: (<span class="hljs-params ngde"></span>
</span><span class="line ngde"><span class="hljs-params ngde">    oldRow: Department,</span>
</span><span class="line ngde"><span class="hljs-params ngde">    newRow: Department,</span>
</span><span class="line ngde"><span class="hljs-params ngde">  </span>) => <span class="hljs-title class_ ngde">Observable</span>&#x3C;<span class="hljs-title class_ ngde">Department</span>[]> = <span class="hljs-function ngde">(<span class="hljs-params ngde">oldRow: Department, newRow: Department</span>) =></span> {
</span><span class="line ngde">    <span class="hljs-keyword ngde">return</span> <span class="hljs-variable language_ ngde">this</span>.<span class="hljs-property ngde">http</span>
</span><span class="line ngde">      .<span class="hljs-property ngde">put</span>&#x3C;<span class="hljs-title class_ ngde">Department</span>[]>(<span class="hljs-string ngde">'./api/departments'</span>, {
</span><span class="line ngde">        <span class="hljs-attr ngde">id</span>: newRow.<span class="hljs-property ngde">id</span>,
</span><span class="line ngde">        <span class="hljs-attr ngde">name</span>: newRow.<span class="hljs-property ngde">name</span>,
</span><span class="line ngde">      })
</span><span class="line ngde">      .<span class="hljs-title function_ ngde">pipe</span>(
</span><span class="line ngde">        <span class="hljs-title function_ ngde">map</span>(<span class="hljs-function ngde">(<span class="hljs-params ngde">departments</span>) =></span> <span class="hljs-title function_ ngde">addIsDirty</span>(departments) <span class="hljs-keyword ngde">as</span> <span class="hljs-title class_ ngde">Department</span>[]),
</span><span class="line ngde">        <span class="hljs-title function_ ngde">map</span>(childrenTransform),
</span><span class="line ngde">        <span class="hljs-title function_ ngde">catchError</span>(<span class="hljs-function ngde">(<span class="hljs-params ngde">_: <span class="hljs-built_in ngde">unknown</span></span>) =></span> {
</span><span class="line ngde">          <span class="hljs-comment ngde">// probably would want to send a message to the user here</span>
</span><span class="line ngde">          <span class="hljs-keyword ngde">return</span> <span class="hljs-title function_ ngde">of</span>([oldRow]);
</span><span class="line ngde">        }),
</span><span class="line ngde">      );
</span><span class="line ngde">  };
</span></code></pre><p class="ngde">The first thing you will note is that the method takes two parameters, <code class="ngde">oldRow</code> and <code class="ngde">newRow</code>. The <code class="ngde">oldRow</code> is the row that was in the store before the update was requested. The <code class="ngde">newRow</code> is the row that was passed in to the <code class="ngde">update</code> method. This allows you to roll back the update if the update fails as we do in the <code class="ngde">catchError</code> block.</p><p class="ngde">This needs a bit of explanation. The effect that calls this service keeps track of the row that was updated. Instead of using switchMap() around our call to this service, we use concatMap(). By doing this, if a call fails, we can rollback each call so that when the next call comes in, the row is in the state is was prior to the update that just failed.</p><p class="ngde">So, just like we've done here, you want to catch errors and return the old row. Whatever is in the return value row is what we'll use to pass in to the next update for the same row.</p><p class="ngde">Also, notice that we always return an array of rows even though there should only ever be one row in the array. This allows us to reuse code that we used previously to get the list of rows from the server. You'll see that in our implementation on the server, we reuse the getByIds code to get the row we just updated.</p><p class="ngde">All of this has implications for how you update by assigning a value to a field in a row.</p><p class="ngde">Let's say you have an edit field that you want to have update the row. You might be tempted to bind it directly to the field in the row. This would work, but even with debounce, you'd end up updating the row more frequently than you'd want to. Instead, you should consider binding the edit field to a local variable and then, when you are ready to update the row, assign the value of the local variable to the row. We've designed the code so that either way will work. But the latter will be more performant.</p><p class="ngde">We've also ensured that updating multiple fields will update the row only once as long as those multiple assignments happen within the same event loop. This is because we use a <code class="ngde">debounceTime(1)</code> to ensure that the update only happens once. And if you update multiple rows within the same event loop, it will keep track of each row and call the effect service's update method once for each row.</p>`,D=(()=>{let e=class e extends t{constructor(){super(),this.routePrefix="",this.pageType="guide",this.pageContent=x,this.page=s,this.demoAssets=w}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["ng-doc-page-using-smart-ng-rx-crud-support-updates"]],standalone:!0,features:[r([{provide:t,useExisting:e},u,s.providers??[]]),d,c],decls:1,vars:0,template:function(n,k){n&1&&i(0,"ng-doc-page")},dependencies:[h],encapsulation:2,changeDetection:0});let a=e;return a})(),R=[l(o({},(0,m.isRoute)(s.route)?s.route:{}),{path:"",component:D,title:"Updates"})],I=R;export{D as DynamicComponent,I as default};
