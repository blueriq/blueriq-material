import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { OpenIdConnectCallbackDetails } from '@blueriq/angular';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

/**
 * This guard processes the results that were returned by the OpenId Connect provider.  The returned data is verified
 * with the Runtime and if the verification went successfully, the user is redirect to the URL that was originally
 * the destination.  If verification fails, the user is shown an unsuccessful authentication page.
 */
@Injectable({ providedIn: 'root' })
export class OpenIdConnectVerifyGuard implements CanActivate {

  constructor(private readonly auth: AuthService,
              private readonly openIdConnect: OpenIdConnectAuth,
              private readonly router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const state = next.queryParamMap.get('state')!;
    const code = next.queryParamMap.get('code')!;
    const uiLocation = next.queryParamMap.get('ui_location')!;

    const details: OpenIdConnectCallbackDetails = {
      code,
      state,
      redirectUri: this.auth.prepareOidcReturnUrl(uiLocation),
    };

    return this.openIdConnect.verify(details).pipe(
      map(() => this.router.parseUrl(uiLocation)),
      catchError(() => of(true)),
    );
  }
}
