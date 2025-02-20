import { createReducer, on } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { Task } from '../models/task.model';

const TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const loadState = (): Task[] => {
  const savedState = localStorage.getItem('tasks');
  const savedTimestamp = localStorage.getItem('tasks_timestamp');
  if (savedState && savedTimestamp) {
    const currentTime = Date.now();
    if (currentTime - parseInt(savedTimestamp) < TTL) {
      return JSON.parse(savedState);
    }
  }
  localStorage.removeItem('tasks');
  localStorage.removeItem('tasks_timestamp');
  return [];
};

const saveState = (state: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(state));
  localStorage.setItem('tasks_timestamp', Date.now().toString());
};

const initialState: Task[] = loadState();

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, {name}) => {
    const newState = [...state, {id: state.length + 1, name, completed: false}];
    saveState(newState);
    return newState;
  }),
  on(TaskActions.updateTask, (state, {id, name}) => {
    const newState = state.map(task => (task.id === id ? {...task, name} : task));
    saveState(newState);
    return newState;
  }),
  on(TaskActions.deleteTask, (state, {id}) => {
    const newState = state.filter(task => task.id !== id);
    saveState(newState);
    return newState;
  }),
  on(TaskActions.deleteAllTasks, () => {
    const newState: Task[] = [];
    saveState(newState);
    return newState;
  }),
  on(TaskActions.loadSampleTasks, (state, {tasks}) => {
    const newState = [...state, ...tasks];
    saveState(newState);
    return newState;
  }),
  on(TaskActions.toggleTaskCompletion, (state, {id}) => {
    const newState = state.map(task => (task.id === id ? {...task, completed: !task.completed} : task));
    saveState(newState);
    return newState;
  }),
  on(TaskActions.reorderTasks, (state, {tasks}) => {
    saveState(tasks);
    return tasks;
  })
);
