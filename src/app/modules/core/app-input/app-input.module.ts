import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppInputComponent } from './app-input.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    AppInputComponent
  ]
})
export class AppInputModule {
}
