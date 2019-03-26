import { Session } from '@blueriq/angular';
import { Observable } from 'rxjs/Observable';

export interface TaskEvent {
  action: 'CANCELED' | 'COMPLETED' | 'CREATED' | 'EXPIRED' | 'UPDATED' | 'DELETED';
  taskModel: Task;
}

export interface Task {
  caseIdentifier: string;
  identifier: string;
  dueDate: Date | undefined;
  name: string;
  priority: number | undefined;
  required: boolean | undefined;
  startDate: Date | undefined;
  status: string;
  timeoutDate: Date | undefined;
  customFields: { [key: string]: string } | undefined;
  displayName: string | undefined;
}

export abstract class TaskService {
  abstract getTaskEvents(containerUuid: string): Observable<TaskEvent>;

  abstract getAllTasks(session: Session, containerUuid: string): Observable<Task[]>;
}
