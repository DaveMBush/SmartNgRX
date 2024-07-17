import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const standardVirtualLocationsDefinition: SmartEntityDefinition<Location> = {
  entityName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    departments: [],
  }),
};
