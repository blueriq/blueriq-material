import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { OpenIdConnectVerifyGuard } from './openid-connect-verify.guard';

@Component({
    template: '',
    standalone: false
})
export class TestComponent {
}

describe('OpenIdConnectVerifyGuard', () => {

  let openIdConnect: jasmine.SpyObj<OpenIdConnectAuth>;
  let router: Router;

  beforeEach(() => {
    const auth = {
      prepareOidcReturnUrl: (returnPath: string) => `return-to-${returnPath}`,
    } as unknown as AuthService;
    openIdConnect = jasmine.createSpyObj<OpenIdConnectAuth>(['verify']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'verify', component: TestComponent, canActivate: [OpenIdConnectVerifyGuard] },
          { path: 'success', component: TestComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useFactory: () => auth },
        { provide: OpenIdConnectAuth, useFactory: () => openIdConnect },
      ],
      declarations: [
        TestComponent,
      ],
    });

    router = TestBed.inject(Router);
  });

  it('redirects back to the provided location when verification succeeds', fakeAsync(() => {
    openIdConnect.verify.and.returnValue(of(undefined));

    router.navigate(['verify'], {
      queryParams: {
        state: 'state-123',
        code: 'code-456',
        ui_location: '/success',
      },
    });
    tick();

    expect(router.url).toEqual('/success');
    expect(openIdConnect.verify).toHaveBeenCalledWith({
      state: 'state-123',
      code: 'code-456',
      redirectUri: 'return-to-/success',
    });
  }));

  it('redirects proceeds to the verification component to show an error when verification fails', fakeAsync(() => {
    openIdConnect.verify.and.returnValue(throwError(new Error('failed')));

    router.navigate(['verify'], {
      queryParams: {
        state: 'state-123',
        code: 'code-456',
        ui_location: '/success',
      },
    });
    tick();

    expect(router.url).toEqual('/verify?state=state-123&code=code-456&ui_location=%2Fsuccess');
    expect(openIdConnect.verify).toHaveBeenCalledWith({
      state: 'state-123',
      code: 'code-456',
      redirectUri: 'return-to-/success',
    });
  }));
});
