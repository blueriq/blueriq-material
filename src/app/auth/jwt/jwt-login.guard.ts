
import { Injectable, DOCUMENT, inject } from '@angular/core';

import { JwtAuthService } from '@blueriq/angular';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

/**
 * This guard attempts to redirect to an OpenId Connect provider, before allowing access to the regular login component.
 * If no OpenId Connect authentication is needed, this guard should be deleted.
 */
@Injectable({ providedIn: 'root' })
export class JwtLoginGuard  {
  private readonly jwtAuthService = inject(JwtAuthService);
  private readonly document = inject<Document>(DOCUMENT);


  canActivate(): Observable<boolean> {
    return this.jwtAuthService.login({ redirectUrl: this.document.location.href }).pipe(
      tap(result => this.document.location.href = result.url),
      mapTo(false),
      catchError(() => of(true)),
    );
  }
}
