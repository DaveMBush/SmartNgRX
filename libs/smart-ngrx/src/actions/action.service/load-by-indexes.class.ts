import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, switchMap, take } from 'rxjs';

import { forNext } from '../../common/for-next.function';
import { actionServiceRegistry } from '../../registrations/action-service-registry.class';
import { effectServiceRegistry } from '../../registrations/effect-service-registry.class';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';
import { newRowRegistry } from '../../selector/new-row-registry.class';
import { PartialArrayDefinition } from '../../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../../types/virtual-array-contents.interface';
import { ActionGroup } from '../action-group.interface';
import { bufferIndexes } from './buffer-indexes.function';

/**
 * This class is used to manage loading the child ids by
 * their location in the array.
 */
export class LoadByIndexes {
  actions!: ActionGroup;
  entities!: Observable<Dictionary<SmartNgRXRowBase>>;
  private loadByIndexesSubject = new Subject<{
    parentId: string;
    childField: string;
    indexes: number[];
  }>();

  /**
   * The constructor for the LoadByIndexes class.
   *
   * @param feature the name of the feature this class is for
   * @param entity the name of the entity this class is for
   * @param store the store to dispatch the actions to
   */
  constructor(
    private feature: string,
    private entity: string,
    private store: Store,
  ) {}

  /**
   * Initializes the service with the actions and starts the dispatcher.
   *
   * @param actions the actions to use
   * @param entities the entities to check for loading
   */
  init(
    actions: ActionGroup,
    entities: Observable<Dictionary<SmartNgRXRowBase>>,
  ): void {
    this.actions = actions;
    this.entities = entities;
    this.loadByIndexesDispatcher();
  }

  /**
   * que up loading the ids for the indexes
   *
   * @param parentId the id of the parent row
   * @param childField the child field to load
   * @param indexes the indexes to load
   */
  loadByIndexes(parentId: string, childField: string, indexes: number[]): void {
    this.loadByIndexesSubject.next({
      parentId,
      childField,
      indexes,
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
          const numberIds = indexes.map(function convertStringToNumber(id) {
            return +id;
          });
          // User reduce to find the min and max because spread can fail
          // with large arrays.
          const min = numberIds.reduce(function reduceMin(a, b) {
            return Math.min(a, b);
          }, numberIds[0]);
          const max = numberIds.reduce(function reduceMax(a, b) {
            return Math.max(a, b);
          }, numberIds[0]);
          const effectService = effectServiceRegistry.get(
            entityDefinitionCache(feature, entity).effectServiceToken,
          );
          return (
            effectService
              .loadByIndexes(parentId, childField, min, max - min + 1)
              // nested pipe to get access to actionProps
              .pipe(
                map(function loadByIndexesMapItem(serviceResult) {
                  const actionService = actionServiceRegistry.register(
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
    const processLoadByIndexesSuccess =
      this.processLoadByIndexesSuccess.bind(this);
    const store = this.store;
    const actions = this.actions;
    this.entities
      .pipe(take(1))
      .subscribe(function loadByIndexesSuccessSubscribe(entities) {
        const row = entities[parentId] as Record<string, VirtualArrayContents> &
          SmartNgRXRowBase;
        const updatedField = processLoadByIndexesSuccess(
          row[childField],
          array,
        );
        store.dispatch(
          actions.storeRows({
            rows: [{ ...row, [childField]: updatedField }],
          }),
        );
      });
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
