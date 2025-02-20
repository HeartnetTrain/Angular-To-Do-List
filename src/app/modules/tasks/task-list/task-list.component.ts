import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../store/tasks/models/task.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  // ===================================================================================
  //                  Attributes
  // ===================================================================================
  @Input() tasks: Task[];
  @Output() update = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() select = new EventEmitter<number>();
  @Output() reorder = new EventEmitter<Task[]>();

  // ===================================================================================
  //                  Reorder tasks
  // ===================================================================================
  public drop(event: CdkDragDrop<Task[]>) {
    if (this.tasks) {
      const reorderedTasks = [...this.tasks];
      moveItemInArray(reorderedTasks, event.previousIndex, event.currentIndex);
      this.reorder.emit(reorderedTasks);
    }
  }

  // ===================================================================================
  //                  Track Task Element
  // ===================================================================================

  /**  Helps Angular track and identify each item in the tasks array */
  public trackElementFunction(index: number, element: any): number {
    return (<Task>element).id;
  }

}
