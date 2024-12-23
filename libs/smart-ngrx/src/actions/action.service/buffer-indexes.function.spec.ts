import { TestScheduler } from 'rxjs/testing';

import { IndexProp } from '../../types/index-prop.interfaces';
import { bufferIndexes } from './buffer-indexes.function';

describe('bufferIndexes', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should buffer and combine indexes within specified time window', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input: IndexProp[] = [
        { parentId: '1', childField: 'children', index: 1 },
        { parentId: '1', childField: 'children', index: 2 },
        { parentId: '1', childField: 'children', index: 3 },
        { parentId: '1', childField: 'children', index: 4 },
      ];

      const source = cold('a-b-c-d-|', {
        a: input[0],
        b: input[1],
        c: input[2],
        d: input[3],
      });
      const expected = '--------(x|)';
      const expectedValues = {
        x: {
          parentId: '1',
          childField: 'children',
          indexes: [1, 2, 3, 4],
        },
      };

      const result = source.pipe(bufferIndexes(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should deduplicate indexes within the buffer window', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input: IndexProp[] = [
        { parentId: '1', childField: 'children', index: 1 },
        { parentId: '1', childField: 'children', index: 2 },
        { parentId: '1', childField: 'children', index: 2 },
        { parentId: '1', childField: 'children', index: 3 },
      ];

      const source = cold('a-b-c-d-|', {
        a: input[0],
        b: input[1],
        c: input[2],
        d: input[3],
      });
      const expected = '--------(x|)';
      const expectedValues = {
        x: {
          parentId: '1',
          childField: 'children',
          indexes: [1, 2, 3],
        },
      };

      const result = source.pipe(bufferIndexes(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should group indexes by parentId and childField', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input: IndexProp[] = [
        { parentId: '1', childField: 'children', index: 1 },
        { parentId: '1', childField: 'children', index: 2 },
        { parentId: '2', childField: 'children', index: 3 },
        { parentId: '2', childField: 'children', index: 4 },
        { parentId: '1', childField: 'tasks', index: 5 },
        { parentId: '1', childField: 'tasks', index: 6 },
      ];

      const source = cold('(abcdef)', {
        a: input[0],
        b: input[1],
        c: input[2],
        d: input[3],
        e: input[4],
        f: input[5],
      });
      const expected = '--(xyz)';
      const expectedValues = {
        x: {
          parentId: '1',
          childField: 'children',
          indexes: [1, 2],
        },
        y: {
          parentId: '2',
          childField: 'children',
          indexes: [3, 4],
        },
        z: {
          parentId: '1',
          childField: 'tasks',
          indexes: [5, 6],
        },
      };

      const result = source.pipe(bufferIndexes(2));
      expectObservable(result).toBe(expected, expectedValues);
    });
  });

  it('should handle empty source observable', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold<IndexProp>('|');
      const expected = '|';

      const result = source.pipe(bufferIndexes(2));
      expectObservable(result).toBe(expected);
    });
  });

  it('should propagate errors from source observable', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold<IndexProp>('#');
      const expected = '#';

      const result = source.pipe(bufferIndexes(2));
      expectObservable(result).toBe(expected);
    });
  });
});
