import { Observable } from 'rxjs/Observable';

export interface TaskEvent {
  action: 'CREATED' | 'UPDATED' | 'DELETED';
  task: Task;
}

export interface Task {
  id: number;
  displayName: string;
  creationDate: Date;
  dueDate: Date | undefined;
  assignedTo: string | undefined;
  identifier: string;
}

export abstract class TaskService {
  abstract getTaskEvents(): Observable<TaskEvent>;

  abstract getAllTasks(containerId: string): Observable<Task[]>;
}
