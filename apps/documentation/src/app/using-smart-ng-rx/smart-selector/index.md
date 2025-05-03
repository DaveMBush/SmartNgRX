# Smart Selector

And now, we can use the `ChildDefinitionClassic` interface to create a selector that will retrieve the child entity for the parent entity. We can use this selector in our components to retrieve the row(s) and their children from the store.

Note that the `createSmartSelector` function takes an array of `ChildDefinitionSignals` objects. This allows us to create a selector that will retrieve multiple child entities from the parent entity. That is, one row may point to multiple children. By passing the array you can account for each of them with one call.

In the case where your `User` row might have some child field named, `roles` your `createSmartSelector` call might look like this:

```typescript
export const selectUserChildren = createSmartSelector(selectUser, [
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

The first parameter to `createSmartSelector` expects a selector that returns the parent entity. If you want to use some other selector, you'll need to convert it to a selector that returns an Entity first. See [Using With Existing Selectors](../using-smart-ng-rx/using-with-existing-selectors) for more information.

While not absolutely necessary for SmartNgRX, it is best to chain smartSelectors together. That is, childSelectors should point to other smart selectors unless the childSelector has no children. In that case, it should be an entity selector.
