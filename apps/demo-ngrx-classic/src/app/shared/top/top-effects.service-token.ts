import { InjectionToken } from '@angular/core';

import { TopEffectsService } from './top-effects.service';

export const topEffectsServiceToken = new InjectionToken<TopEffectsService>(
  'TopEffectsService',
);
