import { Component, isDevMode, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailedAction, ForbiddenProjectAction, isBlueriqError, QueryParameters, UnauthorizedProjectAction } from '@blueriq/angular';
import { SessionId } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { NotificationModel, NotificationType } from './notification-overlay/notification.model';

@Component({
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {

  sessionName: Observable<string>;
  sessionId: Observable<SessionId | null>;
  shortcut: Observable<string | null>;
  version: Observable<string | null>;
  project: Observable<string | null>;
  flow: Observable<string | null>;
  languageCode: Observable<string | null>;
  parameters: Observable<QueryParameters | null>;

  notification: NotificationModel | undefined;

  constructor(private readonly auth: AuthService,
              private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.sessionName = this.route.queryParamMap.pipe(map(params => {
      const tab = params.get('tab');

      return tab ? `Main-${ tab }` : 'Main';
    }));
    this.sessionId = this.route.paramMap.pipe(map(params => params.get('sessionId')));
    this.shortcut = this.route.paramMap.pipe(map(params => params.get('shortcut')));
    this.version = this.route.paramMap.pipe(map(params => params.get('version')));
    this.project = this.route.paramMap.pipe(map(params => params.get('project')));
    this.flow = this.route.paramMap.pipe(map(params => params.get('flow')));
    this.languageCode = this.route.paramMap.pipe(map(params => params.get('languageCode')));
    this.parameters = this.route.queryParams;
  }

  /** Handler for Session Expired events */
  onSessionExpired() {
    this.notification = new NotificationModel(
      NotificationType.SessionExpired,
      'Session expired',
      'Your session has expired due to inactivity',
    );
  }

  /** Handler for Flow Ended events */
  onFlowEnded() {
    this.notification = new NotificationModel(
      NotificationType.Error,
      'Flow ended',
      'The flow has ended',
    );
  }

  /** Handler for unauthorized events, navigates to login page */
  onUnauthorized(details: UnauthorizedProjectAction) {
    this.auth.navigateToLogin();
  }

  /** Handler for forbidden events, shows error with logout button */
  onForbidden(action: ForbiddenProjectAction) {
    this.notification = new NotificationModel(NotificationType.Error, 'Forbidden', action.error.cause.message);
    this.notification.dismiss = this.auth.canLogout() ? {
      label: 'Logout',
      action: () => this.auth.logoutAndNavigate(),
    } : undefined;
  }

  /** Handler for technical failures, shows error that can be dismissed */
  onError(action: FailedAction): void {
    if (isDevMode()) {
      console.error(action);
    }
    if (isBlueriqError(action.error)) {
      const { title, message } = action.error.cause;

      this.notification = new NotificationModel(NotificationType.Error, title, message);
    } else {
      this.notification = new NotificationModel(NotificationType.Error, 'Oops!', 'An unknown error occurred');
    }

    this.notification.dismiss = {
      label: 'Dismiss',
      action: () => {
        this.notification = undefined;
      },
    };
  }
}
