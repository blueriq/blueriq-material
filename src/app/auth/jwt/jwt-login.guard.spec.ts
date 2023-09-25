import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtAuthService } from '@blueriq/angular';
import { of, throwError } from 'rxjs';
import { JwtLoginGuard } from './jwt-login.guard';

@Component({
  template: '',
})
export class TestComponent {
}

describe('JwtLoginGuard', () => {

  let jwtAuthService: jasmine.SpyObj<JwtAuthService>;
  let router: Router;
  let doc: Document;

  beforeEach(() => {
    const mockDocument = {
      location: {
        href: 'http://example.com/',
        origin: 'http://example.com/',
      },
      querySelectorAll: document.querySelectorAll.bind(document),
    };
    jwtAuthService = jasmine.createSpyObj<JwtAuthService>(['login']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent, canActivate: [JwtLoginGuard] },
          { path: 'success', component: TestComponent },
        ]),
      ],
      providers: [
        { provide: JwtAuthService, useFactory: () => jwtAuthService },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
      declarations: [
        TestComponent,
      ],
    });

    router = TestBed.inject(Router);
    doc = TestBed.inject(DOCUMENT);
  });

  it('redirects to the login endpoint if provided', fakeAsync(() => {
    jwtAuthService.login.and.returnValue(of({ url: 'http://example.com/login' }));

    router.navigate(['login']);
    tick();

    expect(doc.location!.href).toEqual('http://example.com/login');
    expect(jwtAuthService.login).toHaveBeenCalledWith({
      redirectUrl: '/',
    });
  }));

  it('proceeds to the login component if JWT authentication is not available', fakeAsync(() => {
    jwtAuthService.login.and.returnValue(throwError(new Error('JWT authentication unavailable')));

    router.navigate(['login']);
    tick();

    expect(router.url).toEqual('/login');
    expect(jwtAuthService.login).toHaveBeenCalledWith({
      redirectUrl: '/',
    });
  }));
});
