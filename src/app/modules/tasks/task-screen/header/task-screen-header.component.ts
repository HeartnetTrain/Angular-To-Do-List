import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-screen-header',
  standalone: false,
  templateUrl: './task-screen-header.component.html',
  styleUrl: './task-screen-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskScreenHeaderComponent implements OnInit {

  // ===================================================================================
  //                  Internal
  // ===================================================================================
  public readonly numberOfTasks = 1000;
  public loadTasksLabel: string;

  constructor(private taskService: TaskService, private translate: TranslateService) {
  }

  // ===================================================================================
  //                  Life cycle
  // ===================================================================================

  ngOnInit(): void {
    this.translate.get('TODO.APP.TASKS_LOAD', {numberOfTasks: this.numberOfTasks})
      .subscribe((translatedText: string) => {
        this.loadTasksLabel = translatedText.replace('%numberOfTasks%', this.numberOfTasks + '')
      });
  }

  // ===================================================================================
  //                  Tasks manipulation
  // ===================================================================================
  public deleteAllTasks(): void {
    this.taskService.deleteAllTasks();
  }

  public loadSampleTasks(): void {
    this.taskService.loadSampleTasks(this.numberOfTasks);
  }

}
