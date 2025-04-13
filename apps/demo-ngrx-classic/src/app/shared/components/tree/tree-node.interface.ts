import { CommonSourceNode } from './common-source-node.interface';

export interface TreeNode {
  parentId: string;
  // even though node has name, we need it here so
  // we can edit it without impacting node.name
  // until we are ready to save.
  name: string;
  type?: string;
  node: CommonSourceNode;
  level: number;
  hasChildren: boolean;
  isExpanded?: boolean;
}
