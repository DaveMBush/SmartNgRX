export interface DocOutDTO {
  did: string;
  name: string;
}

export interface DocInDTO {
  id?: string;
  name: string;
  parentId?: string;
  version: number;
}
