export interface SidebarCommonSourceNode {
  id: string;
  type?: string;
  name: string;
  children: SidebarCommonSourceNode[] | string[];
}
