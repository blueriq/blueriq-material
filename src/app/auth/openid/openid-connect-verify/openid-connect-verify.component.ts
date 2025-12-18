import { Component } from '@angular/core';
import { NotificationModel, NotificationType } from '../../../notification-overlay/notification.model';

@Component({
    selector: 'bq-openid-connect-verify',
    templateUrl: './openid-connect-verify.component.html',
    styleUrls: ['./openid-connect-verify.component.scss'],
    standalone: false
})
export class OpenIdConnectVerifyComponent {

  /**
   * If this component is actually shown, the {@link OpenIdConnectVerifyGuard} was unable to verify the OpenId Connect
   * callback request and prevented redirecting to the intended route. Hence, we know for a fact that login failed.
   */
  notification = new NotificationModel(NotificationType.Error, 'Login failed', 'Authentication was not successful');

}
