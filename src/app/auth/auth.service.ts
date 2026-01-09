import { Location, LocationStrategy } from '@angular/common';
import { DOCUMENT, inject, Injectable } from '@angular/core';
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
  private readonly auth = inject(BqAuthService);
  private readonly router = inject(Router);
  private readonly locationStrategy = inject(LocationStrategy);
  // OpenId Connect is marked optional, such that tests won't need to provide an implementation.
  private readonly openIdConnect = inject<OpenIdConnectAuth | null>(OpenIdConnectAuth, { optional: true });
  private readonly document = inject<Document>(DOCUMENT);


  login(username: string, password: string): Observable<LoginResult> {
    return this.auth.login(username, password);
  }

  canLogout(): boolean {
    return this.openIdConnect ? this.openIdConnect.canLogout() : true;
  }

  /**
   * Call logout endpoint and navigate to a logged out page when successful.
   * @param returnPath The path the logout page should navigate to.
   */
  logoutAndNavigate(returnPath: string | null = this.router.url): void {
    this.auth.logout().subscribe(response => {
      // If the response contains an ssoLogoutUrl, we need to redirect to that URL to be logged out from OIDC provider.
      if (response.ssoLogoutUrl) {
        let returnUrl = '/logged-out';
        if (returnPath !== null) {
          returnUrl += `?returnPath=${encodeURIComponent(returnPath)}`;
        }
        let ssoLogoutString = this.addReturnPath(response.ssoLogoutUrl, returnUrl);
        if (response.id_token_hint) {
          ssoLogoutString = this.addIdToken(response.id_token_hint, ssoLogoutString);
        }
        this.document.location.href = ssoLogoutString;
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

  private addIdToken(token: string, logoutUrl: string): string {
    const joiner = logoutUrl.includes('?') ? '&' : '?';
    return `${logoutUrl}${joiner}id_token_hint=${token}`;
  }

  private prepareExternalUrl(path: string): string {
    const rootPath = Location.joinWithSlash(this.locationStrategy.getBaseHref(), path);
    return Location.joinWithSlash(this.document.location.origin, rootPath);
  }

}
