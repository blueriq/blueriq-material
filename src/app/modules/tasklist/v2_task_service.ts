/* istanbul ignore file: this should only temporarily be a part of blueriq material, it should move to Redcow */
import { Injectable } from '@angular/core';
import { Session } from '@blueriq/angular';
import { Backend } from '@blueriq/angular/backend/common';
import { Observable } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { Task, TaskEvent, TaskService } from './task_service';

/** @internal */
@Injectable()
export class V2TaskService implements TaskService {
  private pushMessageObserver: Observable<TaskEvent>;

  constructor(private readonly backend: Backend) {
    this.initPushMessageObserver();
  }

  getTaskEvents(containerUuid: string): Observable<TaskEvent> {
    return this.pushMessageObserver.pipe(filter(event => event.taskModel.caseIdentifier === containerUuid));
  }

  getAllTasks(session: Session, containerUuid: string): Observable<Task[]> {
    return this.backend.get<Task[]>(`/api/v2/session/${ session.sessionId }/tasks/${ containerUuid }`).pipe(map(response => response.data));
  }

  private initPushMessageObserver(): void {
    this.pushMessageObserver = new Observable<TaskEvent>(observer => {
      const eventSource = new EventSource(this.backend.toUrl('/api/v2/push-messages'));

      /* TODO: in the future, when we have more event types than just a TaskEvent, we should implement
       *  eventSource.onmessage instead of adding event listeners. We should not provide a type for the server sent event
       *  in the runtime, but instead wrap all messages in a class that has a type property
       */
      eventSource.addEventListener('taskEvent', messageEvent => {
        observer.next(JSON.parse((messageEvent as MessageEvent).data));
      });

      eventSource.onerror = errorEvent => {
        observer.error(errorEvent);
      };

      return () => {
        eventSource.close();
      };
    }).pipe(share());
  }
}
