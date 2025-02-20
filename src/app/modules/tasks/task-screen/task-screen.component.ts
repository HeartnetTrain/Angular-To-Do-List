import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Task } from '../../../store/tasks/models/task.model';
import { TaskService } from '../task.service';
import { catchError, of } from 'rxjs';
import { AppInput } from '../../core/app-input/input.model';

@Component({
  selector: 'app-task-screen',
  standalone: false,
  templateUrl: './task-screen.component.html',
  styleUrl: './task-screen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskScreenComponent implements OnInit {

  // ===================================================================================
  //                  Internal
  // ===================================================================================
  public tasks: Task[];
  public filteredTasks: Task[];
  public searchTerm = '';
  public taskToUpdate: Task;
  public errorMessage = '';
  public searchInput: AppInput;

  constructor(private store: Store<AppState>, private taskService: TaskService) {
  }

  // ===================================================================================
  //                  Lifecycle
  // ===================================================================================
  ngOnInit(): void {
    this.initTasks();
    this.initSearchInput();
  }

  private initTasks() {
    this.store.select('tasks').pipe(
      catchError(err => {
        this.errorMessage = 'TODO.APP.TASKS_LOAD_ERROR_MESSAGE';
        console.error('Error Details ', err);
        return of([]); // Return an empty array to keep the stream alive
      })
    ).subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  private initSearchInput() {
    this.searchInput = {
      value: this.searchTerm,
      placeholder: 'TODO.APP.TASKS_SEARCH',
      maxLength: 50
    };
  }

// ===================================================================================
  //                  Task CRUD
  // ===================================================================================

  public addTask(name: string): void {
    this.taskService.addTask(name);
  }

  public initTaskToUpdate(taskId: number): void {
    this.taskToUpdate = this.tasks.find(task => task.id === taskId);
  }

  public saveUpdatedTask(task: Task): void {
    this.taskService.saveUpdatedTask(task);
    this.cancelUpdate();
  }

  public cancelUpdate(): void {
    this.taskToUpdate = null;
  }

  public deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  public selectTask(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  // ===================================================================================
  //                  Task Organisation
  // ===================================================================================

  public reorderTasks(reorderedTasks: Task[]): void {
    this.taskService.reorderTasks(reorderedTasks);
  }

  // ===================================================================================
  //                  Task Filter
  // ===================================================================================
  public onSearchTermChange(newSearchTerm: string): void {
    this.searchTerm = newSearchTerm;
    this.searchTasks();
  }

  public searchTasks(): void {
    this.filteredTasks = this.taskService.filterTasksByName(this.tasks, this.searchTerm);
  }

}

