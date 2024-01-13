import { actionFactory } from '../functions/action.factory';
import { realOrMocked } from './real-or-mocked.function';

const real = {
  ids: ['department1'],
  entities: {
    department1: {
      id: 'department1',
      name: 'Department 1',
      isDirty: false,
    },
  },
};

const defaultObject = {
  id: 'department2',
  name: 'to be fetched',
  isDirty: false,
};

describe('realOrMocked', () => {
  const actions = actionFactory('feature', 'entity');
  it('returns the real value if available', () => {
    const r = realOrMocked(real, 'department1', defaultObject, actions);

    expect(JSON.parse(JSON.stringify(r))).toEqual({
      id: 'department1',
      name: 'Department 1',
      isDirty: false,
    });
  });

  it('returns the mocked value if real one is not available', () => {
    const r = realOrMocked(real, 'department2', defaultObject, actions);

    expect(r).toEqual({
      id: 'department2',
      name: 'to be fetched',
      isDirty: false,
    });
  });
});
