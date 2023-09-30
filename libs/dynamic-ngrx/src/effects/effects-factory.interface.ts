import { Actions, FunctionalEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EffectService } from './effect-service';
/**
 * This is the type information that effectsFactory returns.
 * @see `effectsFactory`
 * @see `EffectService`
 */
export interface EffectsFactory<T> {
  load: FunctionalEffect<
    (
      actions$?: Actions<unknown>,
      actionService?: EffectService<T>,
    ) => Observable<Action>
  >;
  loadByIds: FunctionalEffect<
    (
      actions$?: Actions<unknown>,
      actionService?: EffectService<T>,
    ) => Observable<Action>
  >;
}
