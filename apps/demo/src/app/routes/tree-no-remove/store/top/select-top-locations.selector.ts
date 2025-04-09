import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { selectTopEntities } from './select-top-entities.selector';

export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    type: 'NgRX',
    childFeature: 'tree-no-remove',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-no-remove',
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);
