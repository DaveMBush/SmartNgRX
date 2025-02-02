import{a as c}from"./chunk-HBZWFD3Q.js";import{a as g}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as o}from"./chunk-3NJKGVAP.js";import{X as w}from"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as r,Fa as d,Wa as h,sb as l}from"./chunk-O44Q3Q27.js";import{a as s,b as i,h as f}from"./chunk-TWZW5B45.js";var p=f(w());var b={title:"Intro",mdFile:"./index.md",order:1,category:c},e=b;var u=[];var N={},m=N;var v=`<h1 id="intro" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">Intro<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="intro"></ng-doc-heading-anchor></h1><h2 id="entities-under-the-hood" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">Entities Under the Hood<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="entities-under-the-hood"></ng-doc-heading-anchor></h2><p class="ngde">Smart NgRX uses <a href="https://ngrx.io/guide/entity" class="ngde">NgRX Entities</a> under the hood to manage the state of the application. This means that the state of the application is stored in a normalized way. This is a very powerful approach that allows us to easily manage the state of the application and to easily update the state of the application.</p><p class="ngde">The main benefit of using Entities is that we can do lookups for existing data quickly.</p><p class="ngde">Everything that Smart NgRX is doing uses standard NgRX patterns and practices with one minor exception. Smart NgRX is based on the command Action pattern rather than the event pattern. By doing this we are able to create the factories for Actions, Reducers and Effects that allow us to hide these details from you. Since you won't be actively dispatching any actions, which model we use should be immaterial to you.</p><p class="ngde">Now, because this is still NgRX, any NgRX dev tools you might be using, such as the Redux Dev Tools, will still work.</p><h2 id="only-what-you-need" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">Only What you Need<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="only-what-you-need"></ng-doc-heading-anchor></h2><p class="ngde">Another concept you'll need to understand is that Smart NgRX only loads the data that you need. This means that if you have a page that only needs to display a list of users, then Smart NgRX will only load the users. If you have a page that needs to display a list of users and a list of roles, then Smart NgRX will load the users and the roles.</p><p class="ngde">It also only loads the data when you need it. Not only does this mean that it will only navigate the data when you are on the page that request the data, but if you've already loaded the data, it won't load it again, unless the data has been marked dirty.</p><p class="ngde">But what, exactly, does it mean for an application to "need" the data? It means that something in your code has requested it. This could be because you've requested it directly, or because you've used a selector that has requested it. This is a very powerful concept that allows us to only load the data that is needed. But what this means is that you'll want to be careful about how you access your data.</p><p class="ngde">For example, as our example app demonstrates, if you are using Virtual Scrolling, you'll want to be sure you only access the data that is being displayed. Don't request every row in a list. Instead, request only the rows that are being displayed. This will ensure that your application is as performant as possible.</p><h2 id="dirty-data" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">Dirty Data<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="dirty-data"></ng-doc-heading-anchor></h2><p class="ngde">There are multiple ways data might become "dirty". The first is by setting an expiration time on the data. SmartNgRX does this for you by registering the entity when we load it into the store. By setting the time, Smart NgRX will mark rows dirty when the expiration time is hit. The second is that you can mark the data dirty due to a websocket message event that indicates a row needs to be refreshed. Our API for handling websocket messages does this for you. Whenever data is marked dirty, Smart NgRX will automatically reload the data if it is currently being used or, later,when it is needed. That is, if your code is accessing the row, Smart NgRX will use the same mechanisms it originally used to get a fresh copy of the data. This all happens transparently for you under the hood.</p><h2 id="what-this-means-for-your-code" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">What this Means for Your Code<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="what-this-means-for-your-code"></ng-doc-heading-anchor></h2><p class="ngde">Because of the way Smart NgRX works, you'll want to be sure to take advantage of Virtual Scrolling and <code class="ngde">@Defer()</code>, to ensure that you are only loading the data that you need. This will ensure that your application has the best performance as possible. By doing this, you'll be able to get the benefits of Virtual Data as well as Virtual Scrolling.</p><p class="ngde">It may also mean you'll want to re-think how you've structured your data. For example, imagine the situation where you have a set of fields in your row that you only display some of the time. In this case, you might want to consider moving those fields to a separate entity. This will ensure that you are only loading the data that you need.</p><p class="ngde">But lets take this a bit further. Let's say each of those fields is conditionally displayed. In this case, it might make more sense to make the entity a list of fields that each relate back to the main entity. By doing this, you can retrieve and display only the fields that are being displayed.</p><h3 id="this-reminds-me-of-a-story" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">This reminds me of a story...<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="this-reminds-me-of-a-story"></ng-doc-heading-anchor></h3><p class="ngde">I was once tasked with interviewing a couple of programmers at a college who I had been told were the best students in their class. Since the bulk of the work they would be doing involved creating tables in a database, I asked them to model some data in a database that intentionally had multiple fields that were similar but unique. I think it was phone numbers. Home phone and cell phone for example.</p><p class="ngde">What I wanted to know from this exercise was, would they model these fields in a related table or would they just dump the two fields in the same table the other fields were in?</p><p class="ngde">I don't think I need to tell you what they did. They put them in the same table instead of another related table.</p><h2 id="performance" href="using-smart-ng-rx/intro" headinglink="true" class="ngde">Performance<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="performance"></ng-doc-heading-anchor></h2><p class="ngde">You might be wondering how all this will impact performance. It is top of mind for us as well. We've added in various ways of retrieving data so that you can choose the best way to structure your data based on individual scenarios. There may be times when you want to load all the data up front. For example, lookup tables. There are other cases when you'll have a set of related entities that you want to load together rather than waiting for them to display. We've added in ways to do this as well. All while hiding the details from you and your team.</p><p class="ngde">Having said that, the performance of SmartNgRX is now far beyond what I originally envisioned.</p>`,n=class t extends o{constructor(){super();this.pageType="guide";this.pageContent=v;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/using-smart-ng-rx/intro/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/using-smart-ng-rx/intro/index.md";this.page=e;this.demoAssets=m}static{this.\u0275fac=function(a){return new(a||t)}}static{this.\u0275cmp=r({type:t,selectors:[["ng-doc-page-jjr4g6f4"]],features:[l([{provide:o,useExisting:t},u,e.providers??[]]),d],decls:1,vars:0,template:function(a,R){a&1&&h(0,"ng-doc-page")},dependencies:[g],encapsulation:2,changeDetection:0})}},D=[i(s({},(0,p.isRoute)(e.route)?e.route:{}),{path:"",component:n,title:"Intro"})],U=D;export{n as PageComponent,U as default};
