import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, Subject, take } from 'rxjs';

import { forNext } from '../../common/for-next.function';
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
    this.loadByIndexesSubject
      .pipe(bufferIndexes())
      .subscribe(({ parentId, childField, indexes }) => {
        this.store.dispatch(
          this.actions.loadByIndexes({
            parentId,
            childField,
            indexes,
          }),
        );
      });
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
    this.entities.pipe(take(1)).subscribe((entities) => {
      const row = entities[parentId] as Record<string, VirtualArrayContents> &
        SmartNgRXRowBase;
      const updatedField = this.processLoadByIndexesSuccess(
        row[childField],
        array,
      );
      this.store.dispatch(
        this.actions.storeRows({
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
    forNext(array.indexes, (item, index) => {
      updatedField.indexes[index + array.startIndex] = item;
    });
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