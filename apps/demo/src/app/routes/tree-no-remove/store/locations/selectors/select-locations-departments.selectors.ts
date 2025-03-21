import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentsChildren } from '../../department/select-departments-children.selectors';
import { selectLocationEntities } from './select-location-entities.selectors';

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      type: 'NgRX',
      childFeature: 'tree-no-remove',
      childEntity: 'departments',
      parentFeature: 'tree-no-remove',
      parentEntity: 'locations',
      parentField: 'departments',
      childSelector: selectDepartmentsChildren,
    },
  ],
);
