import { DOCUMENT, LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService as BqAuthService } from '@blueriq/angular';
import { OpenIdConnectAuth } from '@blueriq/angular/openidconnect';
import { Observable } from 'rxjs';
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
        blueriqAuth.logout.and.returnValue(Observable.create(() => {
          loggedOut = true;
        }));

        auth.logoutAndNavigate('/flow/shortcut/default');
        tick();

        expect(loggedOut).toBe(true);
        expect(router.url).toEqual('/login?returnPath=%2Fflow%2Fshortcut%2Fdefault');
      }));
    });

  });

  describe('OpenId Connect', () => {

    it('should generate a fully qualified return url', () => {
      const returnUrl = auth.prepareOidcReturnUrl('/flow/shortcut/default');

      expect(returnUrl).toEqual(`http://example.com/openidconnect/verify?ui_location=%2Fflow%2Fshortcut%2Fdefault`);
    });

    describe('logging out', () => {
      it('should redirect to OpenId logout endpoint', () => {
        openIdConnect.configuration.logoutUrl = 'http://openidconnect.com/logout';
        auth.logoutAndNavigate('/flow/shortcut/default');

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?redirect_uri=http%3A%2F%2Fexample.com%2Fflow%2Fshortcut%2Fdefault`);
      });

      it('handles preconfigured ?redirect_uri query parameter', () => {
        openIdConnect.configuration.logoutUrl = 'http://openidconnect.com/logout?redirect_uri=preconfigured';
        auth.logoutAndNavigate('/flow/shortcut/default');

        expect(doc.location!.href).toEqual('http://openidconnect.com/logout?redirect_uri=preconfigured');
      });

      it('handles preconfigured &redirect_uri query parameter', () => {
        openIdConnect.configuration.logoutUrl = 'http://openidconnect.com/logout?test&redirect_uri=preconfigured';
        auth.logoutAndNavigate('/flow/shortcut/default');

        expect(doc.location!.href).toEqual('http://openidconnect.com/logout?test&redirect_uri=preconfigured');
      });

      it('handles existing query parameters in the logout endpoint', () => {
        openIdConnect.configuration.logoutUrl = 'http://openidconnect.com/logout?test';
        auth.logoutAndNavigate('/flow/shortcut/default');

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?test&redirect_uri=http%3A%2F%2Fexample.com%2Fflow%2Fshortcut%2Fdefault`);
      });

      it('includes an application base path if present', () => {
        const locationStrategy: MockLocationStrategy = TestBed.get(LocationStrategy);
        locationStrategy.internalBaseHref = 'Runtime';
        openIdConnect.configuration.logoutUrl = 'http://openidconnect.com/logout';
        auth.logoutAndNavigate('/flow/shortcut/default');

        expect(doc.location!.href).toEqual(
          `http://openidconnect.com/logout?redirect_uri=http%3A%2F%2Fexample.com%2FRuntime%2Fflow%2Fshortcut%2Fdefault`);
      });
    });
  });
});
