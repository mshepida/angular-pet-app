import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStorageService } from './services/todo-storage.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DefferedComponent } from './deffered/deffered.component';
import { transition, trigger, query, style, stagger, animate } from '@angular/animations';
@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DefferedComponent],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css',
  animations: [
    trigger('itemAnimation', [
      // transition(':enter', [
      //   style({ opacity: 0, transform: 'translateY(-20px)' }),
      //   animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      // ]),
      // transition(':leave', [
      //   animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      // ])
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(200, animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true }),
        query(':leave:not(button)', [
          style({ opacity: 1, transform: 'translateY(0)' }),
          stagger(-200, animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(20px)' })))
        ], { optional: true }
      ),
    ])
  ]),
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms 300ms ease-in', style({ opacity: 1 }))  // 1 second duration, 0.5 second delay
    ])
  ]),
  ]
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
