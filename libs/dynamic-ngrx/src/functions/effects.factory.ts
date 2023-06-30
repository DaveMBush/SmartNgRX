/* eslint-disable @typescript-eslint/no-explicit-any -- any is necessary */
import { inject, InjectionToken } from '@angular/core';
import { Actions, createEffect, FunctionalEffect, ofType } from '@ngrx/effects';
import { map, Observable, switchMap } from 'rxjs';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { actionFactory } from './action.factory';
import { EffectService } from './effect-service';

export const effectsFactory = <Source extends string, T>(
  source: StringLiteralSource<Source>,
  effectServiceToken: InjectionToken<EffectService<T>>
): {
  load: FunctionalEffect<
    (
      actions$?: Actions<any>,
      actionService?: EffectService<T>
    ) => Observable<any>
  >;
} => {
  const actions = actionFactory<Source, T>(source);
  return {
    load: createEffect(
      (
        actions$ = inject(Actions),
        actionService = inject(effectServiceToken)
      ) => {
        return actions$.pipe(
          ofType(actions.load),
          switchMap(() => actionService.load()),
          map((rows) => actions.loadSuccess({ rows }))
        );
      },
      { functional: true }
    ),
  };
};
