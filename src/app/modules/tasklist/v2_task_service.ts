import { Injectable } from '@angular/core';
import { Session } from '@blueriq/angular';
import { Backend } from '@blueriq/angular/backend/common';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Task, TaskEvent, TaskService } from './task_service';

/** @internal */
@Injectable()
export class V2TaskService implements TaskService {
  private taskEvents: Observable<TaskEvent>;

  constructor(private readonly backend: Backend) {
    this.taskEvents = Observable.create(observer => {
      const eventSource = new EventSource(this.backend.toUrl('/api/v2/push-messages'));
      eventSource.onmessage = messageEvent => observer.next(messageEvent.data);
      eventSource.onerror = errorEvent => observer.error(errorEvent);

      return () => {
        eventSource.close();
      };
    }).pipe(share());
  }

  getTaskEvents(containerUuid: string): Observable<TaskEvent> {
    return this.taskEvents;
    //return this.taskEvents.pipe(filter(event => event.task.identifier === containerUuid));
  }

  getAllTasks(session: Session, containerUuid: string): Observable<Task[]> {
    return this.backend.get<Task[]>(`/api/v2/session/${ session.sessionId }/tasks/${ containerUuid }`);
  }
}
