import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/smart-ngrx';

import { Top } from '../top/top.interface';

export type TopEntity = EntityState<SmartNgRXRowBase & Top>;
