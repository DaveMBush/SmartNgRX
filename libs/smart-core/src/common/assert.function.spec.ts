import { assert } from './assert.function';

describe('assert.function.ts', () => {
  describe('if the assert condition is true', () => {
    it('does not throw an exception', () => {
      expect(() => {
        assert(true, 'this should not throw');
      }).not.toThrow();
    });
  });
  describe('if the assert condition is false', () => {
    it('throws an exception', () => {
      expect(() => {
        assert(false, 'this should throw');
      }).toThrow('Error: this should throw');
    });
  });
});
