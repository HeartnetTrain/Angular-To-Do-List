import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskScreenComponent } from './task-screen.component';
import { TaskListModule } from '../task-list/task-list.module';
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TaskScreenHeaderModule } from './header/task-screen-header.module';
import { TaskScreenFormModule } from './form/task-screen-form.module';
import { AppInputModule } from '../../core/app-input/app-input.module';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorModule } from '../../core/error/error.module';

@NgModule({
  declarations: [
    TaskScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskListModule,
    TaskScreenHeaderModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    TaskScreenHeaderModule,
    TaskScreenFormModule,
    AppInputModule,
    TranslateModule,
    ErrorModule
  ],

  exports: [
    TaskScreenComponent
  ]
})
export class TaskScreenModule {
}
