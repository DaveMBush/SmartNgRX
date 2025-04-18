import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const standardLocationsDefinition: SmartEntityDefinition<Location> = {
  entityName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  defaultRow: function standardLocationsDefaultRowFunction(id) {
    return {
      id,
      name: '',
      departments: [],
    };
  },
};
