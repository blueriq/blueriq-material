import type { Mocked } from 'vitest';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { OpenIdConnectVerifyGuard } from './openid-connect-verify.guard';

@Component({ template: '' })
export class TestComponent {
}

describe('OpenIdConnectVerifyGuard', () => {

  let openIdConnect: Mocked<OpenIdConnectAuth>;
  let router: Router;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    const auth = {
      prepareOidcReturnUrl: (returnPath: string) => `return-to-${returnPath}`,
    } as unknown as AuthService;
    openIdConnect = { verify: vi.fn() } as unknown as Mocked<OpenIdConnectAuth>;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'verify', component: TestComponent, canActivate: [OpenIdConnectVerifyGuard] },
          { path: 'success', component: TestComponent },
        ]),
        TestComponent,
      ],
      providers: [
        { provide: AuthService, useFactory: () => auth },
        { provide: OpenIdConnectAuth, useFactory: () => openIdConnect },
      ],
    });

    router = TestBed.inject(Router);
  });

  it('redirects back to the provided location when verification succeeds', async () => {
    openIdConnect.verify.mockReturnValue(of(undefined));

    router.navigate(['verify'], {
      queryParams: {
        state: 'state-123',
        code: 'code-456',
        ui_location: '/success',
      },
    });
    await vi.advanceTimersByTimeAsync(0);

    expect(router.url).toEqual('/success');
    expect(openIdConnect.verify).toHaveBeenCalledWith({
      state: 'state-123',
      code: 'code-456',
      redirectUri: 'return-to-/success',
    });
  });

  it('redirects proceeds to the verification component to show an error when verification fails', async () => {
    openIdConnect.verify.mockReturnValue(throwError(new Error('failed')));

    router.navigate(['verify'], {
      queryParams: {
        state: 'state-123',
        code: 'code-456',
        ui_location: '/success',
      },
    });
    await vi.advanceTimersByTimeAsync(0);

    expect(router.url).toEqual('/verify?state=state-123&code=code-456&ui_location=%2Fsuccess');
    expect(openIdConnect.verify).toHaveBeenCalledWith({
      state: 'state-123',
      code: 'code-456',
      redirectUri: 'return-to-/success',
    });
  });
});
