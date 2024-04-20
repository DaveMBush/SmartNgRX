import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';
import { arrayProxyClassGet } from './array-proxy-class.get.function';

describe('arrayProxyClassGet()', () => {
  const target = {
    getAtIndex(_: number): unknown {
      return {};
    },
  } as ArrayProxy<object, SmartNgRXRowBase>;
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
});
