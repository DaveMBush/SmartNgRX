import { ActionService } from '../actions/action.service';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { updateEntity } from './update-entity.function';

jest.mock('../actions/action.service');

const feature = 'testFeature';
const entity = 'testEntity';

describe('updateEntity', () => {
  let mockActionService: { forceDirty: jest.Mock };

  beforeEach(() => {
    createStore();
    mockActionService = { forceDirty: jest.fn() };
    (ActionService as jest.Mock).mockReturnValue(mockActionService);
  });

  it('should update entities', () => {
    const ids = ['1', '2'];
    const state = {
      ids: ['1', '2', '3'],
      entities: {
        '1': { id: '1', name: 'Entity 1' },
        '2': { id: '2', name: 'Entity 2' },
        '3': { id: '3', name: 'Entity 3' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ids);

    expect(mockActionService.forceDirty).toHaveBeenCalledTimes(2);
    expect(mockActionService.forceDirty).toHaveBeenCalledWith(['1']);
    expect(mockActionService.forceDirty).toHaveBeenCalledWith(['2']);
  });

  it('should not update entities if id does not exist in state', () => {
    const ids = ['4'];
    const state = {
      ids: ['1', '2', '3'],
      entities: {
        '1': { id: '1', name: 'Entity 1' },
        '2': { id: '2', name: 'Entity 2' },
        '3': { id: '3', name: 'Entity 3' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ids);

    expect(mockActionService.forceDirty).not.toHaveBeenCalled();
  });
  it('should call forceDirty for ids that exist in the state', () => {
    const state = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1' },
        '2': { id: '2' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ['1', '2']);

    expect(mockActionService.forceDirty).toHaveBeenCalledTimes(2);
    expect(mockActionService.forceDirty).toHaveBeenCalledWith(['1']);
    expect(mockActionService.forceDirty).toHaveBeenCalledWith(['2']);
  });

  it('should not call forceDirty for ids that do not exist in the state', () => {
    const state = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1' },
        '2': { id: '2' },
      },
    };

    setState(feature, entity, state);

    updateEntity(feature, entity, ['3']);

    expect(mockActionService.forceDirty).not.toHaveBeenCalled();
  });

  it('should not call forceDirty if the feature and/or entity do not exist in the state', () => {
    const state = {};
    setState(feature, entity, state);

    updateEntity('other', entity, ['1', '2']);

    expect(mockActionService.forceDirty).not.toHaveBeenCalled();
  });
});
