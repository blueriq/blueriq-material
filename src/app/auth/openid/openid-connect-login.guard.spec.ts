import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { OpenIdConnectLoginGuard } from './openid-connect-login.guard';

@Component({
    template: '',
    standalone: false
})
export class TestComponent {
}

describe('OpenIdConnectLoginGuard', () => {

  let openIdConnect: jasmine.SpyObj<OpenIdConnectAuth>;
  let router: Router;
  let doc: Document;

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
    openIdConnect = jasmine.createSpyObj<OpenIdConnectAuth>(['login']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent, canActivate: [OpenIdConnectLoginGuard] },
          { path: 'success', component: TestComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useFactory: () => auth },
        { provide: OpenIdConnectAuth, useFactory: () => openIdConnect },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
      declarations: [
        TestComponent,
      ],
    });

    router = TestBed.inject(Router);
    doc = TestBed.inject(DOCUMENT);
  });

  it('redirects to the OpenId Connect login endpoint if provided', fakeAsync(() => {
    openIdConnect.login.and.returnValue(of({ url: 'http://openidconnect.com/login' }));

    router.navigate(['login']);
    tick();

    expect(doc.location!.href).toEqual('http://openidconnect.com/login');
    expect(openIdConnect.login).toHaveBeenCalledWith({
      redirectUrl: 'return-to-/',
    });
  }));

  it('proceeds to the login component if OpenId Connect is not available', fakeAsync(() => {
    openIdConnect.login.and.returnValue(throwError(new Error('OpenId Connect unavailable')));

    router.navigate(['login']);
    tick();

    expect(router.url).toEqual('/login');
    expect(openIdConnect.login).toHaveBeenCalledWith({
      redirectUrl: 'return-to-/',
    });
  }));
});
