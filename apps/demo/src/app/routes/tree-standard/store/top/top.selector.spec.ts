// jscpd:ignore-start
// intentionally duplicated.
import { MockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import { createStore, setState, store } from '@smart/smart-ngrx';

import { selectLocations, selectTopLocations } from './top.selector';

describe('Top Selectors', () => {
  const initialTop = {
    entities: {
      '1': {
        id: '1',
        locations: ['Location 1', 'Location 2'],
      },
    },
    ids: ['1'],
  };

  beforeEach(() => {
    createStore();
    setState('tree-no-dirty', 'top', initialTop);
    (store() as MockStore).overrideSelector(selectTopLocations, initialTop);
  });

  it('should select the locations of the single top', async () => {
    const expected = ['Location 1', 'Location 2'];

    const actual = await firstValueFrom(store().select(selectLocations));

    expect(actual).toEqual(expected);
  });

  it('should return an empty array if there are no tops', async () => {
    const expected = [] as Location[];

    (store() as MockStore).overrideSelector(selectTopLocations, {
      entities: {},
      ids: [],
    });
    (store() as MockStore).refreshState();

    const actual = await firstValueFrom(store().select(selectLocations));

    expect(actual).toEqual(expected);
  });
});
// jscpd:ignore-end
