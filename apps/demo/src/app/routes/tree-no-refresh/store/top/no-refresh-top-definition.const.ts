import { SmartEntityDefinition } from '@smart/smart-ngrx';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';

export const noRefreshTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  markAndDelete: {
    markDirtyFetchesNew: false,
    markDirtyTime: 2 * 60 * 1000,
    removeTime: 4 * 60 * 1000,
  },
  isInitialRow: true,
  defaultRow: (id) => ({
    id,
    locations: [],
  }),
};
