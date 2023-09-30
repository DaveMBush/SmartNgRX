import { InjectionToken } from '@angular/core';

import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { Location } from './location.interface';
import { LocationEffectsService } from './location-effects.service';

export const locationEffectsServiceToken =
  new InjectionToken<LocationEffectsService>('SprintFolderEffectsService');

export const locationEffects = effectsFactory<'Location', Location>(
  'Location',
  locationEffectsServiceToken
);
