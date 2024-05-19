import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { actionFactory } from '../..';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { actionServiceRegistry } from '../../registrations/action.service.registry';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';
import { store as storeFunction } from '../../selector/store.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { updateEffect } from './update-effect.function';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
  foo: string;
  isDirty: boolean;
}
class TestService extends EffectService<Row> {
  override loadByIds: (ids: string[]) => Observable<Row[]> = (_: string[]) => {
    return new Observable<Row[]>();
  };

  override update: (oldRow: Row, newRow: Row) => Observable<Row[]> = (
    _: Row,
    newRow: Row,
  ) => {
    return of([newRow] as Row[]);
  };

  override add: (row: Row) => Observable<Row[]> = (_: Row) => {
    return of([] as Row[]);
  };

  override delete: (id: string) => Observable<void> = (_: string) => {
    return of();
  };
}

const serviceToken = new InjectionToken<TestService>('TestService');
const actions = actionFactory<Row, 'feature', 'entity'>('feature', 'entity');

describe('update-effect.function.ts', () => {
  const feature = 'feature';
  const entity = 'entity';
  const effect = updateEffect(
    serviceToken,
    actions,
    feature as StringLiteralSource<string>,
    entity as StringLiteralSource<string>,
  );
  let actionServiceLoadByIdsSuccessSpy: jest.SpyInstance;
  entityDefinitionCache(feature, entity, {
    entityName: entity,
    effectServiceToken: serviceToken,
    defaultRow: (id: string) => ({ id, name: '', foo: '', isDirty: false }),
    entityAdapter: createEntityAdapter(),
  });
  const testService = new TestService();
  let serviceSpy: jest.SpyInstance;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: {} })],
    });
    const store = TestBed.inject(MockStore);
    storeFunction(store);
    const actionService = actionServiceRegistry(
      'feature' as StringLiteralSource<string>,
      'entity' as StringLiteralSource<string>,
    );

    serviceSpy = jest.spyOn(testService, 'update');
    actionServiceLoadByIdsSuccessSpy = jest.spyOn(
      actionService,
      'loadByIdsSuccess',
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
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
          a: undefined,
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '1', name: 'foo2', foo: 'bar', isDirty: false },
        ]);
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
          a: undefined,
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '1', name: 'foo2', foo: 'bar2', isDirty: false },
        ]);
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
          a: undefined,
          b: undefined,
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(2);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '1', name: 'foo2', foo: 'bar', isDirty: false },
        ]);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '2', name: 'foo2', foo: 'bar2', isDirty: false },
        ]);
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
          a: undefined,
          b: undefined,
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(2);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '1', name: 'foo2', foo: 'bar2', isDirty: false },
        ]);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '2', name: 'foo2a', foo: 'bar2a', isDirty: false },
        ]);
      });
    });
  });
});
