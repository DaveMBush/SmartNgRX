import { ArrayProxy } from './array-proxy.class';
import { arrayProxyClassGet } from './array-proxy-class.get.function';

describe('arrayProxyClassGet()', () => {
  const target = {
    getAtIndex(_: number): unknown {
      return {};
    },
  } as ArrayProxy;
  let getAtIndexSpy: jest.SpyInstance;
  let reflectGetSpy: jest.SpyInstance;
  beforeEach(() => {
    getAtIndexSpy = jest.spyOn(target, 'getAtIndex');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('if the prop is a string that is a number', () => {
    beforeEach(() => {
      arrayProxyClassGet(target, '1');
    });
    it('should return the value at the index', () => {
      expect(getAtIndexSpy).toHaveBeenCalled();
    });
  });
  describe('if the prop is anything other than a string that is a number', () => {
    beforeEach(() => {
      reflectGetSpy = jest.spyOn(Reflect, 'get').mockImplementation(() => {
        /*noop*/
      });
      arrayProxyClassGet(target, 'length');
    });
    it('should return the value of the property', () => {
      expect(getAtIndexSpy).not.toHaveBeenCalled();
      expect(reflectGetSpy).toHaveBeenCalled();
    });
  });
  describe('if the prop is "length" and rawArray is a VirtualArray', () => {
    beforeEach(() => {
      const virtualArray = {
        rawArray: {
          rawArray: ['a', 'b', 'c', 'd', 'e'],
          length: 5,
        },
      };
      target.rawArray = virtualArray.rawArray as unknown as string[];
    });

    it('should return the length of the VirtualArray', () => {
      const result = arrayProxyClassGet(target, 'length');
      expect(result).toBe(5);
    });
  });
});
