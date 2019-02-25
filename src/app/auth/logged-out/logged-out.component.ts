import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationModel, NotificationType } from '../../notification-overlay/notification.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bq-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss'],
})
export class LoggedOutComponent {

  notification = new NotificationModel(NotificationType.Error, 'Logged out', 'Successfully logged out');

  constructor(auth: AuthService, route: ActivatedRoute) {
    this.notification.dismiss = {
      label: 'Go to Login',
      action: () => {
        auth.navigateToLogin(route.snapshot.queryParams['returnPath']);
      },
    };
  }

}
