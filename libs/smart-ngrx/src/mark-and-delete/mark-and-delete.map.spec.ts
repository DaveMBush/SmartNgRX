import {
  getMarkAndDeleteFeatureMap,
  markAndDeleteFeatures,
} from './mark-and-delete.map';

describe('markAndDeleteMap', () => {
  let feature: Map<string, number>;
  describe('when we ask for a feature that has not been added yet', () => {
    beforeEach(() => {
      feature = getMarkAndDeleteFeatureMap('someFeature');
    });
    it('should return a feature with no keys', () => {
      expect(feature).toStrictEqual(new Map<string, number>());
    });
  });
  describe('after adding multiple features to the map', () => {
    beforeEach(() => {
      feature = getMarkAndDeleteFeatureMap('someFeature');
      feature = getMarkAndDeleteFeatureMap('someOtherFeature');
    });
    it('should return the features when we call markAndDeleteFeatures()', () => {
      expect(markAndDeleteFeatures()).toStrictEqual([
        'someFeature',
        'someOtherFeature',
      ]);
    });
  });
});
