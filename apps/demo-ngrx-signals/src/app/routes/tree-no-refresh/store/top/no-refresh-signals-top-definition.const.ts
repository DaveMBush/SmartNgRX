import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';
import { markAndDelete } from '../mark-and-delete-init';

export const noRefreshSignalsTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  markAndDelete,
  isInitialRow: true,
  isSignal: true,
  defaultRow: function noRefreshTopFunction(id) {
    return {
      id,
      locations: [],
    };
  },
};
