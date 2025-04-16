import { EntityAdapter } from '@ngrx/entity';

import { SmartEntityDefinition } from './smart-entity-definition.interface';
import { SmartNgRXRowBase } from './smart-ngrx-row-base.interface';

/**
 * We need a type that makes the entityAdapter field in SmartEntityDefinition
 * not optional once it has been provided by the code. This is that type.
 */
export type SmartValidatedEntityDefinition<Row extends SmartNgRXRowBase> =
  SmartEntityDefinition<Row> & { entityAdapter: EntityAdapter<Row> });
