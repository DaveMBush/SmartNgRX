import { SmartEntityDefinition } from '@smart/smart-ngrx/types/smart-entity-definition.interface';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const noDirtyLocationsDefinition: SmartEntityDefinition<Location> = {
  entityName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  markAndDelete: {
    markDirtyTime: -1,
  },
  defaultRow: (id) => ({
    id,
    name: '',
    departments: [],
    isDirty: false,
  }),
};
