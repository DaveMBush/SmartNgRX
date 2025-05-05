# Selectors

From an NgRX perspective, once you've configured your global provider and your feature providers, and created the Effects Services to retrieve your data, the only NgRX thing you'll need to concern yourself with are the selectors. And, even these aren't quite what you are used to because we've abstracted them as well. You'll never create an Effect, Action or Reducer for CRUD operations again. You'll still need to use standard NgRX for other state management tasks, such as storing form data like we do in the demo application to store the currently selected location.

We won't go into much detail here because this is standard NgRX code. But you can see the current location actions, effects, and reducers in any of the [current-location](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/current-location) folders.

One thing we will point out that might look strange to some of you is that we use an effect to listen for new data being set for the locations so we can determine a default action when new data comes in as a way to get around a problem we've had with the Angular Material mat-selector. It exists simply to delay setting the current location.

Since all of our selectors look the same except for the feature store they are getting the data from, we'll focus our time on the selectors for the [Tree (Standard)](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard) page.

## Feature Selectors

All our feature selectors for a route are located in the same folder, [tree-standard-state.selectors.ts](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/selectors). Notice there are two. One for the state that uses standard NgRX and one for the state that uses SmartNgRX.

## Top Selectors

The main selector in our top selector is [selectTopLocations](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/top/select-top-locations.selectors.ts) you'll see that it uses `selectTopEntities()` as the first parameter which is used to retrieve the top entity slice from the feature. The second parameter is the array of `ChildDefinition`s which has just one item because the list of IDs we will use to retrieve the locations is the`locations` field.

## Current Location Selectors

The [selectCurrentLocationId](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/current-location/select-current-location.selector.ts) simply pulls out the currently selected location ID from the state.

## Location Selectors

The [Location Selectors](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/locations/selectors) holds selectors that will give us access to the locations and the selected location.

Once again, we see our `createSmartSelector()` being used to retrieve the locations and the children of the locations. In this case, the departments. It takes our `selectLocationEntities()` as the first parameter and the array of `ChildDefinition`s as the second parameter.

The other select we need here is the one that provides the currently selected location. This standard NgRX selector uses the `selectLocationDepartments()` and `selectCurrentLocationId()` we've already covered as parameter and then uses those to return the selected location, if it exists. Otherwise it returns a default location that has no departments.

## Department Selectors

And so we continue down the stack and everything starts to look the same. The [Department Selectors](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/department) folder has the `selectDepartments()` selector that is used to retrieve the department entities and the `selectDepartmentsChildren()` select that is used to define how to access the department children.

## Department Children Selectors

And finally we come to the bottom of the tree where the only thing left to do is to select the [department children](https://github.com/DaveMBush/SmartNgRX/tree/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/store/department-children).

## Conclusion

Notice how coming from the top, we combine selectors until we've retrieved all the data we need to create the tree. Next, we'll show how we only retrieve the data we need as it is needed. This is one of the main features of SmartNgRX. We don't retrieve everything all at once.
