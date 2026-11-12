import type { Mocked } from 'vitest';

import { Component, DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { OpenIdConnectLoginGuard } from './openid-connect-login.guard';

@Component({ template: '' })
export class TestComponent {
}

describe('OpenIdConnectLoginGuard', () => {

  let openIdConnect: Mocked<OpenIdConnectAuth>;
  let router: Router;
  let doc: Document;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    const auth = {
      prepareOidcReturnUrl: (returnPath: string) => `return-to-${returnPath}`,
    } as unknown as AuthService;
    const mockDocument = {
      location: {
        href: 'http://example.com',
        origin: 'http://example.com',
      },
      querySelectorAll: document.querySelectorAll.bind(document),
    };
    openIdConnect = { login: vi.fn() } as unknown as Mocked<OpenIdConnectAuth>;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent, canActivate: [OpenIdConnectLoginGuard] },
          { path: 'success', component: TestComponent },
        ]),
        TestComponent,
      ],
      providers: [
        { provide: AuthService, useFactory: () => auth },
        { provide: OpenIdConnectAuth, useFactory: () => openIdConnect },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    router = TestBed.inject(Router);
    doc = TestBed.inject(DOCUMENT);
  });

  it('redirects to the OpenId Connect login endpoint if provided', async () => {
    openIdConnect.login.mockReturnValue(of({ url: 'http://openidconnect.com/login' }));

    router.navigate(['login']);
    await vi.advanceTimersByTimeAsync(0);

    expect(doc.location!.href).toEqual('http://openidconnect.com/login');
    expect(openIdConnect.login).toHaveBeenCalledWith({
      redirectUrl: 'return-to-/',
    });
  });

  it('proceeds to the login component if OpenId Connect is not available', async () => {
    openIdConnect.login.mockReturnValue(throwError(new Error('OpenId Connect unavailable')));

    router.navigate(['login']);
    await vi.advanceTimersByTimeAsync(0);

    expect(router.url).toEqual('/login');
    expect(openIdConnect.login).toHaveBeenCalledWith({
      redirectUrl: 'return-to-/',
    });
  });
});
