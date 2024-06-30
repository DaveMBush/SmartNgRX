import { ActionService } from '../../actions/action.service';
import * as actionServiceRegistry from '../../registrations/action.service.registry';
import { processMarkAndDelete } from './process-mark-and-delete.function';
// we have to supply requestIdleCallback for jest
window.requestIdleCallback = (
  cb: IdleRequestCallback,
  _?: IdleRequestOptions,
): number => {
  cb({ didTimeout: false, timeRemaining: () => 1000 });
  return 0;
};

class MockActionService {
  garbageCollect = (_: string[]) => {
    /* noop */
  };

  markDirty = (_: string[]) => {
    /* noop */
  };
}

describe('processMarkAndDelete', () => {
  let garbageCollectSpy: jest.SpyInstance;
  let markDirtySpy: jest.SpyInstance;
  beforeEach(() => {
    const mockActionService = new MockActionService();
    jest
      .spyOn(actionServiceRegistry, 'actionServiceRegistry')
      .mockImplementation(
        (_: string, __: string) =>
          mockActionService as unknown as ActionService,
      );
    garbageCollectSpy = jest
      .spyOn(mockActionService, 'garbageCollect')
      .mockImplementation(() => {
        /* noop */
      });
    markDirtySpy = jest
      .spyOn(mockActionService, 'markDirty')
      .mockImplementation(() => {
        /* noop */
      });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should mark rows as dirty and garbage collect them', () => {
    // Arrange
    const featureKey = 'exampleFeature';
    const entity = 'exampleEntity';
    const garbageCollectRowIds = ['row1', 'row2'];
    const markDirtyRowIds = ['row3', 'row4'];

    // Act
    processMarkAndDelete(
      featureKey,
      entity,
      garbageCollectRowIds,
      markDirtyRowIds,
    );

    // Assert
    expect(garbageCollectSpy).toHaveBeenCalledWith(garbageCollectRowIds);
    expect(markDirtySpy).toHaveBeenCalledWith(markDirtyRowIds);
  });

  it('should handle empty row arrays', () => {
    // Arrange
    const featureKey = 'exampleFeature';
    const entity = 'exampleEntity';
    const garbageCollectRowIds: string[] = [];
    const markDirtyRowIds: string[] = [];

    // Act
    processMarkAndDelete(
      featureKey,
      entity,
      garbageCollectRowIds,
      markDirtyRowIds,
    );

    // Assert
    expect(garbageCollectSpy).not.toHaveBeenCalled();
    expect(markDirtySpy).not.toHaveBeenCalled();
  });
  describe('when garbageCollectRowIds is empty but markDirtyRowIds is not', () => {
    it('should only garbage collect rows', () => {
      // Arrange
      const featureKey = 'exampleFeature';
      const entity = 'exampleEntity';
      const garbageCollectRowIds = ['row1', 'row2'];
      const markDirtyRowIds: string[] = [];

      // Act
      processMarkAndDelete(
        featureKey,
        entity,
        garbageCollectRowIds,
        markDirtyRowIds,
      );

      // Assert
      expect(garbageCollectSpy).toHaveBeenCalled();
      expect(markDirtySpy).not.toHaveBeenCalled();
    });
  });
  describe('when markDirtyRowIds is empty but garbageCollectRowIds is not', () => {
    it('should only garbage collect rows', () => {
      // Arrange
      const featureKey = 'exampleFeature';
      const entity = 'exampleEntity';
      const garbageCollectRowIds: string[] = [];
      const markDirtyRowIds = ['row1', 'row2'];

      // Act
      processMarkAndDelete(
        featureKey,
        entity,
        garbageCollectRowIds,
        markDirtyRowIds,
      );

      // Assert
      expect(garbageCollectSpy).not.toHaveBeenCalled();
      expect(markDirtySpy).toHaveBeenCalled();
    });
  });
});
