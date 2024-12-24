// jscpd:ignore-start
// intentionally duplicated.
import { MockStore } from '@ngrx/store/testing';
import { createStore, setState, store } from '@smarttools/smart-ngrx';
import { firstValueFrom } from 'rxjs';

import { selectLocations } from '../locations/selectors/select-locations.selector';
import { selectTopLocations } from './select-top-locations.selectors';

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
    setState('tree-standard', 'top', initialTop);
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
