import { EnvironmentInjector, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  EffectService,
  featureRegistry,
  PartialArrayDefinition,
  rootInjector,
  serviceRegistry,
  SmartEntityDefinition,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';
import { Observable, of } from 'rxjs';

import { provideSmartFeatureSignalEntities } from './provide-smart-feature-signal-entities.function';

@Injectable()
class TestEffectService implements EffectService<TestRow> {
  loadByIds = (_: string[]): Observable<TestRow[]> => of([]);

  loadByIndexes = (
    _: string,
    __: string,
    ___: number,
    ____: number,
  ): Observable<PartialArrayDefinition> =>
    of({ rows: [], startIndex: 0, length: 0, indexes: [] });

  update = (_: TestRow): Observable<TestRow[]> => of([]);

  add = (_: TestRow): Observable<TestRow[]> => of([]);

  delete = (_: string): Observable<void> => of(void 0);
}

interface TestRow extends SmartNgRXRowBase {
  name: string;
}

describe('provideSmartFeatureSignalEntities', () => {
  const featureName = 'testFeature';
  const entityName = 'testEntity';
  let entityDefinition: SmartEntityDefinition<TestRow>;
  let effectServiceToken: InjectionToken<EffectService<TestRow>>;
  let mockRootInjectorCallback: (callback: () => void) => void;

  beforeEach(() => {
    // Reset all mocks and spies
    jest.clearAllMocks();
    jest.restoreAllMocks();

    // Reset TestBed
    TestBed.resetTestingModule();

    effectServiceToken = new InjectionToken<EffectService<TestRow>>(
      'TestEffect',
    );
    entityDefinition = {
      entityName,
      effectServiceToken,
      defaultRow: (id: string): TestRow => ({
        id,
        name: '',
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        TestEffectService,
        { provide: effectServiceToken, useClass: TestEffectService },
      ],
    });

    // Setup spies after reset
    jest.spyOn(featureRegistry, 'hasFeature');
    jest.spyOn(featureRegistry, 'registerFeature');
    jest.spyOn(serviceRegistry, 'has');
    jest.spyOn(serviceRegistry, 'register');

    // Setup root injector spy with callback capture
    const mockInjector = TestBed.inject(EnvironmentInjector);
    jest.spyOn(rootInjector, 'get').mockReturnValue(mockInjector);
    mockRootInjectorCallback = jest.fn();
    jest
      .spyOn(rootInjector, 'runOnRootInjector')
      .mockImplementation((callback) => {
        mockRootInjectorCallback(callback);
        callback();
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should register feature if not already registered', () => {
    const hasFeature = jest.spyOn(featureRegistry, 'hasFeature');
    const registerFeature = jest.spyOn(featureRegistry, 'registerFeature');

    provideSmartFeatureSignalEntities(featureName, [entityDefinition]);

    expect(hasFeature).toHaveBeenCalledWith(featureName);
    expect(registerFeature).toHaveBeenCalledWith(featureName);
  });

  it('should not register feature if already registered', () => {
    // First spy on both methods before any mocking
    const hasFeature = jest.spyOn(featureRegistry, 'hasFeature');
    const registerFeature = jest.spyOn(featureRegistry, 'registerFeature');

    // Then mock hasFeature to return true
    hasFeature.mockReturnValue(true);

    provideSmartFeatureSignalEntities(featureName, [entityDefinition]);

    expect(registerFeature).not.toHaveBeenCalled();
  });

  it('should register effect service if not already registered', () => {
    const hasService = jest.spyOn(serviceRegistry, 'has');
    const registerService = jest.spyOn(serviceRegistry, 'register');

    provideSmartFeatureSignalEntities(featureName, [entityDefinition]);

    expect(mockRootInjectorCallback).toHaveBeenCalled();
    expect(hasService).toHaveBeenCalledWith(effectServiceToken);
    expect(registerService).toHaveBeenCalledWith(
      effectServiceToken,
      expect.any(TestEffectService),
    );
  });

  it('should not register effect service if already registered', () => {
    const registerService = jest.spyOn(serviceRegistry, 'register');
    jest.spyOn(serviceRegistry, 'has').mockReturnValue(true);

    provideSmartFeatureSignalEntities(featureName, [entityDefinition]);

    expect(mockRootInjectorCallback).toHaveBeenCalled();
    expect(registerService).not.toHaveBeenCalled();
  });

  it('should handle multiple entity definitions', () => {
    const secondEffectToken = new InjectionToken<EffectService<TestRow>>(
      'SecondEffect',
    );
    const secondEntityDefinition: SmartEntityDefinition<TestRow> = {
      entityName: 'secondEntity',
      effectServiceToken: secondEffectToken,
      defaultRow: (id: string): TestRow => ({
        id,
        name: '',
      }),
    };

    // Reset and reconfigure TestBed with both services
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        TestEffectService,
        { provide: effectServiceToken, useClass: TestEffectService },
        { provide: secondEffectToken, useClass: TestEffectService },
      ],
    });

    // Re-setup root injector after TestBed reset
    const mockInjector = TestBed.inject(EnvironmentInjector);
    jest.spyOn(rootInjector, 'get').mockReturnValue(mockInjector);

    const hasService = jest.spyOn(serviceRegistry, 'has');
    const registerService = jest.spyOn(serviceRegistry, 'register');

    provideSmartFeatureSignalEntities(featureName, [
      entityDefinition,
      secondEntityDefinition,
    ]);

    expect(mockRootInjectorCallback).toHaveBeenCalledTimes(2);
    expect(hasService).toHaveBeenCalledWith(effectServiceToken);
    expect(hasService).toHaveBeenCalledWith(secondEffectToken);
    expect(registerService).toHaveBeenCalledWith(
      effectServiceToken,
      expect.any(TestEffectService),
    );
    expect(registerService).toHaveBeenCalledWith(
      secondEffectToken,
      expect.any(TestEffectService),
    );
  });

  it('should return an empty array', () => {
    const result = provideSmartFeatureSignalEntities(featureName, [
      entityDefinition,
    ]);

    expect(result).toEqual([]);
  });
});
