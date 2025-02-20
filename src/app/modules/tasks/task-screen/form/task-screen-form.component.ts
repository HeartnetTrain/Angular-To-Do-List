import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Task } from '../../../../store/tasks/models/task.model';
import { AppInput } from '../../../core/app-input/input.model';

@Component({
  selector: 'app-task-screen-form',
  standalone: false,
  templateUrl: './task-screen-form.component.html',
  styleUrl: './task-screen-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TaskScreenFormComponent implements OnChanges, OnInit {

  // ===================================================================================
  //                  Attributes
  // ===================================================================================
  @Input() taskToUpdate: Task;
  @Output() addedTask = new EventEmitter<string>();
  @Output() savedTask = new EventEmitter<Task>();
  @Output() canceledUpdate = new EventEmitter<void>();

  // ===================================================================================
  //                  Internal
  // ===================================================================================
  public updatedTaskInput: AppInput;
  public newTaskInput: AppInput;

  constructor() {
  }


  // ===================================================================================
  //                  Lifecycle
  // ===================================================================================

  ngOnInit() {
    this.initNewTaskInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToUpdate'] && !changes['taskToUpdate'].isFirstChange()) {
      this.initUpdatedTaskInput();
    }
  }

  private initUpdatedTaskInput() {
    this.updatedTaskInput = {
      value: this.taskToUpdate?.name,
      placeholder: 'TODO.APP.TASKS_EDIT',
      maxLength: 50,
      buttons: [
        {icon: 'save', action: () => this.saveUpdatedTask(), buttonClass: 'app-task-screen__save-task'},
        {icon: 'cancel', action: () => this.cancelUpdate(), buttonClass: 'app-task-screen__save-task'}
      ]
    }
  }

  private initNewTaskInput() {
    this.newTaskInput = {
      value: '',
      placeholder: 'TODO.APP.TASKS_ADD',
      maxLength: 50,
      buttons: [
        {icon: 'add', action: () => this.addTask(), buttonClass: 'app-task-screen__save-task'}
      ]
    }
  }

  // ===================================================================================
  //                  Add and Update task
  // ===================================================================================
  public addTask(): void {
    const newTaskName = this.newTaskInput?.value.trim();
    if (newTaskName) {
      this.addedTask.emit(newTaskName);
      this.newTaskInput.value = '';
    }
  }

  public saveUpdatedTask(): void {
    const newTaskName = this.updatedTaskInput?.value.trim()
    if (newTaskName) {
      this.savedTask.emit({...this.taskToUpdate, name: newTaskName});
    }
  }

  public cancelUpdate(): void {
    this.updatedTaskInput = null;
    this.canceledUpdate.emit();
  }
}
