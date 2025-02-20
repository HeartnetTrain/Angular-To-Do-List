import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskScreenHeaderComponent } from './task-screen-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TaskScreenHeaderComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TaskScreenHeaderComponent
  ]
})
export class TaskScreenHeaderModule {
}
