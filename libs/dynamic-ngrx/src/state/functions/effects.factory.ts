import { inject, InjectionToken } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { actionFactory } from './action.factory';
import { StringLiteralSource } from './string-literal-source.type';
import { EffectService } from './effect-service.interface';
export const effectsFactory = <Source extends string, T>(
  source: StringLiteralSource<Source>,
  effectServiceToken: InjectionToken<EffectService<T>>) => {
  const actions = actionFactory<Source, T>(source);
  return { load: createEffect(
    (actions$ = inject(Actions), actionService = inject(effectServiceToken)) => {
      if(!actionService) {
        throw Error('actionService is undefined when retrieving from registry')
      }
      return actions$.pipe(
        ofType(actions.load),
        switchMap(() => actionService.load()),
        map((payload) => actions.loadSuccess({ payload })),
      );}, {functional: true }
  )};
}
