// jscpd:ignore-start
// intentionally duplicated.
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Top } from '../../../../shared/top/top.interface';

export const selectTopEntities = createSmartSelector<Top>(
  'tree-no-dirty',
  'top',
);
// jscpd:ignore-end
