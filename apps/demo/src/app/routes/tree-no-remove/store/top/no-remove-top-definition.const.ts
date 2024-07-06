import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';

export const noRemoveTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  markAndDelete: {
    markDirtyTime: 2 * 60 * 1000,
    removeTime: 0,
  },
  isInitialRow: true,
  defaultRow: (id) => ({
    id,
    locations: [],
  }),
};
