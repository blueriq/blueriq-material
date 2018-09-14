import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, PageTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { PageComponent } from '../page/page.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let session: BlueriqTestSession;
  let headerTemplate: ContainerTemplate;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent, HeaderComponent],
      providers: [BlueriqComponents.register([PageComponent, HeaderComponent]), {
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
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
      expect(fixture.nativeElement.querySelector('.username').innerText.toLowerCase).toBe('requester');
      expect(fixture.nativeElement.querySelector('mat-menu').getAttribute('ng-reflect-overlap-trigger')).toBe('false');
    });
  });
});
