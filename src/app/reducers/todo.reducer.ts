import { Action, createReducer, on } from '@ngrx/store';
import * as todoActions from '../actions/todo.action';
import { Todo } from '../models/model';

export interface TodosState {
    data: Todo[];
    idLoaded: boolean;
}


export const initialState: TodosState = {
    data: [],
    idLoaded: false,
};

const todoReducer = createReducer(
    initialState,
    on(todoActions.addTodo, (state, payload) => ({ ...state, data: [...state.data, payload.todo] })),
    // on(todoActions.removeTodo, (state, payload) => ({ ...state, data: state.data.filter(t => t.id != payload.todo.id) })),
    on(todoActions.removeTodo, (state, payload) => {
        console.log(payload);
        return ({ ...state, data: state.data.filter(t => t.id != payload.todo.id) })
    }),

    on(todoActions.initDataSuccess, (state, payload) => {
        return { ...state, isLoaded: true, data: payload.todos }
    })
)


export function reducer(state: TodosState | undefined, action: Action) {
    return todoReducer(state, action);
}