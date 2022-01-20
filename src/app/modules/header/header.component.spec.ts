import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BqProjectComponent } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Element } from '@blueriq/core';
import { ContainerTemplate, PageTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { AuthService } from '../../auth/auth.service';
import { PageComponent } from '../page/page.component';
import { PageModule } from '../page/page.module';
import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let session: BlueriqTestSession;
  let headerTemplate: ContainerTemplate;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>(['logoutAndNavigate']);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        Element,
        {
          provide: BqProjectComponent,
          useValue: {
            sessionId: undefined,
          },
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        RouterTestingModule.withRoutes([]),
        HeaderModule,
        PageModule,
      ],
    }).compileComponents();
  });

  describe('basic behavior', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render properly', () => {
      expect(fixture.nativeElement.querySelector('.img-logo-white')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1').innerText).toBe('');
      expect(fixture.nativeElement.querySelector('.username')).toBeFalsy();
    });

    it('should logout with a return path', () => {
      component.logout();

      expect(authServiceSpy.logoutAndNavigate).toHaveBeenCalledOnceWith();
    });
  });

  describe('rendered with dashboard_header', () => {
    let fixture: ComponentFixture<PageComponent>;
    let pageTemplate: PageTemplate;

    beforeEach(() => {
      pageTemplate = PageTemplate.create();
      pageTemplate.displayName('Page Title');
      headerTemplate = ContainerTemplate.create();
      headerTemplate.contentStyle('dashboard_header');
      headerTemplate.children(
        TextItemTemplate.create().plainText('Requester').styles('authenticated_user'),
        TextItemTemplate.create().plainText('Logoff').styles('logout_link'),
      );
      pageTemplate.children(headerTemplate);
      session = BlueriqSessionTemplate.create().build(pageTemplate);
      fixture = session.get(PageComponent);
      fixture.autoDetectChanges();
    });

    it('should render properly', () => {
      expect(fixture.nativeElement.querySelector('.img-logo-white')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1').innerText).toBe('Page Title');
      expect(fixture.nativeElement.querySelector('.username').innerText.toLowerCase()).toBe('requester');
      expect(fixture.nativeElement.querySelector('mat-menu').getAttribute('ng-reflect-overlap-trigger')).toBe('false');
    });
  });

  describe('rendered with dashboard_header and no username', () => {
    let fixture: ComponentFixture<PageComponent>;
    let pageTemplate: PageTemplate;

    beforeEach(() => {
      pageTemplate = PageTemplate.create();
      pageTemplate.displayName('Page Title');
      headerTemplate = ContainerTemplate.create();
      headerTemplate.contentStyle('dashboard_header');
      headerTemplate.children(
        TextItemTemplate.create().plainText('Logoff').styles('logout_link'),
      );
      pageTemplate.children(headerTemplate);
      session = BlueriqSessionTemplate.create().build(pageTemplate);
      fixture = session.get(PageComponent);
      fixture.autoDetectChanges();
    });

    it('should render properly', () => {
      expect(fixture.nativeElement.querySelector('.img-logo-white')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1').innerText).toBe('Page Title');
      expect(fixture.nativeElement.querySelector('.username')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('mat-menu').getAttribute('ng-reflect-overlap-trigger')).toBe('false');
    });
  });

  describe('rendered with dashboard_header and no logout', () => {
    let fixture: ComponentFixture<PageComponent>;
    let pageTemplate: PageTemplate;

    beforeEach(() => {
      pageTemplate = PageTemplate.create();
      pageTemplate.displayName('Page Title');
      headerTemplate = ContainerTemplate.create();
      headerTemplate.contentStyle('dashboard_header');
      headerTemplate.children(
        TextItemTemplate.create().plainText('Requester').styles('authenticated_user'),
      );
      pageTemplate.children(headerTemplate);
      session = BlueriqSessionTemplate.create().build(pageTemplate);
      fixture = session.get(PageComponent);
      fixture.autoDetectChanges();
    });

    it('should render properly', () => {
      expect(fixture.nativeElement.querySelector('.img-logo-white')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1').innerText).toBe('Page Title');
      expect(fixture.nativeElement.querySelector('.username').innerText.toLowerCase()).toBe('requester');
    });
  });

  describe('logging out when a session id is used', () => {
    beforeEach(async() => {
      await TestBed.configureTestingModule({
        providers: [
          {
            provide: BqProjectComponent,
            useValue: {
              sessionId: '1337',
            },
          },
        ],
      }).compileComponents();
    });

    it('should logout without a return path', () => {
      const fixture = TestBed.createComponent(HeaderComponent);

      fixture.componentInstance.logout();

      // The redirect should be explicitly set to `null` such that no return URL is used, as the return URL would
      // correspond with the session id that will no longer be available.
      expect(authServiceSpy.logoutAndNavigate).toHaveBeenCalledOnceWith(null);
    });
  });
});
