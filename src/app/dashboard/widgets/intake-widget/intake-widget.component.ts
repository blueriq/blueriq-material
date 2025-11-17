import { Component, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseCreatedAction, Dispatcher, FailedAction, IntakeCompletedAction, isBlueriqError } from '@blueriq/angular';
import { BlueriqDashboard, DashboardAuthService, DashboardWidgetSession, OpenCaseAction } from '@blueriq/dashboard';
import { NotificationModel, NotificationType } from '../../../notification-overlay/notification.model';
import { SessionWidgetComponent } from '../session-widget.component';

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
    private readonly dispatcher: Dispatcher,
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
      const { title, message } = action.error.cause;
      this.notification = new NotificationModel(NotificationType.Error, title, message);
    } else {
      this.notification = new NotificationModel(
        NotificationType.Error,
        'Oops!',
        'An unknown error occurred');
    }
  }

  onForbidden(): void {
    this.notification = new NotificationModel(
      NotificationType.Error,
      'Forbidden',
      'You are not allowed to start this case intake.');
  }

  onIntakeCompleted(action: IntakeCompletedAction): void {
    this.notification = new NotificationModel(
      NotificationType.Info,
      'Intake Completed',
      `The case intake has been completed. You will be redirected to the case with reference '${action.reference}' when it is ready.`);
  }

  onIntakeAborted(): void {
    this.notification = new NotificationModel(
      NotificationType.Info,
      'Intake Aborted',
      'The case intake has been aborted.');
    this.notification.dismiss = {
      label: 'Dismiss',
      action: () => {
        this.notification = undefined;
      },
    };
  }

  onCaseCreated(action: CaseCreatedAction, caseType: string): void {
    this.dispatcher.dispatch(new OpenCaseAction(caseType, action.caseId));
  }
}
