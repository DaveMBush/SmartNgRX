import{a as g}from"./chunk-MMZV4BMI.js";import{a as h}from"./chunk-ILHULVET.js";import"./chunk-QCRGZPLW.js";import"./chunk-NHVJC6EG.js";import{a as s}from"./chunk-3NJKGVAP.js";import{X as D}from"./chunk-QXTZ4AYG.js";import"./chunk-AACWRZT7.js";import{Ba as i,Fa as d,Wa as l,sb as c}from"./chunk-O44Q3Q27.js";import{a as n,b as r,h as f}from"./chunk-TWZW5B45.js";var u=f(D());var y={title:"Database Structure",mdFile:"./index.md",order:2,category:g},e=y;var p=[];var P={},m=P;var N=`<h1 id="database-structure" href="demo-walkthrough/database-structure" headinglink="true" class="ngde">Database Structure<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="database-structure"></ng-doc-heading-anchor></h1><p class="ngde">The backend database uses SqlLite3, a lightweight database that is easy to use and set up. The database is stored in a file called <code class="ngde">database.db</code> in the root of the project and is created and populated with data when you <code class="ngde">pnpm install</code> the project for the first time.</p><p class="ngde">We use Prisma to interact with the database, including creating tables, inserting data, and querying data. Prisma is a modern database toolkit that makes it easy to interact with databases in a type-safe way. It is used to generate the database schema and typescript types from the database schema.</p><p class="ngde">The database schema and subsequent changes are managed using Prisma Migrate. Prisma Migrate is a database schema migration tool that allows you to make changes to the database schema and apply those changes to the database.</p><p class="ngde">You can find the Prisma schema in the <a href="https://github.com/DaveMBush/SmartNgRX/blob/main/prisma/schema.prisma" class="ngde">prisma/schema.prisma</a>\` file. This file defines the database schema and is used by Prisma to generate the database schema and typescript types.</p><h2 id="tables" href="demo-walkthrough/database-structure" headinglink="true" class="ngde">Tables<ng-doc-heading-anchor class="ng-doc-anchor ngde" anchor="tables"></ng-doc-heading-anchor></h2><p class="ngde">Currently all of our tables are structured the same with the exception of a field that points to the parent table's id. This is used to create a tree structure in the database.</p><p class="ngde">The fields all tables have are:</p><ul class="ngde"><li class="ngde">id: a unique identifier for the record as a guid.</li><li class="ngde">name: the name of the record.</li><li class="ngde">version: the version of the record as an integer that increments every time something gets updated.</li><li class="ngde">created: the timestamp for when the record was created, we use this to order the records in the UI.</li></ul><p class="ngde">The database has the following tables:</p><ul class="ngde"><li class="ngde">locations: this is the top level table.</li><li class="ngde">departments: this table as a locationId field that points back to the locations table.</li><li class="ngde">docs: this table has a departmentId field that points back to the departments table.</li><li class="ngde">folders: this table has a departmentId field that points back to the departments table.</li><li class="ngde">lists: this table has a departmentId field that points back to the departments table.</li><li class="ngde">sprintFolders: this table has a departmentId field that points back to the departments table.</li></ul><p class="ngde">You'll notice that the docs, folders, lists, and sprintFolders tables all have a departmentId field that points back to the departments table. This allows these to all be children of the departments table.</p>`,o=class t extends s{constructor(){super();this.pageType="guide";this.pageContent=N;this.editSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/edit/main/apps/documentation/src/app/demo-walkthrough/database-structure/index.md?message=docs(): describe your changes here...";this.viewSourceFileUrl="https://github.com/DaveMBush/SmartNgRX/blob/release/apps/documentation/src/app/demo-walkthrough/database-structure/index.md";this.page=e;this.demoAssets=m}static{this.\u0275fac=function(a){return new(a||t)}}static{this.\u0275cmp=i({type:t,selectors:[["ng-doc-page-0z1tm4yd"]],features:[c([{provide:s,useExisting:t},p,e.providers??[]]),d],decls:1,vars:0,template:function(a,k){a&1&&l(0,"ng-doc-page")},dependencies:[h],encapsulation:2,changeDetection:0})}},w=[r(n({},(0,u.isRoute)(e.route)?e.route:{}),{path:"",component:o,title:"Database Structure"})],q=w;export{o as PageComponent,q as default};
