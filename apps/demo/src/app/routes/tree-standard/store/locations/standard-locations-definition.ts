import { SmartEntityDefinition } from '@smart/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const standardLocationsDefinition: SmartEntityDefinition<Location> = {
  entityName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    departments: [],
    isDirty: false,
  }),
};
