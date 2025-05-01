# Smart Signals (Selectors)

From an NgRX perspective, once you've configured your global provider and your feature providers, and created the Effects Services to retrieve your data, the only NgRX thing you'll need to concern yourself with are the selectors. In the case of SmartSignals, these are actually computed signals created by Smart Signals. And, even these aren't quite what you are used to because we've abstracted them as well. You'll still need to use standard Signals, using NgRX Signals or Angular Signals, for other state management tasks, such as storing form data like we do in the demo application to store the currently selected location.

We won't go into much detail here because this is standard NgRX code. But you can see the code for getting the current location in [current-location](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/current-location) folder.

Since all of our selectors look the same except for the feature store they are getting the data from, we'll focus our time on the selectors for the [Tree (Standard)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard) page.

## Top Selectors

The main selector in our top selector is [selectTopLocations](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/top/select-top-locations.selectors.ts) you'll see that it uses `selectTopEntities` as the first parameter which is used to retrieve the top entity slice from the feature. The second parameter is the array of `ChildDefinition`s which has just one item because the list of IDs we will use to retrieve the locations is the`locations` field.

Two things you'll want to pay special attention to. We are passing in pointers to the signals, not the signals. The signals get executed inside `createSmartSelector()`. Also, you'll want to pass in the child selector that was created using another smart selector that resolves its children if there are any.

In this case, passing the childSelector `selectLocations` would not work, we want to pass in `selectLocationsDepartments` instead.

## Current Location Signal

The [currentLocationSignal](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/current-location/select-current-location.signal.ts) simply pulls out the currently selected location ID from the state.

## Location Selectors

The [Location Selectors](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/locations/selectors) holds selectors that will give us access to the locations.

Once again, we see our `createSmartSelector()` being used to retrieve the locations and the children of the locations. In this case, the departments. It takes our `selectLocationEntities` as the first parameter and the array of `ChildDefinition`s as the second parameter.

## Department Selectors

And so we continue down the stack and everything starts to look the same. The [Department Selectors](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/department) folder has the `selectDepartments()` selector that is used to retrieve the department entities and the `selectDepartmentsChildren()` select that is used to define how to access the department children.

## Department Children Selectors

And finally we come to the bottom of the tree where the only thing left to do is to select the [department children](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-signals/src/app/routes/tree-standard/store/department-children).

## Conclusion

Notice how coming from the top, we combine selectors until we've retrieved all the data we need to create the tree. Next, we'll show how we only retrieve the data we need as it is needed. This is one of the main features of SmartSignals. We don't retrieve everything all at once.
