# Retrieving Rows

## Introduction

SmartSignals expects every row within an entity that has children to have an array of IDs that point to the children. By using the `createSmartSignal` function, you will automatically get the children of the row you are retrieving when you access the array element. You will not need to dispatch any actions for this to happen. It will just work.

See the [Smart Signals](using-smart-signals/smart-signals) section for more information.

## Effects Service

What you will need to provide is the `EffectService` that will retrieve the rows from the server. You will need to implement the `loadByIds` method, which will be called with the list of IDs the code has determined it does not yet have or have been marked as dirty and it needs to render on the screen some place.

Keep in mind that any time you access an array element directly, you will trigger the retrieval process for that row. This is by design. If you want to retrieve the ID and not the row, you can use the array's `getIdAtIndex` method. You might use this if you are iterating through the array for the purposes of virtual scrolling as we've done in the example code.

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

The obvious question you might ask is, "if everything has a parent, how can I retrieve the top level data?" The answer is that you can set the `isInitialRow` field to `true` in the entity definition. This is a special marker that tells Smart Signals that this row has no parent and should be retrieved when the entity is loaded.

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
// First we retrieve the top entity from Smart Signals
export const selectTopEntities = createSmartSignal<Top>(featureName, 'top');

// then we use a smart signal to retrieve the top row and the locations
export const selectTopLocations = createSmartSignal(selectTopEntities, [
  {
    childFeature: featureName,
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: featureName,
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);

// Finally, we create a function that returns a computed to get the
// list of locations
export function selectLocations(): Signal<Location[]> {
  return computed(function selectLocationsFunction() {
    const tops = selectTopLocations();
    // Instead of directly accessing .locations, we should get the full entity
    // which will trigger the smart signal chain
    if (tops.ids.length === 1) {
      const topEntity = tops.entities[tops.ids[0]];
      if (topEntity && topEntity.locations.length > 0 && typeof topEntity.locations[0] === 'object') {
        // This will now use the smart signal chain through selectLocationsDepartments
        return topEntity.locations as Location[];
      }
    }
    return [] as Location[];
  });
}
```

The reason we create a function that returns a `computed()` signal is to avoid creating the signal at startup. Using the function delays creating the computed signal until we call the function it is in.
