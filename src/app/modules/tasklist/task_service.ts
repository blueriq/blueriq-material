import { Session } from '@blueriq/angular';
import { Observable } from 'rxjs';

export interface PushMessage {
  type: string;
  data: any;
}

export interface CaseEvent {
  action: 'CREATED' | 'UPDATED' | 'DELETED';
  caseModel: Case;
}

export interface TaskEvent {
  action: 'CANCELED' | 'COMPLETED' | 'CREATED' | 'EXPIRED' | 'UPDATED' | 'DELETED';
  taskModel: Task;
}

export interface Case {
  containerIdentifier: string;
  status: 'OPEN' | 'LOCKED' | 'CLOSED';
}

export interface Task {
  containerIdentifier: string;
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
  caseLocked: boolean | undefined;
}

export abstract class TaskService {
  abstract getCaseEvents(containerUuid: string): Observable<CaseEvent>;

  abstract getTaskEvents(containerUuid: string): Observable<TaskEvent>;

  abstract getAllTasks(session: Session, containerUuid: string): Observable<Task[]>;
}
