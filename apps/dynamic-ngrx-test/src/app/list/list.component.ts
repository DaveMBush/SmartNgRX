import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { actionFactory } from '@davembush/dynamic-ngrx';

import { Todo } from '../state/todo.interface';
import { selectAll } from '../state/todo.selectors';

@Component({
  selector: 'dmb-list',
  standalone: true,
  imports: [
    CommonModule
    ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  store = inject(Store);
  todos = this.store.select(selectAll);
  constructor() {
    const actions = actionFactory('todo');
    this.store.dispatch(actions.load());
  }

  trackBy(_: number, item: Todo): string {
    return item.id;
  }

}
