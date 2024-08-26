import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { isVirtualArray } from './is-virtual-array.function';

describe('isVirtualArray', () => {
  it('should return true for a valid VirtualArrayContents object', () => {
    const validVirtualArray: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };
    expect(isVirtualArray(validVirtualArray)).toBe(true);
  });

  it('should return false for null', () => {
    expect(isVirtualArray(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isVirtualArray(undefined)).toBe(false);
  });

  it('should return false for a non-object value', () => {
    expect(isVirtualArray('not an object')).toBe(false);
    expect(isVirtualArray(42)).toBe(false);
    expect(isVirtualArray(true)).toBe(false);
  });

  it('should return false for an object without the "indexes" property', () => {
    const invalidObject = { length: 3 };
    expect(isVirtualArray(invalidObject)).toBe(false);
  });

  it('should return false for an object with "indexes" that is not an array', () => {
    const invalidObject = { indexes: 'not an array', length: 3 };
    expect(isVirtualArray(invalidObject)).toBe(false);
  });

  it('should return true for an object with "indexes" array, even if length is missing', () => {
    const validObject = { indexes: [] };
    expect(isVirtualArray(validObject)).toBe(true);
  });

  it('should return true for an object with additional properties', () => {
    const validObjectWithExtra = {
      indexes: ['1', '2'],
      length: 2,
      extraProp: 'extra',
    };
    expect(isVirtualArray(validObjectWithExtra)).toBe(true);
  });
});
