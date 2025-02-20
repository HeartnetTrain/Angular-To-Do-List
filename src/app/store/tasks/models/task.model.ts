export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface AppState {
  tasks: Task[];
}
