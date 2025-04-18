import {
  BaseAdd,
  BaseChildDefinition,
  SmartNgRXRowBase,
} from '@smarttools/core';

import { replaceIdInParentsSignals } from './replace-id-in-parents-signals.function';

/**
 * Class responsible for adding rows to the store
 */
export class Add<T extends SmartNgRXRowBase> extends BaseAdd<T> {
  /**
   * replaces the id in the parent rows with the new id
   * this is used when we commit a new row to the server
   *
   * @param childDefinition the child definition that holds the parent information
   * @param id the id to replace
   * @param newId the new id to replace the old id with
   */
  override replaceIdInParent(
    childDefinition: BaseChildDefinition,
    id: string,
    newId: string,
  ): void {
    replaceIdInParentsSignals(childDefinition, id, newId);
  }
}
