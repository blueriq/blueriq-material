import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, FailedAction, isBlueriqError } from '@blueriq/angular';
import { DashboardWidgetSession, FlowWidgetModel } from '@blueriq/dashboard';
import { NotificationModel, NotificationType } from '../../../notification-overlay/notification.model';
import { SessionWidgetComponent } from '../session-widget.component';

type WidgetStartType = 'shortcut' | 'regular' | 'invalid';

@Component({
  selector: 'bq-flow-widget',
  templateUrl: './flow-widget.component.html',
  providers: [DashboardWidgetSession],
})
export class FlowWidgetComponent extends SessionWidgetComponent {

  notification: NotificationModel | undefined;

  constructor(
    route: ActivatedRoute,
    widgetSession: DashboardWidgetSession,
    dispatcher: Dispatcher,
  ) {
    super(route, widgetSession, dispatcher);
  }

  get flowWidget(): FlowWidgetModel {
    return this.widget as FlowWidgetModel;
  }

  get widgetStartType(): WidgetStartType {
    if (this.flowWidget.projectName && this.flowWidget.flowName && this.flowWidget.versionName) {
      return 'regular';
    } else if (this.flowWidget.shortcutName) {
      return 'shortcut';
    }
    return 'invalid';
  }

  onFlowEnded() {
    this.notification = new NotificationModel(
      NotificationType.Error,
      'Widget Ended',
      `The flow for '${this.widget.id}' has ended. Widget flows should never end, please revisit the widget's flowing.`,
    );
  }

  onSessionExpired() {
    this.notification = new NotificationModel(
      NotificationType.SessionExpired,
      'Session expired',
      'Your session has expired due to inactivity',
    );
  }

  onError(action: FailedAction): void {
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
