import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BqProjectComponent } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, PageTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../BqContentStyles';
import { MenuModule } from '../menu/menu.module';
import { PageComponent } from './page.component';
import { PageModule } from './page.module';

describe('PageComponent', () => {
  let pageTemplate: PageTemplate;
  let pageComponent: ComponentFixture<PageComponent>;
  let session: BlueriqTestSession;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: BqProjectComponent,
          useValue: {
            sessionId: undefined,
          },
        },
      ],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        RouterModule.forRoot([]),
        PageModule,
        MenuModule,
      ],
    });
  }));

  beforeEach(() => {
    pageTemplate = PageTemplate.create().children(
      // Add 2 menubars
      ContainerTemplate.create().contentStyle(BqContentStyles.DASHBOARD_MENU).children(ContainerTemplate.create().contentStyle('menubar')),
      ContainerTemplate.create().contentStyle(BqContentStyles.DASHBOARD_MENU).children(ContainerTemplate.create().contentStyle('menubar')),
    );
    session = BlueriqSessionTemplate.create().build(pageTemplate);
    pageComponent = session.get(PageComponent);
    pageComponent.autoDetectChanges();
  });

  it('should render the header correctly and use the correct margins based on how many headers', () => {
    const header = pageComponent.nativeElement.querySelector('.header');
    const page = pageComponent.nativeElement.querySelector('.page');

    expect(header.querySelector('bq-header')).toBeTruthy('No header is set, so the default header should be rendered');
    expect(header.querySelectorAll('bq-menu').length).toBe(2);
    expect(page.classList).toContain('margin-2', 'Having a bq-header and bq-menus adds up to having 2 components, ' +
      'so this margin selector is expected');
  });

  it('should be rendered by default', () => {
    const page = pageComponent.componentInstance;

    expect(page.pageSize).toBe('responsive');
    expect(pageComponent.nativeElement.querySelector('.page.responsive')).toBeTruthy();
    expect(pageComponent.nativeElement.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should have widths based on content styles', () => {
    const page = pageComponent.componentInstance;

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_FULL),
    );
    expect(page.pageSize).toBe('full');
    expect(pageComponent.nativeElement.querySelector('.page.full')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_LARGE),
    );
    expect(page.pageSize).toBe('large');
    expect(pageComponent.nativeElement.querySelector('.page.large')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_MEDIUM),
    );
    expect(page.pageSize).toBe('medium');
    expect(pageComponent.nativeElement.querySelector('.page.medium')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_SMALL),
    );
    expect(page.pageSize).toBe('small');
    expect(pageComponent.nativeElement.querySelector('.page.small')).toBeTruthy();
  });

});
