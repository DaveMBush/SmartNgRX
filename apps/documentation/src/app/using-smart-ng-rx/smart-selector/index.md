# Smart Selector

And now, we can use the `ChildDefinition` interface to create a selector that will retrieve the child entity from the parent entity. We can use this selector in our components to retrieve the child entity from the store.

Note that the `createSmartSelector` function takes an array of `ChildDefinition` objects. This allows us to create a selector that will retrieve multiple child entities from the parent entity. That is, one row may point to multiple children. By passing the array you can account for each of them with one call.

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
