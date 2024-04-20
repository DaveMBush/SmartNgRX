import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';
import { customProxyGet } from './custom-proxy-get.function';

describe('customProxyGet()', () => {
  const target = {
    toJSON: () => {
      /*noop*/
    },
    getRealRow: () => {
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
  } as unknown as CustomProxy<object, SmartNgRXRowBase>;
  const service = {
    loadByIdsSuccess: () => {
      /*noop*/
    },
  } as unknown as ActionService<SmartNgRXRowBase>;
  let getRealRowSpy: jest.SpyInstance;
  let getJsonSpy: jest.SpyInstance;
  let loadByIdsSuccessSpy: jest.SpyInstance;
  beforeEach(() => {
    getRealRowSpy = jest.spyOn(target, 'getRealRow');
    getJsonSpy = jest.spyOn(target, 'toJSON');
    loadByIdsSuccessSpy = jest.spyOn(service, 'loadByIdsSuccess');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when prop is "toJSON"', () => {
    it('should return a function that calls target.toJSON()', () => {
      // Arrange
      const prop = 'toJSON';
      // Act
      const result = customProxyGet(target, prop, service) as () => void;
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
      customProxyGet(target, prop, service);
      // Assert
      expect(loadByIdsSuccessSpy).toHaveBeenCalled();
    });
  });
  describe('when prop is "getRealRow"', () => {
    it('should return a function that calls target.getRealRow()', () => {
      // Arrange
      const prop = 'getRealRow';
      // Act
      const result = customProxyGet(target, prop, service) as () => void;
      result();
      // Assert
      expect(getRealRowSpy).toHaveBeenCalled();
      expect(getJsonSpy).not.toHaveBeenCalled();
    });
  });
  describe('if prop is in changes', () => {
    it('should return the value from changes', () => {
      const prop = 'a';
      // Act
      const result = customProxyGet(target, prop, service) as () => void;
      expect(result).toBe('a');
    });
  });
  describe('if prop is not in changes', () => {
    it('should return the value from record', () => {
      const prop = 'b';
      // Act
      const result = customProxyGet(target, prop, service) as () => void;
      expect(result).toBe('c');
    });
  });
});
