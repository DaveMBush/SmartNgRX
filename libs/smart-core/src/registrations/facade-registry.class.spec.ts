import { FacadeBase } from '../facades/facade.base';
import { facadeRegistry } from './facade-registry.class';

jest.mock('../facades/classic-ngrx.facade');

describe('facadeRegistry', () => {
  let mockActionServiceFactory: jest.Mock;

  beforeEach(() => {
    mockActionServiceFactory = jest.fn().mockImplementation(() => ({
      init: jest.fn().mockReturnValue(true),
    }));
    (FacadeBase as jest.Mock).mockImplementation(mockActionServiceFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
    facadeRegistry.clear();
  });

  it('should throw an error when ActionService.init() fails', () => {
    mockActionServiceFactory.mockImplementationOnce(() => ({
      init: jest.fn().mockReturnValue(false),
    }));

    expect(() =>
      facadeRegistry.register('testFeature', 'testEntity'),
    ).toThrow();
    expect(FacadeBase).toHaveBeenCalledWith('testFeature', 'testEntity');
  });

  it('should return ActionService instance when init() returns true', () => {
    const result = facadeRegistry.register('testFeature', 'testEntity');
    const resultInitSpy = jest.spyOn(result, 'init');
    expect(result).toEqual(
      expect.objectContaining({ init: expect.any(Function) }),
    );
    expect(FacadeBase).toHaveBeenCalledWith('testFeature', 'testEntity');
    expect(resultInitSpy).toHaveBeenCalled();
  });

  it('should cache and return the same ActionService instance for repeated calls', () => {
    const result1 = facadeRegistry.register('testFeature', 'testEntity');
    const result2 = facadeRegistry.register('testFeature', 'testEntity');
    const result1InitSpy = jest.spyOn(result1, 'init');
    expect(result1).toBe(result2);
    expect(FacadeBase).toHaveBeenCalledTimes(1);
    expect(result1InitSpy).toHaveBeenCalledTimes(1);
  });

  it('should create separate instances for different feature-entity combinations', () => {
    const result1 = facadeRegistry.register('feature1', 'entity1');
    const result2 = facadeRegistry.register('feature2', 'entity2');
    const result1InitSpy = jest.spyOn(result1, 'init');
    const result2InitSpy = jest.spyOn(result2, 'init');
    expect(result1).not.toBe(result2);
    expect(FacadeBase).toHaveBeenCalledTimes(2);
    expect(FacadeBase).toHaveBeenNthCalledWith(1, 'feature1', 'entity1');
    expect(FacadeBase).toHaveBeenNthCalledWith(2, 'feature2', 'entity2');
    expect(result1InitSpy).toHaveBeenCalledTimes(1);
    expect(result2InitSpy).toHaveBeenCalledTimes(1);
  });
});
