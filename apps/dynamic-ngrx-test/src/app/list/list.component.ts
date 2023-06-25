import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAll } from '../state/todo.selectors';
import { actionFactory } from '../state/functions/action.factory';

@Component({
  selector: 'list',
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
  todos$ = this.store.select(selectAll);
  constructor() {
    const actions = actionFactory('todo');
    this.store.dispatch(actions.load());
  }

}
