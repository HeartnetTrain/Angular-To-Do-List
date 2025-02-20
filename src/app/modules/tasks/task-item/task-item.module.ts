import { NgModule } from '@angular/core';
import { TaskItemComponent } from './task-item.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaskItemComponent
  ],

  imports: [
    CommonModule,
    TranslateModule
  ],

  exports: [
    TaskItemComponent
  ]
})
export class TaskItemModule {
}
