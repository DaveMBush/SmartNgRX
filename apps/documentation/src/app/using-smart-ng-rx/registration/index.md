# Registration

Now that we have all the pieces in place, we can register our definitions with Smart NgRX so that they can be used by the library.

We register our definitions by feature. By making even your common NgRX entities feature specific, all your NgRX code looks the same and is easy to move to another feature as needed.

The following is how we would register our User entity with Smart NgRX:

```typescript
@NgModule({
  // ...
  providers: [provideSmartFeatureEntities('shared', [usersDefinition])],
  // ...
})
export class SharedModule {}
```

If there are other entities you want to register with this feature, you would add them to the array of entity definitions.
