import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../../../tree-no-remove/store/locations/selectors/select-locations-departments.selectors';
import { selectTopEntities } from './select-top-entities.selectors';

export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: 'tree-no-refresh',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-no-refresh',
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);
