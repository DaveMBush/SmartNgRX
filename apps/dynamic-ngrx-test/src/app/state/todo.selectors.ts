import { Todo } from './todo.interface';
import { selectorFactory } from './functions/selector.factory';


export const { selectAll } = selectorFactory<Todo>('list');
