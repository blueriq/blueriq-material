
import { Inject, Injectable, DOCUMENT } from '@angular/core';
import { Router } from '@angular/router';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

/**
 * This guard attempts to redirect to an OpenId Connect provider, before allowing access to the regular login component.
 * If no OpenId Connect authentication is needed, this guard should be deleted.
 */
@Injectable({ providedIn: 'root' })
export class OpenIdConnectLoginGuard  {

  constructor(private readonly auth: AuthService,
              private readonly openIdConnect: OpenIdConnectAuth,
              private readonly router: Router,
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  canActivate(): Observable<boolean> {
    const redirectUrl = this.auth.prepareOidcReturnUrl(this.router.url);

    return this.openIdConnect.login({ redirectUrl }).pipe(
      tap(result => this.document.location.href = result.url),
      mapTo(false),
      catchError(() => of(true)),
    );
  }
}
