// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { featureName } from '../../../feature.const';
import { selectDepartmentsChildren } from '../../department/select-departments-children.selector';
import { selectLocationEntities } from './select-location-entities.selectors';
export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: featureName,
      childEntity: 'departments',
      parentField: 'departments',
      parentFeature: featureName,
      parentEntity: 'locations',
      childSelector: selectDepartmentsChildren,
    },
  ],
);
// jscpd:ignore-end
