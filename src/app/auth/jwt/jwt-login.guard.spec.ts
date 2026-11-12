import type { Mocked } from 'vitest';

import { Component, DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtAuthService } from '@blueriq/angular';
import { of, throwError } from 'rxjs';
import { JwtLoginGuard } from './jwt-login.guard';

@Component({ template: '' })
export class TestComponent {
}

describe('JwtLoginGuard', () => {

  let jwtAuthService: Mocked<JwtAuthService>;
  let router: Router;
  let doc: Document;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    const mockDocument = {
      location: {
        href: 'http://example.com/',
        origin: 'http://example.com/',
      },
      querySelectorAll: document.querySelectorAll.bind(document),
    };
    jwtAuthService = { login: vi.fn() } as unknown as Mocked<JwtAuthService>;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent, canActivate: [JwtLoginGuard] },
          { path: 'success', component: TestComponent },
        ]),
        TestComponent,
      ],
      providers: [
        { provide: JwtAuthService, useFactory: () => jwtAuthService },
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });

    router = TestBed.inject(Router);
    doc = TestBed.inject(DOCUMENT);
  });

  it('redirects to the login endpoint if provided', async () => {
    jwtAuthService.login.mockReturnValue(of({ url: 'http://example.com/login' }));

    router.navigate(['login']);
    await vi.advanceTimersByTimeAsync(0);

    expect(doc.location!.href).toEqual('http://example.com/login');
    expect(jwtAuthService.login).toHaveBeenCalledWith({
      redirectUrl: 'http://example.com/',
    });
  });

  it('proceeds to the login component if JWT authentication is not available', async () => {
    jwtAuthService.login.mockReturnValue(throwError(new Error('JWT authentication unavailable')));

    router.navigate(['login']);
    await vi.advanceTimersByTimeAsync(0);

    expect(router.url).toEqual('/login');
    expect(jwtAuthService.login).toHaveBeenCalledWith({
      redirectUrl: 'http://example.com/',
    });
  });
});
