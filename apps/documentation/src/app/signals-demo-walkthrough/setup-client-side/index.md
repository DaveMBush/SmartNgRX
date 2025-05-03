# Setup Client Side

Now that you've had a look at the data we are working with, let's take a look at how to get that data into our client code.

## Global Registration

As you may remember from our [Global Registration](/using-smart-signals/global-registration) documentation, the first thing we need to do is to provide a global registration in our `app.module.ts` file directly or indirectly. Because we use standalone components for our App component, we put this code in our `app.config.ts` file.

Simply add the `provideSmartNgRX` function to the providers array like we've done in [apps/demo-ngrx-signals/src/app/app.config.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/app.config.ts#L74)

## Entity Registration

The next step we covered in our documentation was [Entity Registration](/using-smart-signals/entity-registration) which registers the features and entities that we want to use in our application.

As we mentioned in the [Introduction](/signals-demo-walkthrough/introduction), each of the tabs in our application follow a separate strategy. We also store state for the currently selected `location` using a standard NgRX slice. Not everything is suitable for SmartSignals.

You can view the registration code for each of the tabs in the following locations. I'm providing links to the providers section and under each of those links, links to the entity definitions they reference

- [Tree (Standard)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/app.routes.ts#L35-L50)
  - [standardSignalsTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/top/standard-signals-top-definition.const.ts)
  - [standardSignalsLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/locations/standard-signals-locations-definition.ts)
  - [standardSignalsDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/department/standard-signals-departments-definition.ts)
  - [standardSignalsDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/department-children/standard-signals-department-children-definition.ts)
- [Tree (No Refresh)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/app.routes.ts#L51-L66)
  - [noRefreshSignalsTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-refresh/store/top/no-refresh-signals-top-definition.const.ts)
  - [noRefreshSignalsLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-refresh/store/locations/no-refresh-signals-locations-definition.ts)
  - [noRefreshSignalsDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-refresh/store/department/no-refresh-signals-departments-definition.ts)
  - [noRefreshSignalsDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-refresh/store/department-children/no-refresh-signals-department-children-definition.ts)
- [Tree (No Remove)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/app.routes.ts#L67-L82)
  - [noRemoveSignalsTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-remove/store/top/no-remove-signals-top-definition.const.ts)
  - [noRemoveSignalsLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-remove/store/locations/no-remove-signals-locations-definition.ts)
  - [noRemoveSignalsDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-remove/store/department/no-remove-signals-departments-definition.ts)
  - [noRemoveSignalsDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-remove/store/department-children/no-remove-signals-department-children-definition.ts)
- [Tree (No Dirty)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/app.routes.ts#L83-L98)
  - [noDirtySignalsTopDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-dirty/store/top/no-dirty-signals-top-definition.const.ts)
  - [noDirtySignalsLocationsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-dirty/store/locations/no-dirty-signals-locations-definition.ts)
  - [noDirtySignalsDepartmentsDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-dirty/store/department/no-dirty-signals-departments-definition.ts)
  - [noDirtySignalsDepartmentChildrenDefinition](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-no-dirty/store/department-children/no-dirty-signals-department-children-definition.ts)

One thing you'll notice is that each of the routes points to the same tables in the end. This is so we can illustrate the various ways SmartNgRX can be used. In your application, you'd have one definition per table.
