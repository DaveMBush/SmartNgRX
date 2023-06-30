import { selectorFactory } from '@davembush/dynamic-ngrx';

import { Todo } from './todo.interface';


export const { selectAll } = selectorFactory<Todo>('list');
