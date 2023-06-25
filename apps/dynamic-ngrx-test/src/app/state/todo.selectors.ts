import { Todo } from './todo.interface';
import { selectorFactory } from '@davembush/dynamic-ngrx';


export const { selectAll } = selectorFactory<Todo>('list');
