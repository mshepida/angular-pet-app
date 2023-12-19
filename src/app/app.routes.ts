import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { AnimationsAppComponent } from './animations-app/animations-app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todo-app', pathMatch: 'full' },
  { path: 'todo-app', component: TodoAppComponent },
  { path: 'animations-app', component: AnimationsAppComponent }
];
