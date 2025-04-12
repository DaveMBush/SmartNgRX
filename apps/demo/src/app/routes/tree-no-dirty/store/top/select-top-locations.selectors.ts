import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { selectTopEntities } from './select-top-entities.selectors';

export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: 'tree-no-dirty',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-no-dirty',
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);
