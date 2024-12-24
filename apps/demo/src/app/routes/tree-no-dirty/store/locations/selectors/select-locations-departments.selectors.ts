import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentsChildren } from '../../department/select-departments-children.selectors';
import { selectLocationEntities } from './select-location-entities.selectors';

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-no-dirty',
      childEntity: 'departments',
      parentFeature: 'tree-no-dirty',
      parentEntity: 'locations',
      parentField: 'departments',
      childSelector: selectDepartmentsChildren,
    },
  ],
);
