import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { castTo } from '../common/cast-to.function';
import { actionFactory } from '../functions/action.factory';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { EffectService } from './effect-service';
import { effectsFactory } from './effects-factory.function';
import { EffectsFactory } from './effects-factory.interface';

interface MockState extends SmartNgRXRowBase {
  id: string;
  test: string;
}

const mockInjectionToken = new InjectionToken<MockService>('mockService');

class MockService extends EffectService<MockState> {
  load = () => {
    return of([] as MockState[]);
  };

  loadByIds = (ids: string[]) => {
    return of(ids.map((id) => ({ id, test: 'test' + id })) as MockState[]);
  };

  update = (oldRow: MockState, _: MockState) => {
    return this.loadByIds([oldRow.id]);
  };

  add = (row: MockState) => {
    return this.loadByIds([row.id]);
  };
}

describe('effectsFactory', () => {
  let testScheduler: TestScheduler;
  let actions: Observable<Action>;
  let effect: EffectsFactory<MockState>;
  const mockActions = () => actions;
  let loadEffect: Observable<Action>;
  let loadByIdsEffect: Observable<Action>;
  let loadByIdsPreloadEffect: Observable<Action>;
  const source = 'test';

  beforeEach(() => {
    adapterForEntity('feature', 'test', createEntityAdapter<MockState>());
    TestBed.configureTestingModule({
      providers: [
        Actions,
        {
          provide: mockInjectionToken,
          useClass: MockService,
        },
        provideMockActions(mockActions),
      ],
    });
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    actions = TestBed.inject(Actions);
    TestBed.runInInjectionContext(() => {
      effect = castTo<EffectsFactory<MockState>>(
        effectsFactory('feature', source, mockInjectionToken),
      );
      loadEffect = effect.load();
      loadByIdsEffect = effect.loadByIds();
      loadByIdsPreloadEffect = effect.loadByIdsPreload();
    });
  });

  it('should return loadSuccess when it processes the load action', () => {
    const sourceActions = actionFactory<MockState, 'feature', 'test'>(
      'feature',
      source,
    );
    testScheduler.run(({ hot, expectObservable }) => {
      actions = hot('-a', { a: sourceActions.load() });
      TestBed.runInInjectionContext(() => {
        expectObservable(loadEffect).toBe('-a', {
          a: sourceActions.loadSuccess({ rows: [] }),
        });
      });
    });
  });

  it('should return loadByIdsSuccess when it processes the loadByIds action', () => {
    const sourceActions = actionFactory<MockState, 'feature', 'test'>(
      'feature',
      source,
    );
    testScheduler.run(({ hot, expectObservable }) => {
      actions = hot('-a', { a: sourceActions.loadByIds({ ids: ['1'] }) });
      TestBed.runInInjectionContext(() => {
        expectObservable(loadByIdsEffect).toBe('--a', {
          a: sourceActions.loadByIdsSuccess({
            rows: [{ id: '1', test: 'test1' }],
          }),
        });
      });
    });
  });

  it('should return buffer Ids loadByIds within 1ms', () => {
    const sourceActions = actionFactory<MockState, 'feature', 'test'>(
      'feature',
      source,
    );
    testScheduler.run(({ hot, expectObservable }) => {
      actions = hot('-ab', {
        a: sourceActions.loadByIds({ ids: ['1'] }),
        b: sourceActions.loadByIds({ ids: ['2'] }),
      });
      TestBed.runInInjectionContext(() => {
        expectObservable(loadByIdsEffect).toBe('---a', {
          a: sourceActions.loadByIdsSuccess({
            rows: [
              { id: '1', test: 'test1' },
              { id: '2', test: 'test2' },
            ],
          }),
        });
      });
    });
  });
  describe('when loadByIds is processed by the loadByIdsPreLoad effect', () => {
    it('should return the loadByIdsPreload action', () => {
      const sourceActions = actionFactory<MockState, 'feature', 'test'>(
        'feature',
        source,
      );
      testScheduler.run(({ hot, expectObservable }) => {
        actions = hot('-ab', {
          a: sourceActions.loadByIds({ ids: ['1'] }),
          b: sourceActions.loadByIds({ ids: ['2'] }),
        });
        TestBed.runInInjectionContext(() => {
          expectObservable(loadByIdsPreloadEffect).toBe('---a', {
            a: sourceActions.loadByIdsPreload({
              ids: ['1', '2'],
            }),
          });
        });
      });
    });
  });
});
