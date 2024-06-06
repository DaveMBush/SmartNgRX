# Using With Existing Selectors

You may have noticed that `createSmartSelector` only accepts a parent selector that returns an entity type. But what if you have existing selectors you need to integrate with SmartNgRX that return a different type?

For this, you'll need an adapter function that converts the output of your existing selector to the entity type. Here's an example:

```typescript
export function createRowsToEntitySelector<RowType extends object>(
  originalSelector: MemoizedSelector<object, RowType[]>, idField: string):
    MemoizedSelector<object, EntityState<RowType>, (s1: RowType[]) =>
      EntityState<RowType>> {
  const emptyEntityState: EntityState<RowType> = { ids: [], entities: {} };
  return createSelector(originalSelector, (rows: RowType[]) =>
    rows.reduce<EntityState<RowType>>((acc, row) => {
      const id = castTo<Dictionary<number | string>>(row)[idField]!;
      return { ids: [...acc.ids, id], entities: { ...acc.entities, [id]: row } }
        as EntityState<RowType>;
    }, emptyEntityState)
  );
}
```

There are other ways you might achieve your goals, but this is a simple and effective way of creating a reusable adapter function that you can use to convert any selector that returns an array of objects to an entity state.

This assumes the rows you are passing in are flat other than the child arrays which should ONLY be string arrays. If you have nested objects or arrays, you can still use this function but only the row itself and child array items as expected by SmartNgRX will be something you can use as though it were a SmartNgRX entity.

If your current data is nested, you might consider using a library like Normalizr (unmaintained) or [one of the alternatives](https://alternativeto.net/software/normalizr/) to flatten your data.

You may need to adjust the function to suit your specific needs which is why we have not included this adapter in the library itself.
