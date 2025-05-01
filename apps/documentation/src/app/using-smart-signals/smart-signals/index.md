# Smart Signals

And now, we can use the `ChildDefinitionSignals` interface to create a "selector" that will retrieve the child entity for the parent entity. We can use this selector in our components to retrieve the row(s) and their children from the store.

Note that the `createSmartSignal` function takes an array of `ChildDefinitionSignals` objects. This allows us to create a signal that will retrieve multiple child entities from the parent entity. That is, one row may point to multiple children. By passing the array you can account for each of them with one call.

In the case where your `User` row might have some child field named, `roles` your `createSmartSignal` call might look like this:

```typescript
export const selectUserChildren = createSmartSignal(selectUser, [
  {
    childFeature: 'shared',
    childEntity: 'roles',
    parentField: 'roles',
    parentFeature: 'shared',
    parentEntity: 'users',
    childSelector: selectRoles,
  },
]);
```

The first parameter to `createSmartSignal` expects a signal that returns the parent entity. If you want to use some other selector, you'll need to convert it to a signal that returns an Entity first.

In order for smartSignals to work correctly, there are two conditions.

First, all the signals used in a SmartSignal must also be SmartSignals. If you need a signal that has no children, you can retrieve it by using the feature name and entity name:

```typescript
const rawSignal = createSmartSignal('feature', 'entity);
```

Secondly, signals need to be chained. That is, if you have an entity that has children that itself has children, each childSelector must point to the smart signal that retrieves the entities children.
