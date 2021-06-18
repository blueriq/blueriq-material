import { DOCUMENT, Location, LocationStrategy } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as BqAuthService, LoginResult } from '@blueriq/angular';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { Observable } from 'rxjs';

/**
 * This service acts as a central place for authentication related logic. It exists mostly to centralize the logic
 * around OpenId Connect and contains fallback behavior for direct Runtime authentication, if OpenId Connect is not
 * enabled or if the Runtime version does not support it.
 *
 * Hence, by default the theme supports two modes of operation natively. It will first attempt to use OpenId Connect,
 * or fallback to Runtime authentication otherwise.  You may want to disable either of these modes if only a single
 * authentication method is used.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private readonly auth: BqAuthService,
              private readonly router: Router,
              private readonly locationStrategy: LocationStrategy,
              // OpenId Connect is marked optional, such that tests won't need to provide an implementation.
              @Inject(OpenIdConnectAuth) @Optional() private readonly openIdConnect: OpenIdConnectAuth | null,
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  login(username: string, password: string): Observable<LoginResult> {
    return this.auth.login(username, password);
  }

  canLogout(): boolean {
    return this.openIdConnect ? this.openIdConnect.canLogout() : true;
  }

  logoutAndNavigate(returnPath: string | null = this.router.url): void {
    this.auth.logout().subscribe(response => {
      // If the response contains an ssoLogoutUrl, we need to redirect to that URL to be logged out from OIDC provider.
      if (response.ssoLogoutUrl) {
        let returnUrl = '/logged-out';
        if (returnPath !== null) {
          returnUrl += `?returnPath=${encodeURIComponent(returnPath)}`;
        }
        this.document.location.href = this.addReturnPath(response.ssoLogoutUrl, returnUrl);
      } else {
        this.router.navigate(['/logged-out'], { queryParams: { returnPath } });
      }
    });
  }

  navigateToLogin(returnPath: string | null = this.router.url): void {
    this.router.navigate(['/login'], { queryParams: { returnPath } });
  }

  prepareOidcReturnUrl(uiLocation: string): string {
    return this.prepareExternalUrl(`/openidconnect/verify?ui_location=${encodeURIComponent(uiLocation)}`);
  }

  private addReturnPath(logoutUrl: string, returnPath: string): string {
    if (logoutUrl.includes('?post_logout_redirect_uri=') || logoutUrl.includes('&post_logout_redirect_uri=')) {
      return logoutUrl;
    }

    const redirectUrl = this.prepareExternalUrl(returnPath);
    const joiner = logoutUrl.includes('?') ? '&' : '?';
    return `${logoutUrl}${joiner}post_logout_redirect_uri=${encodeURIComponent(redirectUrl)}`;
  }

  private prepareExternalUrl(path: string): string {
    const rootPath = Location.joinWithSlash(this.locationStrategy.getBaseHref(), path);
    return Location.joinWithSlash(this.document.location.origin, rootPath);
  }

}
