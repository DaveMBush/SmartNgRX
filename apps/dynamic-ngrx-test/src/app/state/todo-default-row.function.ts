import { Todo } from "./todo.interface";

export function todoDefaultRow(id: string): Todo {
  return {
    id,
    title: '',
    status: 'pending',
  };
}
