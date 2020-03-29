import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/model';
import { TodoService } from '../../services/todo.service';
import { initData, removeTodo } from '../../actions/todo.action';
import { Observable, Subscription, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { TodosState } from '../../reducers/todo.reducer';
import { requestAddTodo, requestRemoveTodo } from '../../actions/todo.action';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todosState$: Observable<TodosState>;
  todos: Todo[];
  todosSubscription: Subscription;

  constructor(private store: Store<{ todos: any }>) {
    this.todosState$ = this.store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.store.dispatch(initData());
    this.todosSubscription = this.todosState$
      .subscribe(x => this.todos = x.data);
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(requestRemoveTodo({ todo }));
  }

  addTodo(todo: any) {
    this.store.dispatch(requestAddTodo({ todo }));
  }
}
