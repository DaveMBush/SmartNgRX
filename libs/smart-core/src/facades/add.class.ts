import { forNext, SmartNgRXRowBase } from '@smarttools/core';
import { map, Observable, of, timer } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError } from '../error-handler/handle-error.function';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { serviceRegistry } from '../registrations/service-registry.class';
import { EffectService } from '../types/effect-service';
import { FacadeBase } from './facade.base';
import { markParentsDirty } from '../../../smart-ngrx/src/facades/classic-ngrx.facade/mark-parents-dirty.function';
import { replaceIdInParents } from '../../../smart-ngrx/src/facades/classic-ngrx.facade/replace-id-in-parents.function';

/**
 * Class responsible for adding rows to the store
 */
export class Add<T extends SmartNgRXRowBase> {
  private feature!: string;
  private entity!: string;
  private selectId!: (row: T) => string;
  private effectService!: EffectService<T>;
  /**
   * constructor
   *
   * @param facade the facade to use when we need to access facade members.
   */
  constructor(private readonly facade: FacadeBase<T>) {
    this.feature = facade.feature;
    this.entity = facade.entity;
    this.selectId = facade.selectId;
  }

  /**
   * initialized the class
   */
  init(): void {
    const entityDefinition = entityDefinitionRegistry(
      this.feature,
      this.entity,
    );
    this.effectService = serviceRegistry.get<T>(
      entityDefinition.effectServiceToken,
    );
  }

  /**
   * adds a row to the store
   *
   * @param row the row to add
   * @param parentId the id of the parent row
   * @param parentService the service for the parent row
   */
  add(row: T, parentId: string, parentService: FacadeBase): void {
    const context = this;
    const actionPayload = {
      row,
      feature: this.feature,
      entity: this.entity,
      parentId,
      parentFeature: parentService.feature,
      parentEntityName: parentService.entity,
    };
    this.facade.upsertRow(actionPayload.row);

    this.effectService
      .add(actionPayload.row)
      .pipe(
        map(function addEffectMap(rows) {
          const successPayload = {
            oldRow: actionPayload.row,
            newRow: rows[0],
            feature: actionPayload.feature,
            entity: actionPayload.entity,
            parentId: actionPayload.parentId,
            parentFeature: actionPayload.parentFeature,
            parentEntityName: actionPayload.parentEntityName,
          };
          context.facade.upsertRow(successPayload.newRow);
          // we want the garbage collection to happen well after the parent has refreshed
          // so that the system doesn't insert a dummy record while it is still in the
          // parent's child array.
          context.scheduleGarbageCollection(successPayload.oldRow);
          const oldId = context.selectId(successPayload.oldRow);
          context.replaceIdInParents(oldId, successPayload.newRow.id);
        }),
        catchError(function addErrorHandler(
          error: unknown,
          __: Observable<void>,
        ) {
          return context.handleAddError(error, actionPayload);
        }),
        // self terminating subscription
      )
      .subscribe();
  }

  /**
   * schedules the garbage collection of the old row
   *
   * @param oldRow the old row to garbage collect
   */
  scheduleGarbageCollection(oldRow: T): void {
    const context = this;
    timer(1000).subscribe(function addSuccessEffectTimerSubscribe() {
      context.facade.remove([context.selectId(oldRow)]);
    });
  }

  /**
   * replaces the id in the parent rows with the new id
   * this is used when we commit a new row to the server
   *
   * @param id the id to replace
   * @param newId the new id to replace the old id with
   */
  replaceIdInParents(id: string, newId: string): void {
    const childDefinitions = childDefinitionRegistry.getChildDefinition(
      this.feature,
      this.entity,
    );
    forNext(
      childDefinitions,
      function replaceIdInParentsForNext(childDefinition) {
        replaceIdInParents(childDefinition, id, newId);
      },
    );
  }

  /**
   * Handles errors that occur during the add operation
   *
   * @param error The error that occurred
   * @param actionPayload The action payload object
   * @param actionPayload.parentFeature The feature of the parent entity
   * @param actionPayload.parentEntityName The name of the parent entity
   * @param actionPayload.parentId The ID of the parent entity
   * @returns An observable of null to continue the stream
   */
  private handleAddError(
    error: unknown,
    actionPayload: {
      parentFeature: string;
      parentEntityName: string;
      parentId: string;
    },
  ): Observable<null> {
    handleError('Error adding row, refreshing the parent row(s)', error);
    markParentsDirty(
      actionPayload.parentFeature,
      actionPayload.parentEntityName,
      [actionPayload.parentId],
    );
    return of(null);
  }
}
