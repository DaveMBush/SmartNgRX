export interface DepartmentDTO {
  id: string;
  name: string;
  children: { type: string; id: string }[];
}
