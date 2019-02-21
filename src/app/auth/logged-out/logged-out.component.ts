import { Component } from '@angular/core';
import { NotificationModel, NotificationType } from '../../notification-overlay/notification.model';

@Component({
  selector: 'bq-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss'],
})
export class LoggedOutComponent {

  notification = new NotificationModel(NotificationType.Error, 'Logged out', 'Successfully logged out');

}
