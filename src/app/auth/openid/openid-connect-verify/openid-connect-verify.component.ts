import { Component } from '@angular/core';
import { ErrorType } from '@blueriq/core';
import { ErrorModel } from '../../../modules/error/error.model';

@Component({
  selector: 'bq-openid-connect-verify',
  templateUrl: './openid-connect-verify.component.html',
  styleUrls: ['./openid-connect-verify.component.scss'],
})
export class OpenIdConnectVerifyComponent {

  /**
   * If this component is actually shown, the {@link OpenIdConnectVerifyGuard} was unable to verify the OpenId Connect
   * callback request and prevented redirecting to the intended route. Hence, we know for a fact that login failed.
   */
  error = new ErrorModel(ErrorType.Unauthorized, 'Login failed', 'Authentication was not successful');

}
