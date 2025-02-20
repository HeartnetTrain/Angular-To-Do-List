import { Injectable } from '@angular/core';
import { AppState, Task } from '../../store/tasks/models/task.model';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/tasks/actions/task.actions';
import { TaskSample } from '../../store/tasks/models/task-sample';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private store: Store<AppState>) {
  }

  /** Add a new task
   * @param name - The task name to be added
   * */
  public addTask(name: string): void {
    this.store.dispatch(TaskActions.addTask({name}));
  }

  /** Save an updated task
   * @param task - The updated task to be saved ( name modified )
   * */
  public saveUpdatedTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({id: task.id, name: task.name}));
  }

  /** Delete a single task
   * @param taskId - task Id to be deleted
   * */
  public deleteTask(taskId: number): void {
    this.store.dispatch(TaskActions.deleteTask({id: taskId}));
  }

  /** Mark a task as completed
   * @param taskId - task Id to be marked as completed
   * */
  public toggleTaskCompletion(taskId: number): void {
    this.store.dispatch(TaskActions.toggleTaskCompletion({id: taskId}));
  }

  /** Change the order of tasks
   * @param tasks - the new list of ordered tasks
   * */
  public reorderTasks(tasks: Task[]): void {
    this.store.dispatch(TaskActions.reorderTasks({tasks}));
  }

  /**
   * An easy way to delete all tasks at once
   * */
  public deleteAllTasks(): void {
    this.store.dispatch(TaskActions.deleteAllTasks());
  }

  /**
   * An easy way to create a specific number of tasks at once
   * (Allows to test the performance of the app with a large number of tasks)
   * @param numberOfTasks - number of tasks to be created
   * */
  public loadSampleTasks(numberOfTasks: number): void {
    const sampleTasks = TaskSample.getTasks(numberOfTasks);
    this.store.dispatch(TaskActions.loadSampleTasks({tasks: sampleTasks}))
  }

  /**
   * Renders a new list of tasks based on the inclusion of a filter term
   * @param tasks - list of tasks to be filtered
   * @param filterTerm - a string to filter upon the list of tasks
   * */
  public filterTasksByName(tasks: Task[], filterTerm: string): Task[] {
    if (!tasks || !tasks.length) return tasks;
    const filteredTasks: Task[] = [...tasks];
    return filteredTasks.filter(task =>
      task.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }

}
