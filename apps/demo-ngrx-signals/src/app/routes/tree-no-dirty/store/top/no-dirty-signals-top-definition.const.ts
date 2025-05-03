import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';

export const noDirtySignalsTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  markAndDelete: {
    markDirtyTime: -1,
  },
  isInitialRow: true,
  defaultRow: function noDirtyTopDefaultRowFunction(id) {
    return {
      id,
      locations: [],
    };
  },
};
