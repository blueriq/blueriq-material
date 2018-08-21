import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailedAction, isBlueriqError, UnauthorizedProjectAction } from '@blueriq/angular';
import { ErrorType, SessionId } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorModel } from './modules/error/error.model';

@Component({
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  sessionName: Observable<string>;
  sessionId: Observable<SessionId | null>;
  shortcut: Observable<string | null>;
  version: Observable<string | null>;
  project: Observable<string | null>;
  flow: Observable<string | null>;
  languageCode: Observable<string | null>;

  error: ErrorModel | null;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sessionName = this.route.queryParamMap.pipe(map(params => {
      const tab = params.get('tab');

      return tab ? `Main-${tab}` : 'Main';
    }));

    this.sessionId = this.route.paramMap.pipe(map(params => params.get('sessionId')));
    this.shortcut = this.route.paramMap.pipe(map(params => params.get('shortcut')));
    this.version = this.route.paramMap.pipe(map(params => params.get('version')));
    this.project = this.route.paramMap.pipe(map(params => params.get('project')));
    this.flow = this.route.paramMap.pipe(map(params => params.get('flow')));
    this.languageCode = this.route.paramMap.pipe(map(params => params.get('languageCode')));
  }

  /** Call this method to clear the error and thus removing it from view */
  clearError(): void {
    this.error = null;
  }

  /** Handler for Session Expired events */
  onSessionExpired() {
    this.error = new ErrorModel(
      ErrorType.UnknownSession,
      'Session expired',
      'Your session has expired due to inactivity'
    );
  }

  /** Handler for Flow Ended events */
  onFlowEnded() {
    this.error = new ErrorModel(
      ErrorType.FlowEnded,
      'Flow ended',
      'The flow has ended'
    );
  }

  /** Handler for unauthorized events */
  onUnauthorized(details: UnauthorizedProjectAction) {
    this.error = new ErrorModel(
      ErrorType.Unauthorized,
      'Unauthorized',
      'You are not authorized to ' + JSON.stringify(details)
    );
  }

  onError(action: FailedAction): void {
    if (isBlueriqError(action.error)) {
      const { errorType, message, title } = action.error.cause;

      this.error = new ErrorModel((errorType || ErrorType.Exception) as any, title, message);
    } else {
      this.error = new ErrorModel(ErrorType.Exception, 'Oops!', 'An unknown error occurred');
    }
  }

}
