import { createSelector } from '@ngrx/store';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { createSmartSelector } from '@davembush/dynamic-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@davembush/dynamic-ngrx/types/mark-and-delete-selector.type';

import { selectSharedState } from '../../shared.selectors';
import { spaceChildActions } from '../space-children/space-child.actions';
import { selectSpaceChildren } from '../space-children/space-child.selector';
import { Space } from './space.interface';

export const selectSpaces = createSelector(selectSharedState, (state) => {
  return state.spaces;
});

export const selectSpacesChildren = createSmartSelector<Space>(
  // parent table selector
  selectSpaces,
  [
    {
      childAction: spaceChildActions.loadByIds,
      childName: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectSpaceChildren),
      defaultChildRow: {
        id: '',
        name: 'children',
        children: [],
        isDirty: false,
      },
    },
  ]
);
