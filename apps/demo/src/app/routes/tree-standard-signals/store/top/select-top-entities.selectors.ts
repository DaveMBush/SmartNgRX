import { createSmartSignal } from '@smarttools/smart-ngrx';

import { Top } from '../../../../shared/top/top.interface';

export const selectTopEntities = createSmartSignal<Top>('treeStandardSignals', 'top');
