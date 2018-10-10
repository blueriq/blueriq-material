import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Element } from '@blueriq/core';
import { ContainerTemplate, PageTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { PageComponent } from '../page/page.component';
import { PageModule } from '../page/page.module';
import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let session: BlueriqTestSession;
  let headerTemplate: ContainerTemplate;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        Element
      ],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        RouterModule.forRoot([]),
        HeaderModule,
        PageModule
      ]
    });
  }));

  describe('basic behavior', () => {
    let fixture: ComponentFixture<HeaderComponent>;
    let component: HeaderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render properly', () => {
      expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1').innerText).toBe('');
      expect(fixture.nativeElement.querySelector('.username')).toBeFalsy();
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
        TextItemTemplate.create().plainText('Logoff').styles('logout_link')
      );
      pageTemplate.children(headerTemplate);
      session = BlueriqSessionTemplate.create().build(pageTemplate);
      fixture = session.get(PageComponent);
      fixture.autoDetectChanges();
    });

    it('should render properly', () => {
      expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('h1').innerText).toBe('Page Title');
      expect(fixture.nativeElement.querySelector('.username').innerText.toLowerCase()).toBe('requester');
      expect(fixture.nativeElement.querySelector('mat-menu').getAttribute('ng-reflect-overlap-trigger')).toBe('false');
    });
  });
});
