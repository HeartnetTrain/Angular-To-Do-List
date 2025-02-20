import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskListComponent } from './task-list.component';
import { TaskItemModule } from '../task-item/task-item.module';
import { CommonModule } from '@angular/common';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    TaskListComponent,
  ],
  imports: [
    FormsModule,
    DragDropModule,
    TaskItemModule,
    CommonModule,
    CdkVirtualForOf
  ],

  exports: [
    TaskListComponent
  ]
})
export class TaskListModule {
}
