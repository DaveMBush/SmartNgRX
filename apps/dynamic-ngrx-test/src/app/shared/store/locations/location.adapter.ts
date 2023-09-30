import { createEntityAdapter } from '@ngrx/entity';

import { Location } from './location.interface';

export const locationAdapter = createEntityAdapter<Location>();
