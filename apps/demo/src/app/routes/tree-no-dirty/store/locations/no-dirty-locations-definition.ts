import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const noDirtyLocationsDefinition: SmartEntityDefinition<Location> = {
  entityName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  markAndDelete: {
    markDirtyTime: -1,
  },
  defaultRow: function noDirtyLocationsDefaultRowFunction(id) {
    return {
      id,
      name: '',
      departments: [],
    };
  },
};
