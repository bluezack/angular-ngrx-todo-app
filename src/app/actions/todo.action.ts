import { Injectable } from '@angular/core'
import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/model'

export const INIT_DATA = "[TODO] INIT";
export const INIT_DATA_SUCCESS = "[TODO] INIT DATA SUCCESS";
export const INIT_DATA_FAILED = '[TODO] INIT DATA FAILED';
export const REQUEST_ADD_TODO = '[TODO] REQUEST ADD';
export const ADD_TODO = '[TODO] ADD';
export const REQUEST_REMOVE_TODO = '[TODO] REQUEST REMOVE';
export const REMOVE_TODO = '[TODO] REMOVE';

export const initData = createAction(INIT_DATA);
export const initDataSuccess = createAction(INIT_DATA_SUCCESS, props<{ todos: Todo[] }>())
export const initDataFailed = createAction(INIT_DATA_FAILED, props<{ error: Error }>());

export const requestAddTodo = createAction(REQUEST_ADD_TODO, props<{ todo: Todo }>());
export const addTodo = createAction(ADD_TODO, props<{ todo: Todo }>());

export const requestRemoveTodo = createAction(REQUEST_REMOVE_TODO, props<{ todo: Todo }>());
export const removeTodo = createAction(REMOVE_TODO, props<{ todo: Todo }>());
