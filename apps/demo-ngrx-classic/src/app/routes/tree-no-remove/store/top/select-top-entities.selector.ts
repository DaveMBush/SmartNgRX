import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Top } from '../../../../shared/top/top.interface';

export const selectTopEntities = createSmartSelector<Top>(
  'tree-no-remove',
  'top',
);
