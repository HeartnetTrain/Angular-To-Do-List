import { Task } from './task.model';

export class TaskSample {
  public static getTasks(tasksNumber: number): Task[] {
    return Array.from({length: tasksNumber}).map((_, i) => {
      return {id: i + 1, name: `Task ${i + 1}`, completed: false}
    })
  }
}
