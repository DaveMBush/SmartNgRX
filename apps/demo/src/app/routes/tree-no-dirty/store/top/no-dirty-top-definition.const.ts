import { SmartEntityDefinition } from '@smart/smart-ngrx/types/smart-entity-definition.interface';

import { Top } from '../../../../shared/top/top.interface';
import { topEffectsServiceToken } from '../../../../shared/top/top-effects.service-token';

export const noDirtyTopDefinition: SmartEntityDefinition<Top> = {
  entityName: 'top',
  effectServiceToken: topEffectsServiceToken,
  markAndDelete: {
    markDirtyTime: -1,
  },
  defaultRow: (id) => ({
    id,
    locations: [],
    isDirty: false,
  }),
};
