import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { taskReducer } from './store/tasks/reducers/task.reducer';
import { TaskScreenComponent } from './modules/tasks/task-screen/task-screen.component';
import { TaskListModule } from './modules/tasks/task-list/task-list.module';
import { TaskItemModule } from './modules/tasks/task-item/task-item.module';
import { TaskScreenModule } from './modules/tasks/task-screen/task-screen.module';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './custom-trasnlate-loader';

const routes: Routes = [
  {path: '', component: TaskScreenComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TaskListModule,
    TaskItemModule,
    TaskScreenModule,
    StoreModule.forRoot({tasks: taskReducer}),
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CustomTranslateLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
