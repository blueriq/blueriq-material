import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component, DOCUMENT } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService as BqAuthService, LogoutResult } from '@blueriq/angular';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    template: '',
    standalone: false
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
    const mockDocument = {
      location: {
        href: 'http://example.com',
        origin: 'http://example.com',
      },
      querySelectorAll: document.querySelectorAll.bind(document),
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
        { provide: DOCUMENT, useValue: mockDocument },
      ],
      declarations: [
        TestComponent,
      ],
    });

    auth = TestBed.inject(AuthService);
    doc = TestBed.inject(DOCUMENT);
    router = TestBed.inject(Router);
  });

  describe('basic usage', () => {

    describe('logging out', () => {
      it('should logout from Blueriq and redirect to the login route', fakeAsync(() => {
        let loggedOut = false;
        blueriqAuth.logout.and.returnValue(new Observable(subscriber => {
          loggedOut = true;
          subscriber.next({});
        }));

        auth.logoutAndNavigate('/return');
        tick();

        expect(loggedOut).toBe(true);
        expect(router.url).toEqual('/logged-out?returnPath=%2Freturn');
      }));

      it('should allow omitting a return path', fakeAsync(() => {
        let loggedOut = false;
        blueriqAuth.logout.and.returnValue(new Observable(subscriber => {
          loggedOut = true;
          subscriber.next({});
        }));

        auth.logoutAndNavigate(null);
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
      // mock to create own logout result which can have a ssoLogoutUrl and a id_token_hint
      const configureLogout = (ssoLogoutUrl: string | undefined, id_token_hint: string | undefined) => {
        const logoutResult: LogoutResult = { ssoLogoutUrl, id_token_hint };
        blueriqAuth.logout.and.returnValue(of(logoutResult));
      };

      it('should redirect to OpenId logout endpoint if logout endpoint is available', () => {
        configureLogout('http://openidconnect.com/logout', 'aToken');
        auth.logoutAndNavigate('/return');

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?post_logout_redirect_uri=http%3A%2F%2Fexample.com%2Flogged-out%3FreturnPath%3D%252Freturn&id_token_hint=aToken`);
      });

      it('should allow omitting a return path', () => {
        configureLogout('http://openidconnect.com/logout', 'aToken');
        auth.logoutAndNavigate(null);

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?post_logout_redirect_uri=http%3A%2F%2Fexample.com%2Flogged-out&id_token_hint=aToken`);
      });

      it('should not redirect to OpenId logout endpoint if logout endpoint is not available', fakeAsync(() => {
        configureLogout(undefined, 'aToken');
        auth.logoutAndNavigate('/return');
        tick();

        expect(router.url).toEqual('/logged-out?returnPath=%2Freturn');
      }));

      it('handles preconfigured ?post_logout_redirect_uri query parameter', () => {
        configureLogout('http://openidconnect.com/logout?post_logout_redirect_uri=preconfigured', 'aToken');
        auth.logoutAndNavigate('/return');

        expect(doc.location!.href).toEqual('http://openidconnect.com/logout?post_logout_redirect_uri=preconfigured&id_token_hint=aToken');
      });

      it('handles preconfigured &post_logout_redirect_uri query parameter', () => {
        configureLogout('http://openidconnect.com/logout?test&post_logout_redirect_uri=preconfigured', 'aToken');
        auth.logoutAndNavigate('/return');

        expect(doc.location!.href).toEqual('http://openidconnect.com/logout?test&post_logout_redirect_uri=preconfigured&id_token_hint=aToken');
      });

      it('handles existing query parameters in the logout endpoint', () => {
        configureLogout('http://openidconnect.com/logout?test', 'aToken');
        auth.logoutAndNavigate('/return');

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?test&post_logout_redirect_uri=http%3A%2F%2Fexample.com%2Flogged-out%3FreturnPath%3D%252Freturn&id_token_hint=aToken`);
      });

      it('includes an application base path if present', () => {
        const locationStrategy = TestBed.inject(LocationStrategy) as MockLocationStrategy;
        locationStrategy.internalBaseHref = 'Runtime';
        configureLogout('http://openidconnect.com/logout', 'aToken');
        auth.logoutAndNavigate('/return');

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?post_logout_redirect_uri=http%3A%2F%2Fexample.com%2FRuntime%2Flogged-out%3FreturnPath%3D%252Freturn&id_token_hint=aToken`);
      });
    });
  });
});
