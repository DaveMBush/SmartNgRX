# Entity Registration

Now that we have all the pieces in place, we can register our definitions with Smart Signals so that they can be used by the library.

We register our definitions by feature. We are only using features here to be consistent with SmartNgRX. Features have no active impact to how state is created in your signals.

The following is how we would register our User entity as part of the `shared` feature with Smart NgRX:

```typescript
@NgModule({
  // ...
  providers: [provideSmartFeatureSignalsEntities('shared', [usersDefinition])],
  // ...
})
export class SharedModule {}
```

Remember, we defined `usersDefinition` earlier in the [Entity Definitions](/using-smart-signals/entity-definitions) section.

If there are other entities you want to register with this feature, you would add them to the array of entity definitions.
