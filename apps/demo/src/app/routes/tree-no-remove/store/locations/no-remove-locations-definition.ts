import { SmartEntityDefinition } from '@smart/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const noRemoveLocationsDefinition: SmartEntityDefinition<Location> = {
  entityName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  markAndDelete: {
    markDirtyTime: 2 * 60 * 1000,
    removeTime: 0,
  },
  defaultRow: (id) => ({
    id,
    name: '',
    departments: [],
    isDirty: false,
  }),
};
