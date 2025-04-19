import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';

export const noRemoveSignalsLocationsDefinition: SmartEntityDefinition<Location> =
  {
    entityName: 'locations',
    effectServiceToken: locationEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 0,
    },
    isSignal: true,
    defaultRow:
      function noRemoveLocationsDefaultRowFunctionLocationsDefaultRowFunction(
        id,
      ) {
        return {
          id,
          name: '',
          departments: [],
        };
      },
  };
