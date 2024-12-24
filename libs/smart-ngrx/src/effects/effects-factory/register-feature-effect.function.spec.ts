import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { featureRegistry } from '../../registrations/feature-registry.class';
import { PartialArrayDefinition } from '../../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { registerFeatureEffect } from './register-feature-effect.function';

const errorMessage = 'Method not implemented.';

class TestEffectService extends EffectService<SmartNgRXRowBase> {
  override loadByIndexes(
    _: string,
    __: string,
    ___: number,
    ____: number,
  ): Observable<PartialArrayDefinition> {
    throw new Error(errorMessage);
  }

  override update(_: SmartNgRXRowBase): Observable<SmartNgRXRowBase[]> {
    return of([]);
  }

  override add(_: SmartNgRXRowBase): Observable<SmartNgRXRowBase[]> {
    throw new Error(errorMessage);
  }

  override delete(_: string): Observable<void> {
    throw new Error(errorMessage);
  }

  override loadByIds(_: string[]): Observable<SmartNgRXRowBase[]> {
    throw new Error(errorMessage);
  }
}

describe('registerFeatureEffect', () => {
  let registerFeatureSpy: jest.SpyInstance;
  let featureToken: InjectionToken<EffectService<SmartNgRXRowBase>>;
  const testEffectService = new TestEffectService();
  beforeEach(() => {
    featureToken = new InjectionToken<EffectService<SmartNgRXRowBase>>(
      'featureToken',
    );
    TestBed.configureTestingModule({
      providers: [{ provide: featureToken, useValue: testEffectService }],
    });
    registerFeatureSpy = jest.spyOn(featureRegistry, 'registerFeature');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should register the feature', () => {
    TestBed.runInInjectionContext(() => {
      const effect = registerFeatureEffect('feature', featureToken);
      effect();
    });
    expect(featureRegistry.hasFeature('feature')).toEqual(true);
    expect(registerFeatureSpy).toHaveBeenCalledWith('feature');
  });
  describe('when the feature is already registered', () => {
    let effect: () => void;
    beforeEach(() => {
      TestBed.runInInjectionContext(() => {
        effect = registerFeatureEffect('feature', featureToken);
        effect();
      });
    });
    it('should not register the feature', () => {
      TestBed.runInInjectionContext(() => {
        effect();
      });
      expect(featureRegistry.hasFeature('feature')).toEqual(true);
      expect(registerFeatureSpy).toHaveBeenCalledTimes(1);
    });
  });
});
