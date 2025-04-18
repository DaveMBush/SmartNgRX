import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/smart-signals';

import { Top } from '../top/top.interface';

export type TopEntity = EntityState<SmartNgRXRowBase & Top>;
