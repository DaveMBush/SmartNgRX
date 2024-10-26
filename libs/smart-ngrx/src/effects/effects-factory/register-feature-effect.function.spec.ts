import { featureRegistry } from '../../registrations/feature-registry.class';
import { registerFeatureEffect } from './register-feature-effect.function';

describe('registerFeatureEffect', () => {
  let registerFeatureSpy: jest.SpyInstance;
  beforeEach(() => {
    registerFeatureSpy = jest.spyOn(featureRegistry, 'registerFeature');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should register the feature', () => {
    const effect = registerFeatureEffect('feature');
    effect();
    expect(featureRegistry.hasFeature('feature')).toEqual(true);
    expect(registerFeatureSpy).toHaveBeenCalledWith('feature');
  });
  describe('when the feature is already registered', () => {
    let effect: () => void;
    beforeEach(() => {
      effect = registerFeatureEffect('feature');
      effect();
    });
    it('should not register the feature', () => {
      effect();
      expect(featureRegistry.hasFeature('feature')).toEqual(true);
      expect(registerFeatureSpy).toHaveBeenCalledTimes(1);
    });
  });
});
