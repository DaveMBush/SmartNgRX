import { SmartNgRXRowBase } from '@smarttools/smart-signals';

import { Location } from '../locations/location.interface';

export interface Top extends SmartNgRXRowBase {
  id: string;
  locations: Location[] | string[];
}
