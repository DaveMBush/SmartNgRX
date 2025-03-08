// jscpd:ignore-start
// intentionally duplicated.
import { createSmartSignal } from '@smarttools/smart-ngrx';

import { featureName } from '../../feature.const';
import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { selectTopEntities } from './select-top-entities.selectors';

export const selectTopLocations = createSmartSignal(selectTopEntities, [
  {
    childFeature: featureName,
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: featureName,
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);
// jscpd:ignore-end
