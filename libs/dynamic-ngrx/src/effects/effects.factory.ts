import { inject, InjectionToken } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';

import { castTo } from '../common/cast-to.function';
import { actionFactory } from '../functions/action.factory';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { bufferAction } from './buffer-action.function';
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
    loadByIds: createEffect(
      (
        actions$ = inject(Actions),
        actionService = inject(effectServiceToken)
      ) => {
        return actions$.pipe(
          ofType(actions.loadByIds),
          bufferAction(),
          mergeMap((ids) => actionService.loadByIds(ids)),
          map((rows) => actions.loadByIdsSuccess({ rows }))
        );
      },
      { functional: true }
    ),
  });
};
