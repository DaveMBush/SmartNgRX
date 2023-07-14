import { Actions, FunctionalEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EffectService } from './effect-service';

export interface EffectFactory<T> {
  load: FunctionalEffect<
    (
      actions$?: Actions<unknown>,
      actionService?: EffectService<T>
    ) => Observable<Action>
  >;
}
