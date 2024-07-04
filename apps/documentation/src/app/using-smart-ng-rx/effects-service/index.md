# Effects Service

The Effects Service is the service that an effect calls to perform CRUD operations against the server. You can put any code you want in this service as long as it supports the interface and achieves the stated purpose. This allows you to retrieve data from the server in whatever way you need.

To create an effect service, you'll need to inherit from the `EffectService` abstract class and implement the abstract methods. The `EffectService` abstract class is a generic class that takes the type of the entity as the generic type. This allows us to ensure that the methods you implement are returning the correct type.

```typescript
// user-effects.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx';

import { User } from './user.interface';

@Injectable()
export class UserEffectsService extends EffectService<User> {
  constructor(private http: HttpClient) {
    super();
  }

  override loadByIds: (ids: string[]) => Observable<User[]> = (ids: string[]) => {
    // retrieve the list of rows represented by the list of ids
  };

  override update(newRow: Department): Observable<Department[]> {
    // update the row on the server
  }

  // additional methods implemented here...
}
```

Because this will be used by an effect, and the effect needs some way of knowing what service to call, we need to have some way of passing the service down into the effect. The best way to do this is by passing in an `InjectionToken`
