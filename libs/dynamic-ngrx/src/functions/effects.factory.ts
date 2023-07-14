/* eslint-disable @typescript-eslint/no-explicit-any -- any is necessary */
import { inject, InjectionToken } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { actionFactory } from './action.factory';
import { castTo } from './cast-to.function';
import { EffectFactory } from './effect-factory.interface';
import { EffectService } from './effect-service';

export const effectsFactory = <Source extends string, T>(
  source: StringLiteralSource<Source>,
  effectServiceToken: InjectionToken<EffectService<T>>
): EffectFactory<T> => {
  const actions = actionFactory<Source, T>(source);
  return castTo<EffectFactory<T>>({
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
  });
};
