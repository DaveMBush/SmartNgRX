import { Actions, FunctionalEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EffectService } from './effect-service';

/**
 * Shorthand for the type of the `Load` effect.
 */

export type LoadEffect<T> = FunctionalEffect<
  (
    actions$?: Actions<unknown>,
    actionService?: EffectService<T>,
  ) => Observable<Action>
>;
