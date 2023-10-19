import { Actions, FunctionalEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EffectService } from './effect-service';

/**
 * Shorthand for the type of the `LoadById` effect.
 */
export type LoadByIdsEffect<T> = FunctionalEffect<
  (
    actions$?: Actions<unknown>,
    actionService?: EffectService<T>,
  ) => Observable<Action>
>;
