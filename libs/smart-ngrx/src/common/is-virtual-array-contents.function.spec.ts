import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { isVirtualArrayContents } from './is-virtual-array-contents.function';

describe('isVirtualArrayContents', () => {
  it('should return true for a valid VirtualArrayContents object', () => {
    const validVirtualArray: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };
    expect(isVirtualArrayContents(validVirtualArray)).toBe(true);
  });

  it('should return false for null', () => {
    expect(isVirtualArrayContents(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isVirtualArrayContents(undefined)).toBe(false);
  });

  it('should return false for a non-object value', () => {
    expect(isVirtualArrayContents('not an object')).toBe(false);
    expect(isVirtualArrayContents(42)).toBe(false);
    expect(isVirtualArrayContents(true)).toBe(false);
  });

  it('should return false for an object without the "indexes" property', () => {
    const invalidObject = { length: 3 };
    expect(isVirtualArrayContents(invalidObject)).toBe(false);
  });

  it('should return false for an object with "indexes" that is not an array', () => {
    const invalidObject = { indexes: 'not an array', length: 3 };
    expect(isVirtualArrayContents(invalidObject)).toBe(false);
  });

  it('should return true for an object with "indexes" array, even if length is missing', () => {
    const validObject = { indexes: [] };
    expect(isVirtualArrayContents(validObject)).toBe(true);
  });

  it('should return true for an object with additional properties', () => {
    const validObjectWithExtra = {
      indexes: ['1', '2'],
      length: 2,
      extraProp: 'extra',
    };
    expect(isVirtualArrayContents(validObjectWithExtra)).toBe(true);
  });
});
