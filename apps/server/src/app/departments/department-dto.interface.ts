export interface DepartmentDTO {
  id: string;
  parentId?: string;
  name: string;
  children: {
    /** starting index for the ids to be filled into the virtual array */
    startIndex: number;
    /** the ids to put into the virtual array */
    indexes: string[];
    /** the total number of ids in the virtual array */
    length: number;
  };
}
