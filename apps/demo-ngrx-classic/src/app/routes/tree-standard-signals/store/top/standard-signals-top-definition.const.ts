import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';

export const standardSignalsTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  isInitialRow: true,
  isSignal: true,
  defaultRow: function defaultRowFunction(id) {
    return {
      id,
      locations: [],
    };
  },
};
