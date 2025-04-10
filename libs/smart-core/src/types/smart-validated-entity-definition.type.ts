import { EntityAdapter } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/core';

import { SmartEntityDefinition } from '../../../smart-ngrx/src/types/smart-entity-definition.interface';

/**
 * We need a type that makes the entityAdapter field in SmartEntityDefinition
 * not optional once it has been provided by the code. This is that type.
 */
export type SmartValidatedEntityDefinition<Row extends SmartNgRXRowBase> =
  SmartEntityDefinition<Row> &
    (SmartEntityDefinition<Row>['isSignal'] extends true
      ? Record<string, never>
      : { entityAdapter: EntityAdapter<Row> });
