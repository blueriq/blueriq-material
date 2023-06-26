import {Component, isDevMode} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dispatcher, FailedAction, isBlueriqError} from '@blueriq/angular';
import {DashboardWidgetSession} from '@blueriq/dashboard';
import {NotificationModel, NotificationType} from '../../../notification-overlay/notification.model';
import {LoginAction, OpenCaseAction} from '../../events/actions';
import {SessionWidgetComponent} from '../session-widget.component';

@Component({
  selector: 'bq-task-execution-widget',
  templateUrl: './task-execution-widget.component.html',
  providers: [DashboardWidgetSession],
})
export class TaskExecutionWidgetComponent extends SessionWidgetComponent {

  notification: NotificationModel | undefined;

  constructor(
    route: ActivatedRoute,
    widgetSession: DashboardWidgetSession,
    private readonly dispatcher: Dispatcher,
  ) {
    super(route, widgetSession);
  }

  onSessionExpired(caseType: string, caseId: string): void {
    this.notification = new NotificationModel(
      NotificationType.SessionExpired,
      'Task Session Expired',
      'The task session has expired.');
    this.setBackToCaseNotificationDismiss(caseType, caseId);
  }

  onError(action: FailedAction, caseType: string, caseId: string): void {
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
    this.setBackToCaseNotificationDismiss(caseType, caseId);
  }

  onFlowEnded(caseType: string, caseId: string): void {
    this.notification = new NotificationModel(
      NotificationType.Info,
      'Task completed',
      'You will be redirected back to the case dashboard in a moment.');
    setTimeout(() => this.dispatcher.dispatch(new OpenCaseAction(caseId, caseType)), 2000);
  }

  onForbidden(caseType: string, caseId: string): void {
    this.notification = new NotificationModel(
      NotificationType.Error,
      'Forbidden',
      'You are forbidden to execute this task.');
    this.setBackToCaseNotificationDismiss(caseType, caseId);
  }

  onUnauthorized(): void {
    this.dispatcher.dispatch(new LoginAction());
  }

  private setBackToCaseNotificationDismiss(caseType: string, caseId: string): void {
    this.notification!.dismiss = {
      label: 'Back to case...',
      action: () => this.dispatcher.dispatch(new OpenCaseAction(caseId, caseType)),
    };
  }
}
