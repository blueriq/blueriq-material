/* istanbul ignore file: this should only temporarily be a part of blueriq material, it should move to Redcow */
import { Injectable } from '@angular/core';
import { Session } from '@blueriq/angular';
import { Backend } from '@blueriq/angular/backend/common';
import { Observable, Subscriber } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { Task, TaskEvent, TaskService } from './task_service';

/** @internal */
@Injectable()
export class V2TaskService implements TaskService {
  private pushMessageObserver: Observable<TaskEvent>;
  private eventSource: EventSource;
  private lastEventId: string;
  private reconnectCounter = 0;

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
      this.initEventSource(observer);

      return () => {
        if (this.eventSource) {
          this.eventSource.close();
        }
      };
    }).pipe(share());
  }

  private initEventSource(observer: Subscriber<TaskEvent>) {
    const url = '/api/v2/push-messages' + this.lastEventId ? `?Last-Event-ID=${ this.lastEventId }` : '';
    this.eventSource = new EventSource(this.backend.toUrl(url));

    /* TODO: in the future, when we have more event types than just a TaskEvent, we should implement
     *  eventSource.onmessage instead of adding event listeners. We should not provide a type for the server sent event
     *  in the runtime, but instead wrap all messages in a class that has a type property
     */
    this.eventSource.addEventListener('taskEvent', event => {
      const messageEvent = (event as MessageEvent);
      observer.next(JSON.parse(messageEvent.data));
      this.lastEventId = messageEvent.lastEventId;
    });

    this.eventSource.onopen = () => {
      // reset reconnect counter
      this.reconnectCounter = 0;
    };
    this.eventSource.onerror = () => {
      this.eventSource.close();
      this.reconnectCounter++;
      // increase delay before trying to reconnect on every attempt, limit to 60 seconds
      setTimeout(() => this.initEventSource(observer), Math.min(2 * this.reconnectCounter, 60) * 1000);
    };
  }
}
