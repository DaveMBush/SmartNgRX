import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { actionFactory } from '../..';
import { MarkAndDelete } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { updateEffect } from './update-effect.function';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

interface Row extends MarkAndDelete {
  id: string;
  name: string;
  foo: string;
  isDirty: boolean;
}
class TestService extends EffectService<Row> {
  override load: () => Observable<Row[]> = () => {
    return of([] as Row[]);
  };

  override loadByIds: (ids: string[]) => Observable<Row[]> = (_: string[]) => {
    return new Observable<Row[]>();
  };

  override update: (oldRow: Row, newRow: Row) => Observable<Row[]> = (
    oldRow: Row,
    newRow: Row,
  ) => {
    return of([newRow] as Row[]);
  };
}

const serviceToken = new InjectionToken<TestService>('TestService');
const actions = actionFactory<'feature', 'entity', Row>('feature', 'entity');

describe('update-effect.function.ts', () => {
  const effect = updateEffect(serviceToken, actions);
  const testService = new TestService();
  let serviceSpy: jest.SpyInstance;
  beforeEach(() => {
    serviceSpy = jest.spyOn(testService, 'update');
  });
  afterEach(() => {
    serviceSpy.mockClear();
  });
  describe('when updateEffect is called once', () => {
    it('calls effectService.update once', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-a', {
          a: actions.update({
            old: { row: { id: '1', name: 'foo', foo: 'bar', isDirty: false } },
            new: { row: { id: '1', name: 'foo2', foo: 'bar', isDirty: false } },
          }),
        });
        const output = cold('--a', {
          a: actions.loadByIdsSuccess({
            rows: [
              { id: '1', name: 'foo2', foo: 'bar', isDirty: false },
            ] as Row[],
          }),
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('when updateEffect is called twice for the same row', () => {
    it('calls effectService.update once with the second update', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-ab', {
          a: actions.update({
            old: { row: { id: '1', name: 'foo', foo: 'bar', isDirty: false } },
            new: { row: { id: '1', name: 'foo2', foo: 'bar', isDirty: false } },
          }),
          b: actions.update({
            old: { row: { id: '1', name: 'foo2', foo: 'bar', isDirty: false } },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar2', isDirty: false },
            },
          }),
        });
        const output = cold('---a', {
          a: actions.loadByIdsSuccess({
            rows: [
              { id: '1', name: 'foo2', foo: 'bar2', isDirty: false },
            ] as Row[],
          }),
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('when updateEffect is called twice for different rows', () => {
    it('calls effectService.update twice', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-ab', {
          a: actions.update({
            old: { row: { id: '1', name: 'foo', foo: 'bar', isDirty: false } },
            new: { row: { id: '1', name: 'foo2', foo: 'bar', isDirty: false } },
          }),
          b: actions.update({
            old: { row: { id: '2', name: 'foo2', foo: 'bar', isDirty: false } },
            new: {
              row: { id: '2', name: 'foo2', foo: 'bar2', isDirty: false },
            },
          }),
        });
        const output = cold('---(ab)', {
          a: actions.loadByIdsSuccess({
            rows: [
              { id: '1', name: 'foo2', foo: 'bar', isDirty: false },
            ] as Row[],
          }),
          b: actions.loadByIdsSuccess({
            rows: [
              { id: '2', name: 'foo2', foo: 'bar2', isDirty: false },
            ] as Row[],
          }),
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
  describe('when updateEffect is called four time for two different rows', () => {
    it('calls effectService.update twice with the last call for each row', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-abcd', {
          a: actions.update({
            old: { row: { id: '1', name: 'foo', foo: 'bar', isDirty: false } },
            new: { row: { id: '1', name: 'foo2', foo: 'bar', isDirty: false } },
          }),
          b: actions.update({
            old: { row: { id: '2', name: 'foo2', foo: 'bar', isDirty: false } },
            new: {
              row: { id: '2', name: 'foo2a', foo: 'bar2', isDirty: false },
            },
          }),
          c: actions.update({
            old: { row: { id: '1', name: 'foo2', foo: 'bar', isDirty: false } },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar2', isDirty: false },
            },
          }),
          d: actions.update({
            old: {
              row: { id: '2', name: 'foo2a', foo: 'bar2', isDirty: false },
            },
            new: {
              row: { id: '2', name: 'foo2a', foo: 'bar2a', isDirty: false },
            },
          }),
        });
        const output = cold('-----(ab)', {
          a: actions.loadByIdsSuccess({
            rows: [
              { id: '1', name: 'foo2', foo: 'bar2', isDirty: false },
            ] as Row[],
          }),
          b: actions.loadByIdsSuccess({
            rows: [
              { id: '2', name: 'foo2a', foo: 'bar2a', isDirty: false },
            ] as Row[],
          }),
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
