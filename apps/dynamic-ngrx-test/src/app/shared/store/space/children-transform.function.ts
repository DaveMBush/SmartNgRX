import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';

import { Space } from './space.interface';

export function childrenTransform(spaces: Space[]): Space[] {
  return spaces.map((space) => {
    space.children = space.children.map((child) => {
      const c = castTo<{ type: string; id: string }>(child);
      return c.type + ':' + c.id;
    });
    return space;
  });
}
