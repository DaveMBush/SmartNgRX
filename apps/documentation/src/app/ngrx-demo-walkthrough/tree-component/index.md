# Tree Component

Now that we have the selectors defined, the next step is to pass them into our component(s) so they can be used.

Each of our routes have a smart component that looks basically the same. So, once again, we'll look at the `Tree (Standard)` page to illustrate how we use the selectors and how we only retrieve the data we need as it is needed.

## Smart Component

At the route level, we create a smart component that retrieves the data from the selectors that we need.

The three selectors we need to pull our data from are, `selectLocations()`, `selectCurrentLocationId()`, and `selectCurrentLocation()`. The code is as you would expect and can be found in the [tree.component.ts](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/tree.component.ts) file.

You can look in the `ngOnInit()` method to see that we retrieve the data and set them to member variables.

Next, we [pass the data into our main `TreeComponent`](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/routes/tree-standard/tree.component.html) which is a dumb component that is responsible for displaying the data.

`locations` and `locationId` are used to populate the dropdown that allows us to pick the current location. The `location` is used to retrieve the data for the tree. Let's take a look at that next. The dropdown selector is relatively straightforward, so there is no real need to look at that in detail.

## Dumb Component

The common [TreeComponent](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree.component.html) is used to display the tree. You should notice that it is using the [cdk-virtual-scroll-viewport](https://material.angular.io/cdk/scrolling/overview) to provide virtual scrolling. This means that only the data that can be "seen" on the screen is rendered onto the screen. The tree uses the [mat-tree component](https://material.angular.io/components/tree/overview) to display the data using the [flat data](https://material.angular.io/components/tree/overview#flat-tree) method. This means that we need to convert our hierarchy of data into a flat list of data which we primarily do in [TreeComponentService.applyRange()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree-component.service.ts#L39-L78) and [TreeComponentService.transform()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree-component.service.ts#L80-L113)

`applyRange()` is responsible for kicking things off by determining which rows of information we need to display. It then calls `transform()` to convert the data from `locations` into a flat list of tree data.

Converting the nested data into a flat list is standard `mat-tree` code so, again, we won't spend a lot of time on this. However, what is interesting about this code is that we avoid triggering retrieval of the data by not access the array elements unless we need the data. If all we need is the ID, we use the [getIdAtIndex()](https://github.com/DaveMBush/SmartNgRX/blob/main/apps/demo-ngrx-classic/src/app/shared/components/tree/tree-component.service.ts#L194) method to just retrieve that.

And this is the magic of SmartNgRX. Once you retrieve the data directly from the element, SmartNgRX ends up calling the Effects Service you registered and retrieves the data from the server.

You'll also note that the `transform()` method is recursive to access the child elements of a node.
