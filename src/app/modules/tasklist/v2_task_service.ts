import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Backend } from '@blueriq/angular/backend/common';
import { Observable } from 'rxjs';
import { Task, TaskEvent, TaskService } from './task_service';

/** @internal */
@Injectable()
export class V2TaskService implements TaskService {

  constructor(private readonly backend: Backend, private readonly session: BlueriqSession) {
  }

  getTaskEvents(): Observable<TaskEvent> {
    return this.backend.get<TaskEvent>('/api/v2/push-messages');
  }

  getAllTasks(containerId: string): Observable<Task[]> {
    return this.backend.get<Task[]>(`/api/v2/session/${ this.session.sessionId }/tasks/${ containerId }`);
  }
}
