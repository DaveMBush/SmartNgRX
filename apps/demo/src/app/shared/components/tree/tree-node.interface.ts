export interface TreeNode {
  id: string;
  type?: string;
  name: string;
  level: number;
  hasChildren: boolean;
  isExpanded?: boolean;
}
