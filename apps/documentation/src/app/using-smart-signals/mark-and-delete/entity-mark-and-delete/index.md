# Entity Mark and Delete

For many cases, the global Mark and Delete configuration will be sufficient. But there are times when you need to override the global configuration for a specific entity. For example, you may want to use the general `markDirtyTime` but for some entities you want to load them and keep them in memory. Lookup tables are a place where you might consider this.

To override the global configuration, you can pass in a `MarkAndDeleteInit` object as part of the `provideSmartFeatureSignalEntities` call when you register an entity. This will override the global configuration for the entity.

```typescript
export const lookupTable: SmartEntityDefinition<LookupTable>  = {
  entityName: 'lookupTable',
  effectServiceToken: lookupTableEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    ..., // other fields
    isDirty: false,
  }),
  markAndDelete: {
    markDirtyTime: -1,
    removeTime: 0,
    markAndDeleteFetchesNew: false,
  },
};
```

```typescript
providers: [
  ..., // other providers
  provideSmartFeatureEntities('shared', [
    locationsDefinition,
    departmentsDefinition,
    departmentChildrenDefinition,
    lookupTable,
  ]),
]
```
