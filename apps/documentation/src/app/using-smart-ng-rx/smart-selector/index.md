# Smart Selector

And now, we can use the `ProxyChild` interface to create a selector that will retrieve the child entity from the parent entity. We can use this selector in our components to retrieve the child entity from the store.

Note that the `createSmartSelector` function takes an array of `ProxyChild` objects. This allows us to create a selector that will retrieve multiple child entities from the parent entity. That is, one row may point to multiple children. By passing the array you can account for each of them with one call.

In the case where your `User` row might have some child field named, `roles` your `createSmartSelector`` call might look like this:

```typescript
export const selectUserChildren = createSmartSelector<Location>(selectUser, [
  {
    childFeature: 'shared',
    childFieldName: 'roles',
    parentFieldName: 'roles',
    childSelector: castTo<MarkAndDeleteSelector>(selectRoles),
  },
]);
```

For now, the first parameter to `createSmartSelector` expects a selector that returns the parent entity. Eventually, we'd like for this parameter to accept any valid selector it can be used with existing code that does not use NgRX Entities.
