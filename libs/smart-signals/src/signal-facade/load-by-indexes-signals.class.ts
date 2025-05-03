// jscpd:ignore-start
// this is similar to the classic NgRX version
// but it is unique enough that we can't
// combine without tightly coupling the two
// which will end up in separate libraries.
import {
  bufferIndexes,
  entityDefinitionRegistry,
  facadeRegistry,
  forNext,
  IndexProp,
  newRowRegistry,
  PartialArrayDefinition,
  serviceRegistry,
  SmartNgRXRowBase,
  VirtualArrayContents,
} from '@smarttools/smart-core';
import { map, Subject, switchMap } from 'rxjs';

import { SignalsFacade } from './signals-facade';

/**
 * This class is used to manage loading the child ids by
 * their location in the array.
 */
export class LoadByIndexesSignals<T extends SmartNgRXRowBase> {
  private loadByIndexesSubject = new Subject<IndexProp>();
  private feature: string;
  private entity: string;

  /**
   * The constructor for the LoadByIndexes class.
   *
   * @param facade the facade that called this class
   */
  constructor(private facade: SignalsFacade<T>) {
    this.feature = facade.feature;
    this.entity = facade.entity;
  }

  /**
   * Initializes the service with the actions and starts the dispatcher.
   */
  init(): void {
    this.loadByIndexesDispatcher();
  }

  /**
   * que up loading the ids for the indexes
   *
   * @param parentId the id of the parent row
   * @param childField the child field to load
   * @param index the index to load
   */
  loadByIndexes(parentId: string, childField: string, index: number): void {
    this.loadByIndexesSubject.next({
      parentId,
      childField,
      index,
    });
  }

  /**
   * Dispatches the loadByIndexes action after buffering the indexes.
   */
  loadByIndexesDispatcher(): void {
    const feature = this.feature;
    const entity = this.entity;
    this.loadByIndexesSubject
      .pipe(
        bufferIndexes(),
        switchMap(function loadByIndexesSwitchMap({
          parentId,
          childField,
          indexes,
        }) {
          // User reduce to find the min and max because spread can fail
          // with large arrays.
          const min = indexes.reduce(function reduceMin(a, b) {
            return Math.min(a, b);
          }, indexes[0]);
          const max = indexes.reduce(function reduceMax(a, b) {
            return Math.max(a, b);
          }, indexes[0]);
          const effectService = serviceRegistry.get(
            entityDefinitionRegistry(feature, entity).effectServiceToken,
          );
          return (
            effectService
              .loadByIndexes(parentId, childField, min, max - min + 1)
              // nested pipe to get access to actionProps
              .pipe(
                map(function loadByIndexesMapItem(serviceResult) {
                  const actionService = facadeRegistry.register(
                    feature,
                    entity,
                  );
                  actionService.loadByIndexesSuccess(
                    parentId,
                    childField,
                    serviceResult,
                  );
                }),
              )
          );
        }),
      )
      .subscribe();
  }

  /**
   * This updates the childField with the ids provided so we can
   * use them in the VirtualArray. Make sure when you call this
   * you are calling the service for the parent entity and not the
   * child entity.
   *
   * @param parentId the id of the parent row so we can update the proper childField
   * @param childField the child field to update
   * @param array specifiers that define the new partial array
   */
  loadByIndexesSuccess(
    parentId: string,
    childField: string,
    array: PartialArrayDefinition,
  ): void {
    const entities = this.facade.entityState.entityState().entities;
    const row = entities[parentId];
    const rowAsRecord = row as unknown as Record<string, VirtualArrayContents>;
    const updatedField = this.processLoadByIndexesSuccess(
      rowAsRecord[childField],
      array,
    );
    this.facade.storeRows([{ ...row, [childField]: updatedField }]);
  }

  private processLoadByIndexesSuccess(
    field: VirtualArrayContents,
    array: PartialArrayDefinition,
  ): VirtualArrayContents {
    const updatedField = { ...field };
    updatedField.indexes = [...field.indexes];
    forNext(
      array.indexes,
      function processLoadByIndexesSuccessForNext(item, index) {
        updatedField.indexes[index + array.startIndex] = item;
      },
    );
    updatedField.length = array.length;
    if (
      updatedField.indexes.length > 0 &&
      newRowRegistry.isNewRow(
        this.feature,
        this.entity,
        updatedField.indexes[updatedField.indexes.length - 1],
      )
    ) {
      updatedField.length = array.length + 1;
      updatedField.indexes[updatedField.length - 1] =
        updatedField.indexes[updatedField.indexes.length - 1];
    }
    return updatedField;
  }
}
// jscpd:ignore-end
