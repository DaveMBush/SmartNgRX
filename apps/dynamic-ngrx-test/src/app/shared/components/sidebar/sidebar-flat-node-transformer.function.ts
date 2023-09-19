import { SidebarCommonSourceNode } from './sidebar-common-source-node';
import { SidebarNode } from './sidebar-node';

export const sidebarFlatNodeTransformer = (
  node: SidebarCommonSourceNode | string,
  level: number
): SidebarNode => {
  return typeof node === 'string'
    ? { id: node, name: '', level, hasChildren: false }
    : {
        hasChildren: Boolean(node.children),
        name: node.name,
        level: level ?? 0,
        id: node.id,
      };
};
