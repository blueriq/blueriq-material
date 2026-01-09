import { Component, inject, isDevMode } from '@angular/core';
import { Dispatcher, FailedAction, isBlueriqError } from '@blueriq/angular';
import { DashboardWidgetSession, OpenCaseAction } from '@blueriq/dashboard';
import { NotificationModel, NotificationType } from '../../../notification-overlay/notification.model';
import { SessionWidgetComponent } from '../session-widget.component';

@Component({
    selector: 'bq-task-execution-widget',
    templateUrl: './task-execution-widget.component.html',
    providers: [DashboardWidgetSession],
    standalone: false
})
export class TaskExecutionWidgetComponent extends SessionWidgetComponent {
  private readonly dispatcher = inject(Dispatcher);

  notification: NotificationModel | undefined;

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
      const { title, message } = action.error.cause;
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
    setTimeout(() => this.dispatcher.dispatch(new OpenCaseAction(caseType, caseId)), 2000);
  }

  onTaskCancelled(caseType: string, caseId: string): void {
    this.notification = new NotificationModel(
      NotificationType.Info,
      'Task cancelled',
      'You will be redirected back to the case dashboard in a moment.');
    setTimeout(() => this.dispatcher.dispatch(new OpenCaseAction(caseType, caseId)), 2000);
  }

  onForbidden(caseType: string, caseId: string): void {
    this.notification = new NotificationModel(
      NotificationType.Error,
      'Forbidden',
      'You are forbidden to execute this task.');
    this.setBackToCaseNotificationDismiss(caseType, caseId);
  }

  private setBackToCaseNotificationDismiss(caseType: string, caseId: string): void {
    this.notification!.dismiss = {
      label: 'Back to case...',
      action: () => this.dispatcher.dispatch(new OpenCaseAction(caseType, caseId)),
    };
  }

}
