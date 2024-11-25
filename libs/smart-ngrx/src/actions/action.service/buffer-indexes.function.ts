import {
  asapScheduler,
  buffer,
  debounceTime,
  groupBy,
  map,
  mergeMap,
  Observable,
  Subscriber,
} from 'rxjs';

import { forNext } from '../../common/for-next.function';
import { IndexesProp } from '../../types/indexes-props.interface';

function flatten(prop: IndexesProp[]): IndexesProp {
  const returnProps = {
    indexes: [],
    childField: '',
    parentId: '',
  } as IndexesProp;
  forNext(prop, function flattenForNext(a) {
    returnProps.childField = a.childField;
    returnProps.parentId = a.parentId;
    forNext(a.indexes, function flattenForNextIndexes(b) {
      returnProps.indexes.push(b);
    });
  });
  return returnProps;
}

function mainIndexesBuffer(
  source: Observable<IndexesProp>,
  bufferTime: number,
  observer: Subscriber<IndexesProp>,
) {
  source
    .pipe(
      groupBy(function groupByParentIdChildField(action) {
        return `${action.parentId}-${action.childField}`;
      }),
      mergeMap(function mergeMapGrouped(grouped) {
        return grouped.pipe(
          buffer(source.pipe(debounceTime(bufferTime, asapScheduler))),
          map(function mapFlatten(actions) {
            return flatten(actions);
          }),
        );
      }),
    ) /* jscpd:ignore-start -- intentionally duplicated */
    .subscribe({
      next: function bufferIndexesNext(value) {
        observer.next(value);
      },
      error: function bufferIndexesError(err: unknown) {
        observer.error(err);
      },
      complete: function bufferIndexesComplete() {
        observer.complete();
      },
    });
  /* jscpd:ignore-end */
}
/**
 * This is an internal function that is used by the Effects to buffer
 * the loadByIndexes actions coming into an effect so that we
 * can dispatch indexes independently but send all the indexes
 * to the server in a single request.
 *
 * NOTE: bufferAction assumes an array of indexes is passed to the action
 * it is buffering.
 *
 * @param bufferTime The time to buffer the ids before sending them to the server.
 *     The default is 1ms which only allow the buffer to last until the thread frees up
 *     and is probably all we will ever need.
 * @returns The buffered indexes.
 */
export function bufferIndexes(
  /* istanbul ignore next */
  bufferTime = 1, // default value does not need to be tested
): (source: Observable<IndexesProp>) => Observable<IndexesProp> {
  return function bufferIndexesReturn(
    source: Observable<IndexesProp>,
  ): Observable<IndexesProp> {
    return new Observable<IndexesProp>(function bufferIndexesObservable(
      observer,
    ) {
      mainIndexesBuffer(source, bufferTime, observer);
    });
  };
}
