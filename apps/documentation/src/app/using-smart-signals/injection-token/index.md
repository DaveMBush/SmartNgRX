# Injection Token

For each service, you'll need to create an Injection Token.

Continuing with the example of a `UserEffectsService`, we'll create an Injection Token for it.

```typescript
import { InjectionToken } from '@angular/core';

import { UserEffectsService } from './department-effects.service';

export const userEffectsServiceToken = new InjectionToken<UserEffectsService>('UserEffectsService');
```

Which we can use to register the service in our module:

```typescript
@NgModule({
  imports: [
    // ...
  ],
  providers: [
    // ...
    {
      provide: userEffectsServiceToken,
      useClass: UserEffectsService,
    },
    // ...
  ],
  // ...
})
export class SharedModule {}
```
