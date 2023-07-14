import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { actionFactory } from './action.factory';
import { EffectFactory } from './effect-factory.interface';
import { EffectService } from './effect-service';
import { effectsFactory } from './effects.factory';

interface MockState {
  id: string;
  test: string;
}

const mockInjectionToken = new InjectionToken<MockService>('mockService');

class MockService extends EffectService<MockState> {
  load = () => {
    return of([] as MockState[]);
  };
}

describe('effectsFactory', () => {
  let testScheduler: TestScheduler;
  let actions: Observable<Action>;
  let effect: EffectFactory<MockState>;
  const mockActions = () => actions;
  let loadEffect: Observable<Action>;
  const source = 'test';

  beforeEach(() => {
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
      effect = effectsFactory(source, mockInjectionToken);
      loadEffect = effect.load();
    });
  });

  it('should create an effect', () => {
    const sourceActions = actionFactory<'test', MockState>(source);
    testScheduler.run(({ hot, expectObservable }) => {
      actions = hot('-a', { a: sourceActions.load() });
      TestBed.runInInjectionContext(() => {
        expectObservable(loadEffect).toBe('-a', {
          a: sourceActions.loadSuccess({ rows: [] }),
        });
      });
    });

    expect(effect).toBeDefined();
  });
});
