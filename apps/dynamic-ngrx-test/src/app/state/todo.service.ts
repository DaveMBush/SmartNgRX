import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EffectService } from '@davembush/dynamic-ngrx';

import { Todo } from './todo.interface';

@Injectable()
export class TodoService implements EffectService<Todo> {
    load(): Observable<Todo[]> {
      return of([{id: 'a',title: 'Title', status: 'pending'}]);
    }
}