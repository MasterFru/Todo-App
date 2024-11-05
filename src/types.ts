export interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  important: boolean;
  dueDate: string | null;
  dueTime: string | null;
  section: string;
  subTasks: SubTask[];
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Section {
  id: string;
  name: string;
}