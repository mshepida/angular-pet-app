import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStorageService } from './services/todo-storage.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DefferedComponent } from './deffered/deffered.component';


@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DefferedComponent],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css'
})
export class TodoAppComponent {
  todoStorageService = inject(TodoStorageService);
  todoItems = this.todoStorageService.getTodoItems();
  uncompletedTodoItemsCount = this.todoStorageService.getUncompletedTodoItemsCount();
  inputField = new FormControl();

  get counterText() {
    if (this.uncompletedTodoItemsCount() === 0) {
      return 'Nothing to do, yay!';
    } else {
      return this.uncompletedTodoItemsCount() === 1 ? '1 todo item left' : `${this.uncompletedTodoItemsCount()} todo items left`;
    }
  }

  onAddTodoItem() {
    this.todoStorageService.addTodoItem(this.inputField.value);
    this.inputField.setValue('');
  }

  onDelete(id: number) {
    this.todoStorageService.removeTodoItem(id);
  }

  onComplete(id: number) {
    this.todoStorageService.completeTodoItem(id);
  }
}
