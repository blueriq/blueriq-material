import { DOCUMENT, LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService as BqAuthService, LogoutResult } from '@blueriq/angular';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  template: '',
})
export class TestComponent {
}

describe('AuthService', () => {

  let auth: AuthService;
  let blueriqAuth: jasmine.SpyObj<BqAuthService>;
  let openIdConnect: OpenIdConnectAuth;
  let router: Router;
  let doc: Document;

  beforeEach(() => {
    blueriqAuth = jasmine.createSpyObj<BqAuthService>(['login', 'logout']);
    openIdConnect = {
      login: jasmine.createSpy(),
      configuration: { enabled: false, logoutUrl: undefined },
    } as unknown as OpenIdConnectAuth;
    const document = {
      location: {
        href: 'http://example.com',
        origin: 'http://example.com',
      },
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent },
          { path: 'logged-out', component: TestComponent },
        ]),
      ],
      providers: [
        { provide: BqAuthService, useFactory: () => blueriqAuth },
        { provide: OpenIdConnectAuth, useFactory: () => openIdConnect },
        { provide: DOCUMENT, useValue: document },
      ],
      declarations: [
        TestComponent,
      ],
    });

    auth = TestBed.get(AuthService);
    doc = TestBed.get(DOCUMENT);
    router = TestBed.get(Router);
  });

  describe('basic usage', () => {

    describe('logging out', () => {
      it('should logout from Blueriq and redirect to the login route', fakeAsync(() => {
        let loggedOut = false;
        blueriqAuth.logout.and.returnValue(new Observable(subscriber => {
          loggedOut = true;
          subscriber.next({});
        }));

        auth.logoutAndNavigate();
        tick();

        expect(loggedOut).toBe(true);
        expect(router.url).toEqual('/logged-out');
      }));
    });

  });

  describe('OpenId Connect', () => {

    it('should generate a fully qualified return url', () => {
      const returnUrl = auth.prepareOidcReturnUrl('/flow/shortcut/default');

      expect(returnUrl).toEqual(`http://example.com/openidconnect/verify?ui_location=%2Fflow%2Fshortcut%2Fdefault`);
    });

    describe('logging out', () => {
      const configureLogout = (ssoLogoutUrl: string | undefined) => {
        const logoutResult: LogoutResult = { ssoLogoutUrl };
        blueriqAuth.logout.and.returnValue(of(logoutResult));
      };

      it('should redirect to OpenId logout endpoint if logout endpoint is available', () => {
        configureLogout('http://openidconnect.com/logout');
        auth.logoutAndNavigate();

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?post_logout_redirect_uri=http%3A%2F%2Fexample.com%2Flogged-out`);
      });

      it('should not redirect to OpenId logout endpoint if logout endpoint is not available', fakeAsync(() => {
        configureLogout(undefined);
        auth.logoutAndNavigate();
        tick();

        expect(router.url).toEqual('/logged-out');
      }));

      it('handles preconfigured ?post_logout_redirect_uri query parameter', () => {
        configureLogout('http://openidconnect.com/logout?post_logout_redirect_uri=preconfigured');
        auth.logoutAndNavigate();

        expect(doc.location!.href).toEqual('http://openidconnect.com/logout?post_logout_redirect_uri=preconfigured');
      });

      it('handles preconfigured &post_logout_redirect_uri query parameter', () => {
        configureLogout('http://openidconnect.com/logout?test&post_logout_redirect_uri=preconfigured');
        auth.logoutAndNavigate();

        expect(doc.location!.href).toEqual('http://openidconnect.com/logout?test&post_logout_redirect_uri=preconfigured');
      });

      it('handles existing query parameters in the logout endpoint', () => {
        configureLogout('http://openidconnect.com/logout?test');
        auth.logoutAndNavigate();

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?test&post_logout_redirect_uri=http%3A%2F%2Fexample.com%2Flogged-out`);
      });

      it('includes an application base path if present', () => {
        const locationStrategy: MockLocationStrategy = TestBed.get(LocationStrategy);
        locationStrategy.internalBaseHref = 'Runtime';
        configureLogout('http://openidconnect.com/logout');
        auth.logoutAndNavigate();

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?post_logout_redirect_uri=http%3A%2F%2Fexample.com%2FRuntime%2Flogged-out`);
      });
    });
  });
});
