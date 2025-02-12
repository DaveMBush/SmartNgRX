import { Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { bufferIds } from './buffer-ids.function';

describe('bufferIds', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should buffer and combine ids within the specified time window', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('a-b-c|', { a: '1', b: '2', c: '3' });
      const expected = '-----(x|)';
      const expectedValues = {
        x: ['1', '2', '3'],
      };

      const result = source.pipe(bufferIds(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should remove duplicate ids within the buffer window', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('a-b-a|', { a: '1', b: '2' });
      const expected = '-----(x|)';
      const expectedValues = {
        x: ['1', '2'],
      };

      const result = source.pipe(bufferIds(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should emit multiple batches when exceeding buffer time', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('a-b 3ms c-d|', { a: '1', b: '2', c: '3', d: '4' });
      const expected = '----x----(y|)';
      const expectedValues = {
        x: ['1', '2'],
        y: ['3', '4'],
      };

      const result = source.pipe(bufferIds(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should handle empty source observable', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('|');
      const expected = '(x|)';
      const expectedValues = {
        x: [],
      };

      const result = source.pipe(bufferIds(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should propagate errors from source observable', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('a-b-#', { a: '1', b: '2' }, new Error('test error'));
      const expected = '----#';

      const result = source.pipe(bufferIds(2));
      expectObservable(result).toBe(expected, null, new Error('test error'));
    });
  });

  it('should use default buffer time of 0ms when not specified', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('(abc|)', { a: '1', b: '2', c: '3' });
      const expected = '(x|)';
      const expectedValues = {
        x: ['1', '2', '3'],
      };

      const result = source.pipe(bufferIds());
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should handle late subscribers', async () => {
    const subject = new Subject<string>();
    const result = subject.pipe(bufferIds(10));

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const output: string[][] = [];
        result.subscribe({
          next: (value) => output.push(value),
          complete: () => {
            expect(output).toEqual([['1', '2', '3']]);
            resolve();
          },
        });

        subject.next('1');
        subject.next('2');
        subject.next('3');
        subject.complete();
      }, 5);
    });
  });
});
