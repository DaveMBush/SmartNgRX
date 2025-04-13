import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/smart-ngrx';

import { Location } from '../locations/location.interface';

export type LocationEntity = EntityState<Location & SmartNgRXRowBase>;
