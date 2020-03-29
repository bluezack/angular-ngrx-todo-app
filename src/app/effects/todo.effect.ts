import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, act } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

import { initData, initDataSuccess, initDataFailed, requestAddTodo, addTodo, requestRemoveTodo, removeTodo } from '../actions/todo.action';

@Injectable()
export class TodoEffects {

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(initData),
        mergeMap(() => this.todoService.getTodos()
            .pipe(
                map(todos => {
                    return initDataSuccess({ todos: todos })
                }),
                catchError((error) => of(initDataFailed({ error })))
            ))
    ));

    addTodo$ = createEffect(() => this.actions$.pipe(
        ofType(requestAddTodo),
        exhaustMap(
            (action) => this.todoService.addTodo(action.todo)
                .pipe(
                    map(todo => {
                        return addTodo({ todo });
                    }),
                    catchError((e) => {
                        console.log(e);
                        return EMPTY
                    })
                ))
    ));

    removeTodo$ = createEffect(() => this.actions$.pipe(
        ofType(requestRemoveTodo),
        exhaustMap(
            (action) => this.todoService.deleteTodo(action.todo)
                .pipe(
                    map(todo => {
                        return removeTodo({ todo: action.todo });
                    }),
                    catchError(() => EMPTY)
                )
        )
    ));

    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) { }
}