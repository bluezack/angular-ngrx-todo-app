import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Todo } from '../models/model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  urlTodos: string = 'http://localhost:1337/todos';
  limit: string = '?_limit=5'
  constructor(private http: HttpClient) {

  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.urlTodos);
  }

  toggleTodoCompleted(todo): Observable<any> {
    const url = `${this.urlTodos}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo): Observable<Todo> {
    const url = this.urlTodos + '/' + todo.id;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo): Observable<Todo> {
    const url = this.urlTodos;
    return this.http.post<Todo>(url, todo, httpOptions);
  }

}
