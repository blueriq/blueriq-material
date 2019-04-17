/* istanbul ignore file: this should only temporarily be a part of blueriq material, it should move to Redcow */
import { Injectable } from '@angular/core';
import { Session } from '@blueriq/angular';
import { Backend } from '@blueriq/angular/backend/common';
import { Observable, Subscriber } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { CaseEvent, PushMessage, Task, TaskEvent, TaskService } from './task_service';

/** @internal */
@Injectable()
export class V2TaskService implements TaskService {
  private pushMessages$: Observable<PushMessage>;
  private taskEvents$: Observable<TaskEvent>;
  private caseEvents$: Observable<CaseEvent>;
  private eventSource$: EventSource;
  private lastEventId: string;
  private reconnectCounter = 0;

  constructor(private readonly backend: Backend) {
    this.initPushMessages();
    this.initCaseEvents();
    this.initTaskEvents();
  }

  getCaseEvents(containerIdentifier: string): Observable<CaseEvent> {
    return this.caseEvents$.pipe(filter(event => event.caseModel.containerIdentifier === containerIdentifier));
  }

  getTaskEvents(containerIdentifier: string): Observable<TaskEvent> {
    return this.taskEvents$.pipe(filter(event => event.taskModel.containerIdentifier === containerIdentifier));
  }

  getAllTasks(session: Session, containerUuid: string): Observable<Task[]> {
    return this.backend.get<Task[]>(`/api/v2/session/${ session.sessionId }/tasks/${ containerUuid }`).pipe(map(response => response.data));
  }

  private initPushMessages(): void {
    this.pushMessages$ = new Observable<PushMessage>(observer => {
      this.initEventSource(observer);

      return () => {
        if (this.eventSource$) {
          this.eventSource$.close();
        }
      };
    }).pipe(share());
  }

  private initCaseEvents() {
    this.caseEvents$ = this.pushMessages$.pipe(
      filter(message => message.type === 'caseEvent'),
      map(event => event.data as CaseEvent),
    );
  }

  private initTaskEvents() {
    this.taskEvents$ = this.pushMessages$.pipe(
      filter(message => message.type === 'taskEvent'),
      map(event => event.data as TaskEvent),
    );
  }

  private initEventSource(observer: Subscriber<PushMessage>) {
    const url = '/api/v2/push-messages' + (this.lastEventId ? `?Last-Event-ID=${ this.lastEventId }` : '');
    this.eventSource$ = new EventSource(this.backend.toUrl(url));

    this.eventSource$.onmessage = (event) => {
      observer.next(JSON.parse(event.data) as PushMessage);
      this.lastEventId = event.lastEventId;
    };

    this.eventSource$.onopen = () => {
      // reset reconnect counter
      this.reconnectCounter = 0;
    };

    this.eventSource$.onerror = () => {
      this.eventSource$.close();
      this.reconnectCounter++;
      // increase delay before trying to reconnect on every attempt, limit to 60 seconds
      setTimeout(() => this.initEventSource(observer), Math.min(2 * this.reconnectCounter, 60) * 1000);
    };
  }
}
