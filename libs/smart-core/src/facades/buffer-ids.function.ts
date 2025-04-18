import {
  asapScheduler,
  buffer,
  debounceTime,
  map,
  Observable,
  Subject,
} from 'rxjs';

/**
 * Buffers IDs and removes duplicates within the buffer window
 *
 * @param bufferTimeMs The time window for buffering (default: 1ms)
 * @returns An observable of unique ID arrays
 */
export function bufferIds(
  bufferTimeMs = 0, // default to using microtasks
): (source: Observable<string>) => Observable<string[]> {
  return function bufferIdsOperator(source: Observable<string>) {
    const notifier = new Subject<void>();

    source.subscribe({
      next: function notifyNext() {
        notifier.next();
      },
      error: function notifyError(err: unknown) {
        notifier.error(err);
      },
    });

    return source.pipe(
      buffer(notifier.pipe(debounceTime(bufferTimeMs, asapScheduler))),
      map(function removeDuplicates(ids) {
        return [...new Set(ids)];
      }),
    );
  };
}
