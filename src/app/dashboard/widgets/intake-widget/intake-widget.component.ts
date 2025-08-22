import {Component, isDevMode} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FailedAction, isBlueriqError} from '@blueriq/angular';
import {BlueriqDashboard, DashboardAuthService, DashboardWidgetSession} from '@blueriq/dashboard';
import {NotificationModel, NotificationType} from '../../../notification-overlay/notification.model';
import {SessionWidgetComponent} from '../session-widget.component';

@Component({
  selector: 'bq-intake-widget',
  templateUrl: './intake-widget.component.html',
  providers: [DashboardWidgetSession],
})
export class IntakeWidgetComponent extends SessionWidgetComponent {

  notification: NotificationModel | undefined;

  constructor(
    route: ActivatedRoute,
    widgetSession: DashboardWidgetSession,
    dashboard: BlueriqDashboard,
    authService: DashboardAuthService,
  ) {
    super(route, widgetSession, dashboard, authService);
  }

  onSessionExpired(): void {
    this.notification = new NotificationModel(
      NotificationType.SessionExpired,
      'Intake Session Expired',
      'The case intake session has expired.');
  }

  onError(action: FailedAction): void {
    if (isDevMode()) {
      console.error(action);
    }

    if (isBlueriqError(action.error)) {
      const {title, message} = action.error.cause;
      this.notification = new NotificationModel(NotificationType.Error, title, message);
    } else {
      this.notification = new NotificationModel(
        NotificationType.Error,
        'Oops!',
        'An unknown error occurred');
    }
  }

  onFlowEnded(): void {
    this.notification = new NotificationModel(
      NotificationType.Info,
      'Case intake completed',
      'The case intake has been completed.');
  }

  onForbidden(): void {
    this.notification = new NotificationModel(
      NotificationType.Error,
      'Forbidden',
      'You are not allowed to start this case intake.');
  }
}
