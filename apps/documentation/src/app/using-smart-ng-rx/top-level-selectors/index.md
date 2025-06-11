# Top Level Selectors

In the discussion about [Entity Definitions](using-smart-ng-rx/entity-definitions), we briefly mentioned the optional field `isInitialRow`. Also known as a top level row.

Here's the problem we are solving with top level rows. Most of SmartNgRX assumes that every row could have child rows. But the quandary we have is, how do we get our initial set of children? This is what our top level rows are for.

To set this up, you'll need to configure the Entity Definition for the table using `isInitialRow` set to `true`.

Then you'll need to setup some selectors.

The first selector you'll need to setup allows you to gain access to the top level selector in a way that will allow us to automatically fetch the data when we try to access the first and only row.

```typescript
export const selectTopEntities = createSmartSelector<Top>('tree-standard', 'top');
```

Where `tree-standard` is the feature and `top` is the name of the entity.

To wire the top entity and the children to SmartNgRX, you'll use code similar to the following:

```typescript
export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: featureName,
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: featureName,
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);
```

This is typical smart selector code that defines the parent child relationship. In this case, 'top' refers to our top level entity that has only one row and 'locations' refers to, in this case, the children that are related to top. Keep in mind any parent can have no children or multiple children. The same is true here.

We aren't quite done yet. Now we need a way to force the retrieval of the above two selectors so that we automatically retrieve the children. In this case, the locations.

The following code does this for us.

```typescript
export const selectLocations = getTopChildRows<Top, Location>(selectTopLocations, 'locations');
```

If you are tracking along, you'll know that `selectTopLocations` refers to the selector we just discussed. `locations` refers to the child field in our top level entity. Under the hood, this code tries to access the one and only row that is in our top level entity. Because it doesn't exist, it will call the service the corresponds to our top level entity and will retrieve the one and only row. This has the child IDs and when we try to access them, SmartNgRX will turn them into rows for you automatically.
