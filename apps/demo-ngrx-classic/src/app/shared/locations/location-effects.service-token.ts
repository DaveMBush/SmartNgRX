import { InjectionToken } from '@angular/core';

import { LocationEffectsService } from './location-effects.service';

export const locationEffectsServiceToken =
  new InjectionToken<LocationEffectsService>('LocationEffectsService');
