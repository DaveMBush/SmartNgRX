import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const noDirtySignalsLocationsDefinition: SmartEntityDefinition<Location> =
  {
    entityName: 'locations',
    effectServiceToken: locationEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: -1,
    },
    isSignal: true,
    defaultRow: function noDirtyLocationsDefaultRowFunction(id) {
      return {
        id,
        name: '',
        departments: [],
      };
    },
  };
