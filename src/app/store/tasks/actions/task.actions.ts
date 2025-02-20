import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const addTask = createAction('[Task] Add Task', props<{ name: string }>());
export const updateTask = createAction('[Task] Edit Task', props<{ id: number; name: string }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());
export const deleteAllTasks = createAction('[Tasks] Delete All Tasks');
export const loadSampleTasks = createAction('[Tasks] Load Sample Tasks', props<{ tasks: Task[] }>());
export const toggleTaskCompletion = createAction('[Task] Toggle Task Completion', props<{ id: number }>());
export const reorderTasks = createAction('[Task] Reorder Tasks', props<{ tasks: Task[] }>());

