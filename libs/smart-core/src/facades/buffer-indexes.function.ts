import {
  asapScheduler,
  buffer,
  debounceTime,
  map,
  Observable,
  Subscriber,
} from 'rxjs';

import { IndexProp } from '../types/index-prop.interfaces';
import { IndexesProp } from '../types/indexes-prop.interface';

function groupActionsByKey(actions: IndexProp[]): Map<string, IndexProp[]> {
  return actions.reduce(function addToGroup(groups, action) {
    const key = `${action.parentId}-${action.childField}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(action);
    return groups;
  }, new Map<string, IndexProp[]>());
}

function createIndexesProp(actions: IndexProp[]): IndexesProp {
  return {
    indexes: [
      ...new Set(
        actions.map(function getIndex(a) {
          return a.index;
        }),
      ),
    ],
    childField: actions[0].childField,
    parentId: actions[0].parentId,
  };
}

function processGroups(groups: IndexProp[][]): IndexesProp[] {
  return groups.map(createIndexesProp);
}

function getGroupValues(actions: IndexProp[]): IndexProp[][] {
  return [...groupActionsByKey(actions).values()];
}

function emitGroup(
  observer: Subscriber<IndexesProp>,
  group: IndexesProp,
): void {
  observer.next(group);
}

function emitGroups(
  observer: Subscriber<IndexesProp>,
  groupedIndexes: IndexesProp[],
): void {
  groupedIndexes.forEach(function iterateGroups(group) {
    emitGroup(observer, group);
  });
}

function handleError(observer: Subscriber<IndexesProp>, err: unknown): void {
  observer.error(err);
}

function handleComplete(observer: Subscriber<IndexesProp>): void {
  observer.complete();
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
 * @param bufferTimeMs The time to buffer the ids before sending them to the server.
 *     The default is 1ms which only allow the buffer to last until the thread frees up
 *     and is probably all we will ever need.
 * @returns The buffered indexes.
 */
export function bufferIndexes(
  bufferTimeMs = 0,
): (source: Observable<IndexProp>) => Observable<IndexesProp> {
  return function bufferOperation(
    source: Observable<IndexProp>,
  ): Observable<IndexesProp> {
    return new Observable<IndexesProp>(function subscribe(observer) {
      source
        .pipe(
          buffer(source.pipe(debounceTime(bufferTimeMs, asapScheduler))),
          map(getGroupValues),
          map(processGroups),
        )
        .subscribe({
          next: function handleNext(groupedIndexes) {
            emitGroups(observer, groupedIndexes);
          },
          error: function handleSubscriptionError(err: unknown) {
            handleError(observer, err);
          },
          complete: function handleSubscriptionComplete() {
            handleComplete(observer);
          },
        });
    });
  };
}
