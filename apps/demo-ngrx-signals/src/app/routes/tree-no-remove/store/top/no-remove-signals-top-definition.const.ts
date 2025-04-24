import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';

export const noRemoveSignalsTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  isInitialRow: true,
  markAndDelete: {
    markDirtyTime: 2 * 60 * 1000,
    removeTime: 0,
  },
  defaultRow: function noRemoveTopDefaultRowFunction(id) {
    return {
      id,
      locations: [],
    };
  },
};
