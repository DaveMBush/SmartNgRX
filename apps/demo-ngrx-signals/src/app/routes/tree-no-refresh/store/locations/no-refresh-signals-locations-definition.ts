import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Location } from '../../../../shared/locations/location.interface';
import { locationEffectsServiceToken } from '../../../../shared/locations/location-effects.service-token';
import { markAndDelete } from '../mark-and-delete-init';
export const noRefreshSignalsLocationsDefinition: SmartEntityDefinition<Location> =
  {
    entityName: 'locations',
    effectServiceToken: locationEffectsServiceToken,
    markAndDelete,
    defaultRow: function noRefreshLocationsDefaultRowFunction(id) {
      return {
        id,
        name: '',
        departments: [],
      };
    },
  };
