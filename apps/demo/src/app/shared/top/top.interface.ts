import { SmartNgRXRowBase } from '@smart/smart-ngrx';

import { Location } from '../locations/location.interface';

export interface Top extends SmartNgRXRowBase {
  id: string;
  locations: Location[] | string[];
}
