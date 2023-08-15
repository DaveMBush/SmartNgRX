import { realOrMocked } from './real-or-mocked.function';

const real = {
  ids: ['space1'],
  entities: {
    space1: {
      id: 'space1',
      name: 'Space 1',
    },
  },
};

const defaultObject = {
  name: 'to be fetched',
};

describe('realOrMocked', () => {
  it('returns the real value if available', () => {
    const r = realOrMocked(real, 'space1', defaultObject);

    expect(r).toEqual({
      id: 'space1',
      name: 'Space 1',
    });
  });

  it('returns the mocked value if real one is not available', () => {
    const r = realOrMocked(real, 'space2', defaultObject);

    expect(r).toEqual({
      id: 'space2',
      name: 'to be fetched',
    });
  });
});
