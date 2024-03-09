export interface DepartmentDTO {
  id: string;
  parentId?: string;
  name: string;
  children: { type: string; id: string }[];
}
