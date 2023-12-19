import { Injectable, computed, effect, signal } from '@angular/core';


export type TodoItemState = 'active' | 'completed';

export interface TodoItem {
  name: string;
  id: number;
  state: TodoItemState;
}

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
  private readonly LOCALSTORAGE_KEY = 'angular-pdp-app-todo-items';
  private todoItems = signal<TodoItem[]>(JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY) || '[]'));
  private uncompletedTodoItemsCount = computed(() => {
    return this.todoItems().filter(item => item.state === 'active').length;
  });


  getTodoItems() {
    return this.todoItems;
  }

  getUncompletedTodoItemsCount() {
    return this.uncompletedTodoItemsCount;
  }

  addTodoItem(itemName: string) {
    this.todoItems.update(todoItems => {
      return todoItems.concat({
        name: itemName,
        state: 'active',
        id: todoItems.length + 1
      });
    })
  }

  removeTodoItem(id: number) {
    this.todoItems.update(todoItems => {
      return todoItems.filter(item => item.id !== id);
    })
  }

  completeTodoItem(id: number, ) {
    this.todoItems.update(todoItems => {
      return todoItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            state: 'completed'
          }
        } else {
          return item
        }
      }
    )
  })
}

  private todoItemsEffect = effect(() => {
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.todoItems()));
  })
}
