import{a as p}from"./chunk-MMZV4BMI.js";import{a as g}from"./chunk-ICC3I7U3.js";import"./chunk-3NO74SQX.js";import"./chunk-A7763QJH.js";import{a as s}from"./chunk-JHHDKBNU.js";import{X as y}from"./chunk-4NKWSBMZ.js";import"./chunk-PTJD77X5.js";import{Pa as i,S as c,lb as l,mb as h,za as d}from"./chunk-UDQB7DFD.js";import{a as r,b as n,h as D}from"./chunk-TWZW5B45.js";var f=D(y());var v={title:"Selectors",mdFile:"./index.md",order:6,category:p},e=v;var m=[];var N={},u=N;var S=`<h1 id="selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="selectors"></ng-doc-heading-anchor></h1><p class="ngde">From an NgRX perspective, once you've configured your global provider and your feature providers, and created the Effects Services to retrieve your data, the only NgRX thing you'll need to concern yourself with are the selectors. And, even these aren't quite what you are used to because we've abstracted them as well. You'll never create an Effect, Action or Reducer for CRUD operations again. You'll still need to use standard NgRX for other state management tasks, such as storing form data like we do in the demo application to store the currently selected location.</p><p class="ngde">We won't go into much detail here because this is standard NgRX code. But you can see the current location actions, effects, and reducers in any of the <a href="https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo/src/app/routes/tree-standard/store/current-location" class="ngde">current-location</a> folders.</p><p class="ngde">One thing we will point out that might look strange to some of you is that we use an effect to listen for new data being set for the locations so we can determine a default action when new data comes in as a way to get around a problem we've had with the Angular Material mat-selector. It exists simply to delay setting the current location.</p><p class="ngde">Since all of our selectors look the same except for the feature store they are getting the data from, we'll focus our time on the selectors for the <a href="https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo/src/app/routes/tree-standard" class="ngde">Tree (Standard)</a> page.</p><h2 id="feature-selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Feature Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="feature-selectors"></ng-doc-heading-anchor></h2><p class="ngde">All our feature selectors for a route are located in the same file. This doesn't have to be the case, we've just decided to group them like this.</p><p class="ngde"><a href="https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/tree-standard-state.selectors.ts" class="ngde">tree-standard-state.selectors.ts</a> is where you'll find the feature selectors for the Tree (Standard) page. Notice there are two. One for the state that uses standard NgRX and one for the state that uses SmartNgRX.</p><h2 id="top-selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Top Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="top-selectors"></ng-doc-heading-anchor></h2><p class="ngde">The main selector in our <a href="https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/top/top.selector.ts" class="ngde">top.selector.ts</a> file is <code class="ngde">selectTopLocations()</code> you'll see that it uses <code class="ngde">selectTopEntities()</code> as the first parameter which is used to retrieve the top entity slice from the feature. The second parameter is the array of <code class="ngde ng-doc-code-with-link"><a href="api/interfaces/smart-ngrx/ChildDefinition" class="ng-doc-code-anchor ngde">ChildDefinition</a></code>s which has just one item because the list of IDs we will use to retrieve the locations is the <code class="ngde">locations</code> field.</p><p class="ngde">While not technically a top selector item, the last selector in this file is <code class="ngde">selectLocation()</code> which is used to retrieve the location IDs from the return value of <code class="ngde">selectTopLocations()</code>.</p><h2 id="current-location-selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Current Location Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="current-location-selectors"></ng-doc-heading-anchor></h2><p class="ngde">The <a href="https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/current-location/current-location.selector.ts" class="ngde">current-location.selectors.ts</a> simply pulls out the currently selected location ID from the state.</p><h2 id="location-selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Location Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="location-selectors"></ng-doc-heading-anchor></h2><p class="ngde">The <a href="https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/locations/location.selectors.ts" class="ngde">location.selectors.ts</a> holds selectors that will give us access to the locations and the selected location.</p><p class="ngde">Once again, we see our <code class="ngde ng-doc-code-with-link"><a href="api/functions/smart-ngrx/createSmartSelector" class="ng-doc-code-anchor ngde">createSmartSelector</a>()</code> being used to retrieve the locations and the children of the locations. In this case, the departments. It takes our <code class="ngde">selectLocationEntities()</code> as the first parameter and the array of <code class="ngde">ChildDefinion</code>s as the second parameter.</p><p class="ngde">The other select we need here is the one that provides the currently selected location. This standard NgRX selector uses the <code class="ngde">selectLocationDepartments()</code> and <code class="ngde">selectCurrentLocationId()</code> we've already covered as parameter and then uses those to return the selected location, if it exists. Otherwise it returns a default location that has no departments.</p><h2 id="department-selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Department Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="department-selectors"></ng-doc-heading-anchor></h2><p class="ngde">And so we continue down the stack and everything starts to look the same. The <a href="https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/department/department.selector.ts" class="ngde">department.selectors.ts</a> file has the <code class="ngde">selectDepartments()</code> selector that is used to retrieve the department entities and the <code class="ngde">selectDepartmentsChildren()</code> select that is used to define how to access the department children.</p><h2 id="department-children-selectors" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Department Children Selectors<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="department-children-selectors"></ng-doc-heading-anchor></h2><p class="ngde">And finally we come to the bottom of the tree where the only thing left to do is to select the <a href="https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/department-children/department-child.selector.ts" class="ngde">department children</a>.</p><h2 id="conclusion" href="demo-walkthrough/selectors" headinglink="true" class="ngde">Conclusion<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="conclusion"></ng-doc-heading-anchor></h2><p class="ngde">Notice how coming from the top, we combine selectors until we've retrieved all the data we need to create the tree. Next, we'll show how we only retrieve the data we need as it is needed. This is one of the main features of SmartNgRX. We don't retrieve everything all at once.</p>`,a=class t extends s{constructor(){super();this.pageType="guide";this.pageContent=S;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/demo-walkthrough/selectors/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/demo-walkthrough/selectors/index.md";this.page=e;this.demoAssets=u}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=c({type:t,selectors:[["ng-doc-page-9whkjw5a"]],standalone:!0,features:[l([{provide:s,useExisting:t},m,e.providers??[]]),d,h],decls:1,vars:0,template:function(o,k){o&1&&i(0,"ng-doc-page")},dependencies:[g],encapsulation:2,changeDetection:0})}},b=[n(r({},(0,f.isRoute)(e.route)?e.route:{}),{path:"",component:a,title:"Selectors"})],Y=b;export{a as PageComponent,Y as default};
