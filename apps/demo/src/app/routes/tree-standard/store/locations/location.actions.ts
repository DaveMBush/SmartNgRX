import { actionFactory } from '@smarttools/smart-ngrx';

import { featureName } from '../../feature.const';

export const locationActions = actionFactory(featureName, 'locations');
