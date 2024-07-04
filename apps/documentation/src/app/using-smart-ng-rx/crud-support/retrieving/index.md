# Retrieving Rows

## Introduction

SmartNgRX expects every row within an entity that has children to have an array of IDs that point to the children. By using the `createSmartSelector` function, you will automatically get the children of the row you are retrieving when you access the array element. You will not need to dispatch any actions for this to happen. It will just work.

See the [Smart Selectors](/using-smart-ng-rx/smart-selectors) section for more information.

## Effects Service

What you will need to provide is the `EffectService` that will retrieve the rows from the server. You will need to implement the `loadByIds` method. This method will be called with the list of IDs the code has determined it does not yet have or have been marked as dirty and it needs to render on the screen some place.

Keep in mind that any time you access an array element directly, you will trigger the retrieval process for that row. This is by design. If you want to retrieve the ID and not the row, you can use the array's `rawArray` property. You might use this if you are iterating through the array for the purposes of virtual scrolling as we've done in the example code.

## Sample Code

Here is a sample implementation of a `loadByIds` method from the SmartNgRX Demo application:

```typescript
override loadByIds: (ids: string[]) => Observable<Location[]> = (
  ids: string[],
) => {
  return this.http.post<Location[]>(this.apiLocation, ids);
};
```

This code assumes that everything you need for the row is available from the server.

You might notice that we are using a POST instead of a GET to retrieve the data. If you prefer, you can use a GET. We've chosen to use a POST because we can send a list of IDs to the server and we want that list of IDs to be as large as needed and not limited by the URL size restrictions inherent in using GET.

## Retrieving the top level store

The obvious question you might ask is, "if everything has a parent, how can I retrieve the top level data?" The answer is that you can set the `isInitialRow` field to `true` in the entity definition. This is a special marker that tells SmartNgRX that this row has no parent and should be retrieved when the entity is loaded.

You'll need to specify the loadByIds method to retrieve the top level data. This will be the ids of the child fields you'll need to retrieve when the child data is requested.

In the demo project, we've created a `Top` Entity that has no parent.

Here is a typical `Top` entity definition from the demo project:

```typescript
export const standardTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  isInitialRow: true,
  defaultRow: (id) => ({
    id,
    locations: [],
    isDirty: false,
  }),
};
```

It will retrieve the locations ids. You can have your top level entity retrieve as many children as you need.

To select the locations, our code looks like this:

```typescript
// First we use a standard selector to retrieve the top entity
export const selectTopEntities = createSelector(selectTreeStandardState, (state) => {
  return state.top;
});

// then we use a smart selector to retrieve the top row and the locations
export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: 'tree-standard',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-standard',
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);

// Finally, we create a standard selector to pick the locations out of the
// top smart selector
export const selectLocations = createSelector(selectTopLocations, (tops) => {
  return (tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : []) as Location[];
});
```

By setting up the code in this way, you'll never have to dispatch an action to retrieve the top level data. This is all handled internally by SmartNgRX.
