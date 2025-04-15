import { createSmartSignal } from '@smarttools/smart-signals';

import { Top } from '../../../../shared/top/top.interface';
import { featureName } from '../../feature.const';
export const selectTopEntities = createSmartSignal<Top>(featureName, 'top');
