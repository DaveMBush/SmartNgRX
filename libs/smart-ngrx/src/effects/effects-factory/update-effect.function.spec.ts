import { InjectionToken } from '@angular/core';
import { createEntityAdapter } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import {
  actionFactory,
  assert,
  createStore,
  PartialArrayDefinition,
  setState,
} from '../..';
import { actionServiceRegistry } from '../../registrations/action.service.registry';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';
import { featureRegistry } from '../../registrations/feature-registry.class';
import {
  registerEntity,
  unregisterEntity,
} from '../../registrations/register-entity.function';
import { EntityAttributes } from '../../types/entity-attributes.interface';
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
}
class TestService extends EffectService<Row> {
  override loadByIds(_: string[]): Observable<Row[]> {
    return new Observable<Row[]>();
  }

  override update(newRow: Row): Observable<Row[]> {
    return of([newRow] as Row[]);
  }

  override add(_: Row): Observable<Row[]> {
    return of([] as Row[]);
  }

  override delete(_: string): Observable<void> {
    return of();
  }

  override loadByIndexes(
    _: string,
    __: string,
    ___: number,
    ____: number,
  ): Observable<PartialArrayDefinition> {
    // intentionally unimplemented
    return of({} as PartialArrayDefinition);
  }
}

const serviceToken = new InjectionToken<TestService>('TestService');
const actions = actionFactory<Row>('feature', 'entity');

describe('update-effect.function.ts', () => {
  const feature = 'feature';
  const entity = 'entity';
  let effect: ReturnType<typeof updateEffect<Row>>;
  let actionServiceLoadByIdsSuccessSpy: jest.SpyInstance;
  entityDefinitionCache(feature, entity, {
    entityName: entity,
    effectServiceToken: serviceToken,
    defaultRow: (id: string) => ({ id, name: '', foo: '' }),
    entityAdapter: createEntityAdapter(),
  });
  const testService = new TestService();
  let serviceSpy: jest.SpyInstance;
  beforeEach(() => {
    featureRegistry.registerFeature('feature');
    registerEntity(feature, entity, {
      markAndDeleteInit: {},
    } as EntityAttributes);
    createStore();
    setState(feature, entity, {
      ids: [],
      entities: {},
    });
    effect = updateEffect(serviceToken, actions, feature, entity);
    const actionService = actionServiceRegistry('feature', 'entity');
    assert(!!actionService, 'actionService is not defined');

    serviceSpy = jest.spyOn(testService, 'update');
    actionServiceLoadByIdsSuccessSpy = jest.spyOn(
      actionService,
      'loadByIdsSuccess',
    );
  });
  afterEach(() => {
    unregisterEntity(feature, entity);
    jest.clearAllMocks();
  });
  describe('when updateEffect is called once', () => {
    it('calls effectService.update once', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-a', {
          a: actions.update({
            old: {
              row: { id: '1', name: 'foo', foo: 'bar' },
            },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar' },
            },
          }),
        });
        const output = cold('--a', {
          a: undefined,
        });
        expectObservable(effect(input, testService)).toEqual(output);
        flush();
        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '1', name: 'foo2', foo: 'bar' },
        ]);
      });
    });
  });
  describe('when updateEffect is called twice for the same row', () => {
    it('calls effectService.update once with the second update', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-ab', {
          a: actions.update({
            old: {
              row: { id: '1', name: 'foo', foo: 'bar' },
            },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar' },
            },
          }),
          b: actions.update({
            old: {
              row: { id: '1', name: 'foo2', foo: 'bar' },
            },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar2' },
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
          { id: '1', name: 'foo2', foo: 'bar2' },
        ]);
      });
    });
  });
  describe('when updateEffect is called twice for different rows', () => {
    it('calls effectService.update twice', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-ab', {
          a: actions.update({
            old: {
              row: { id: '1', name: 'foo', foo: 'bar' },
            },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar' },
            },
          }),
          b: actions.update({
            old: {
              row: { id: '2', name: 'foo2', foo: 'bar' },
            },
            new: {
              row: { id: '2', name: 'foo2', foo: 'bar2' },
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
          { id: '1', name: 'foo2', foo: 'bar' },
        ]);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '2', name: 'foo2', foo: 'bar2' },
        ]);
      });
    });
  });
  describe('when updateEffect is called four time for two different rows', () => {
    it('calls effectService.update twice with the last call for each row', () => {
      testScheduler.run(({ cold, expectObservable, flush }) => {
        const input = cold('-abcd', {
          a: actions.update({
            old: {
              row: { id: '1', name: 'foo', foo: 'bar' },
            },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar' },
            },
          }),
          b: actions.update({
            old: {
              row: { id: '2', name: 'foo2', foo: 'bar' },
            },
            new: {
              row: {
                id: '2',
                name: 'foo2a',
                foo: 'bar2',
              },
            },
          }),
          c: actions.update({
            old: {
              row: { id: '1', name: 'foo2', foo: 'bar' },
            },
            new: {
              row: { id: '1', name: 'foo2', foo: 'bar2' },
            },
          }),
          d: actions.update({
            old: {
              row: {
                id: '2',
                name: 'foo2a',
                foo: 'bar2',
              },
            },
            new: {
              row: {
                id: '2',
                name: 'foo2a',
                foo: 'bar2a',
              },
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
          { id: '1', name: 'foo2', foo: 'bar2' },
        ]);
        expect(actionServiceLoadByIdsSuccessSpy).toHaveBeenCalledWith([
          { id: '2', name: 'foo2a', foo: 'bar2a' },
        ]);
      });
    });
  });
});
