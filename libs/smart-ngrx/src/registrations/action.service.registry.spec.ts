/* eslint-disable @typescript-eslint/unbound-method -- spies look unbound */
import { ActionService } from '../actions/action.service';
import {
  actionServiceRegistry,
  clearActionServiceRegistry,
} from './action.service.registry';

jest.mock('../actions/action.service');

describe('actionServiceRegistry', () => {
  let mockActionServiceFactory: jest.Mock;

  beforeEach(() => {
    mockActionServiceFactory = jest.fn().mockImplementation(() => ({
      init: jest.fn().mockReturnValue(true),
    }));
    (ActionService as jest.Mock).mockImplementation(mockActionServiceFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearActionServiceRegistry();
  });

  it('should return null when ActionService.init() returns false', () => {
    mockActionServiceFactory.mockImplementationOnce(() => ({
      init: jest.fn().mockReturnValue(false),
    }));

    const result = actionServiceRegistry('testFeature', 'testEntity');

    expect(result).toBeNull();
    expect(ActionService).toHaveBeenCalledWith('testFeature', 'testEntity');
  });

  it('should return ActionService instance when init() returns true', () => {
    const result = actionServiceRegistry('testFeature', 'testEntity');

    expect(result).toEqual(
      expect.objectContaining({ init: expect.any(Function) }),
    );
    expect(ActionService).toHaveBeenCalledWith('testFeature', 'testEntity');
    expect(result!.init).toHaveBeenCalled();
  });

  it('should cache and return the same ActionService instance for repeated calls', () => {
    const result1 = actionServiceRegistry('testFeature', 'testEntity');
    const result2 = actionServiceRegistry('testFeature', 'testEntity');

    expect(result1).toBe(result2);
    expect(ActionService).toHaveBeenCalledTimes(1);
    expect(result1!.init).toHaveBeenCalledTimes(1);
  });

  it('should create separate instances for different feature-entity combinations', () => {
    const result1 = actionServiceRegistry('feature1', 'entity1');
    const result2 = actionServiceRegistry('feature2', 'entity2');

    expect(result1).not.toBe(result2);
    expect(ActionService).toHaveBeenCalledTimes(2);
    expect(ActionService).toHaveBeenNthCalledWith(1, 'feature1', 'entity1');
    expect(ActionService).toHaveBeenNthCalledWith(2, 'feature2', 'entity2');
    expect(result1?.init).toHaveBeenCalledTimes(1);
    expect(result2?.init).toHaveBeenCalledTimes(1);
  });
});
