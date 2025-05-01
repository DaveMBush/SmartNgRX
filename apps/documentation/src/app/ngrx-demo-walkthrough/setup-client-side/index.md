# Setup Client Side

Now that you've had a look at the data we are working with, let's take a look at how to get that data into our client code.

## Global Registration

As you may remember from our [Global Registration](/using-smart-ng-rx/global-registration) documentation, the first thing we need to do is to provide a global registration in our `app.module.ts` file directly or indirectly. Because we use standalone components for our App component, we put this code in our `app.config.ts` file.

Simply add the `provideSmartNgRX` function to the providers array like we've done in [apps/demo-ngrx-classic/src/app/app.config.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/app.config.ts#L74)

## Entity Registration

The next step we covered in our documentation was [Entity Registration](/using-smart-ng-rx/entity-registration) which registers the features and entities that we want to use in our appliction.

As we mentioned in the [Introduction](/demo-walkthrough/introduction), each of the tabs in our application follow a separate strategy. We also store state for the currently selected `location` using a standard NgRX slice. Not everything is suitable for SmartNgRX.

You can view the registration code for each of the tabs in the following locations. I'm providing links to the providers section and under each of those links, links to the entity definitions they reference

- [Tree (Standard)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/app.routes.ts#L61-L79)
  - [standardTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/top/standard-top-definition.const.ts)
  - [standardLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/locations/standard-locations-definition.ts)
  - [standardDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/department/standard-departments-definition.ts)
  - [standardDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-standard/store/department-children/standard-department-children-definition.ts)
- [Tree (No Refresh)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/app.routes.ts#L80-L99)
  - [noRefreshTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-refresh/store/top/no-refresh-top-definition.const.ts)
  - [noRefreshLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-refresh/store/locations/no-refresh-locations-definition.ts)
  - [noRefreshDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-refresh/store/department/no-refresh-departments-definition.ts)
  - [noRefreshDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-refresh/store/department-children/no-refresh-department-children-definition.ts)
- [Tree (No Remove)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/app.routes.ts#L119-L137)
  - [noRemoveTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-remove/store/top/no-remove-top-definition.const.ts)
  - [noRemoveLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-remove/store/locations/no-remove-locations-definition.ts)
  - [noRemoveDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-remove/store/department/no-remove-departments-definition.ts)
  - [noRemoveDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-remove/store/department-children/no-remove-department-children-definition.ts)
- [Tree (No Dirty)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/app.routes.ts#L101-L118)
  - [noDirtyTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-dirty/store/top/no-dirty-top-definition.const.ts)
  - [noDirtyLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-dirty/store/locations/no-dirty-locations-definition.ts)
  - [noDirtyDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-dirty/store/department/no-dirty-departments-definition.ts)
  - [noDirtyDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo/src/app/routes/tree-no-dirty/store/department-children/department-child.selector.ts)

One thing you'll notice is that each of the routes points to the same tables in the end. This is so we can illustrate the various ways SmartNgRX can be used. In your application, you'd have one definition per table.
