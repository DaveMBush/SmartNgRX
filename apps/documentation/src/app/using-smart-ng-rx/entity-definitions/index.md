# Entity Definitions

As mentioned earlier, most of NgRX is hidden from you by SmartNgRX. The first API that allows us to do this is the `provideSmartFeatureClassicEntities` function. This is a functional provider that allows us to register all the entities for a feature.

We've found that the best way to use this provider is to create the entity definitions as objects in a separate file that we import into the location we want to register the entities. Each object would live with the entity code it represents. For example, if we have a `User` entity, we would create a `users-definition.ts` file that would contain the entity definition. We would then import that file into the module file where our `provideSmartFeatureClassicEntities` function is located so we can register the entity.

Let's take a look at an example. In this example, we'll create a `users-definition.ts` file that contains the entity definition for the `User` entity. We'll then import that file into the `users.module.ts` file so we can register the entity.

```typescript
// users-definition.ts
import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { User } from './user.interface';
import { userEffectsServiceToken } from './user-effects.service-token';

export const usersDefinition: SmartEntityDefinition<User> = {
  entityName: 'users',
  effectServiceToken: userEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    children: [],
  }),
};
```

As outlined in the `SmartEntityDefinition` interface, we need to provide the following information:

## entityName

The field name that you'd usually use in the reducer object you'd use in `StoreModule.forFeature(featureName, reducer)` OR the name you'd use in `provideState(featureName, reducer)`.

We also use this name along with the feature as the `Source` field in actions but this should not matter to you because you'll either be using actions we've created or using your own actions for your specific purposes.

If you think of this as the name of the NgRX entity, you'll be fine.

## effectServiceToken

The Injection Token for the Effect Service that will be used by the entity. This is the service that the effect will call to perform CRUD operations against the server.

## defaultRow

A function that returns a default row for the entity. This is used by the reducer to create a new row when the `addToStore` method on the `ArrayProxy` is dispatched. The function takes an `id` parameter that is the id of the row that is being created. This is useful if you need to create a row that has a reference to the id of the row that is being created.

## Optional Fields

You can also provide the following optional fields as your needs dictate:

### selectId

This field points to a function that returns the ID, as a string, for the row passed.

### markAndDelete

This provides configuration information for the mark and delete feature that we will cover later.

### isInitialRow

Set this field to true if this is a top level row. Top level rows are used as a mechanism to retrieve data from the server without having a parent row, typically used to retrieve the top level of entities your application needs.
