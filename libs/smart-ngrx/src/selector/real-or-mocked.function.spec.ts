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
  it('returns the real value if available', () => {
    const r = realOrMocked(real, 'department1', defaultObject);

    expect(r).toEqual({
      id: 'department1',
      name: 'Department 1',
      isDirty: false,
    });
  });

  it('returns the mocked value if real one is not available', () => {
    const r = realOrMocked(real, 'department2', defaultObject);

    expect(r).toEqual({
      id: 'department2',
      name: 'to be fetched',
      isDirty: false,
    });
  });
});
