import { EntityDefinition } from '@davembush/dynamic-ngrx/types/entity-definition.interface';

import { Location } from './location.interface';
import { locationEffectsServiceToken } from './location-effects.service-token';

export const locationsDefinition: EntityDefinition<Location> = {
  fieldName: 'locations',
  effectServiceToken: locationEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    departments: [],
    isDirty: false,
  }),
};
