import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FailedAction, isBlueriqError } from '@blueriq/angular';
import { BlueriqDashboard, DashboardAuthService, DashboardWidgetSession, FlowWidget } from '@blueriq/dashboard';
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
    dashboard: BlueriqDashboard,
    authService: DashboardAuthService,
  ) {
    super(route, widgetSession, dashboard, authService);
  }

  get flowWidget(): FlowWidget {
    return this.widget as FlowWidget;
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
