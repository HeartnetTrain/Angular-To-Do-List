import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskScreenFormComponent } from './task-screen-form.component';
import { FormsModule } from '@angular/forms';
import { AppInputModule } from '../../../core/app-input/app-input.module';

@NgModule({
  declarations: [
    TaskScreenFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppInputModule
  ],
  exports: [
    TaskScreenFormComponent
  ]
})
export class TaskScreenFormModule {
}
