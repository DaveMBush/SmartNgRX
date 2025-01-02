import { EffectConfig } from '@ngrx/effects/src/models';

export const functionEffectNoDispatch: EffectConfig & {
  functional: true;
  dispatch: false;
} = {
  dispatch: false,
  functional: true,
} as const;
