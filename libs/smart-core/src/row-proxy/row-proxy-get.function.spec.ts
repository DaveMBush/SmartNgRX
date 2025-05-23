import { FacadeBase } from '../facades/facade.base';
import { RowProxy } from './row-proxy.class';
import { rowProxyGet } from './row-proxy-get.function';

describe('customProxyGet()', () => {
  const target = {
    toJSON: () => {
      /*noop*/
    },
    getRealRow: () => {
      /*noop*/
    },
    delete: () => {
      /*noop*/
    },
    changes: {
      a: 'a',
    },
    record: {
      a: 'b',
      b: 'c',
    },
    row: {},
  } as unknown as RowProxy;
  const service = {
    loadByIdsSuccess: () => {
      /*noop*/
    },
  } as unknown as FacadeBase;
  let getRealRowSpy: jest.SpyInstance;
  let getJsonSpy: jest.SpyInstance;
  let loadByIdsSuccessSpy: jest.SpyInstance;
  let deleteSpy: jest.SpyInstance;
  beforeEach(() => {
    getRealRowSpy = jest.spyOn(target, 'getRealRow');
    getJsonSpy = jest.spyOn(target, 'toJSON');
    loadByIdsSuccessSpy = jest.spyOn(service, 'loadByIdsSuccess');
    deleteSpy = jest.spyOn(target, 'delete');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when prop is "toJSON"', () => {
    it('should return a function that calls target.toJSON()', () => {
      // Arrange
      const prop = 'toJSON';
      // Act
      const result = rowProxyGet(service)(target, prop) as () => void;
      result();
      // Assert
      expect(getJsonSpy).toHaveBeenCalled();
      expect(getRealRowSpy).not.toHaveBeenCalled();
    });
  });
  describe('when prop is "isEditing"', () => {
    it('should call service.loadByIdsSuccess() with the target.row with isEditing set to true', () => {
      // Arrange
      const prop = 'isEditing';
      // Act
      rowProxyGet(service)(target, prop);
      // Assert
      expect(loadByIdsSuccessSpy).toHaveBeenCalled();
    });
  });
  describe('when prop is "getRealRow"', () => {
    it('should return a function that calls target.getRealRow()', () => {
      const prop = 'getRealRow';
      const result = rowProxyGet(service)(target, prop) as () => void;
      result();
      expect(getRealRowSpy).toHaveBeenCalled();
      expect(getJsonSpy).not.toHaveBeenCalled();
    });
  });
  describe('when prop is "delete"', () => {
    it('should return a function that calls target.delete()', () => {
      const prop = 'delete';
      const result = rowProxyGet(service)(target, prop) as () => void;
      result();
      expect(deleteSpy).toHaveBeenCalled();
      expect(getJsonSpy).not.toHaveBeenCalled();
    });
  });
  describe('if prop is in changes', () => {
    it('should return the value from changes', () => {
      const prop = 'a';
      // Act
      const result = rowProxyGet(service)(target, prop) as () => void;
      expect(result).toBe('a');
    });
  });
  describe('if prop is not in changes', () => {
    it('should return the value from record', () => {
      const prop = 'b';
      // Act
      const result = rowProxyGet(service)(target, prop) as () => void;
      expect(result).toBe('c');
    });
  });
});
