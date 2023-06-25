import { Injectable } from '@angular/core';
import { EffectService } from '@davembush/dynamic-ngrx';
import { Todo } from './todo.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class TodoService implements EffectService<Todo> {
    load(): Observable<Todo[]> {
      return of([{id: 'a',title: 'Title', status: 'pending'}]);
    }
}
