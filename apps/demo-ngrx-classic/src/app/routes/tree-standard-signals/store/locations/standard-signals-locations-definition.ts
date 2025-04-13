import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const standardSignalsLocationsDefinition: SmartEntityDefinition<Location> =
  {
    entityName: 'locations',
    effectServiceToken: locationEffectsServiceToken,
    isSignal: true,
    defaultRow: function standardLocationsDefaultRowFunction(id) {
      return {
        id,
        name: '',
        departments: [],
      };
    },
  };
