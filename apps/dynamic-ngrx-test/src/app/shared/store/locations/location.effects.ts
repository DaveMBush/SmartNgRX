import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { Location } from './location.interface';
import { locationEffectsServiceToken } from './location-effects.service-token';

export const locationEffects = effectsFactory<'Location', Location>(
  'Location',
  locationEffectsServiceToken,
);
