import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationModel, NotificationType } from '../../notification-overlay/notification.model';

@Component({
  selector: 'bq-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss'],
})
export class LoggedOutComponent {

  notification = new NotificationModel(NotificationType.LoggedOut, 'Logged out', 'Successfully logged out');

  constructor(router: Router, route: ActivatedRoute) {
    this.notification.dismiss = {
      label: 'Return to resource',
      action: async () => {
        const returnPath = route.snapshot.queryParams['returnPath'] ?? '/';
        return await router.navigateByUrl(returnPath);
      },
    };
  }

}
