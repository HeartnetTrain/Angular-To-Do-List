import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Task } from '../../../store/tasks/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {

  // ===================================================================================
  //                  Attributes
  // ===================================================================================
  @Input() task: Task;
  @Output() updatedTaskInitialized = new EventEmitter<number>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskSelected = new EventEmitter<number>();

  // ===================================================================================
  //                  CRUD Event emitters
  // ===================================================================================
  public initUpdate(): void {
    this.updatedTaskInitialized.emit(this.task.id);
  }

  public delete(): void {
    this.taskDeleted.emit(this.task.id);
  }

  public select(): void {
    this.taskSelected.emit(this.task.id);
  }

}
