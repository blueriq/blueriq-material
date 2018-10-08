import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { PageTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../BqContentStyles';
import { HeaderComponent } from '../header/header.component';
import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let pageTemplate: PageTemplate;
  let pageComponent: ComponentFixture<PageComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent, HeaderComponent],
      providers: [BlueriqComponents.register([PageComponent]), { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
        RouterModule.forRoot([])
      ]
    });
  }));

  beforeEach(() => {
    pageTemplate = PageTemplate.create();
    session = BlueriqSessionTemplate.create().build(pageTemplate);
    pageComponent = session.get(PageComponent);
    pageComponent.autoDetectChanges();
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
      pageTemplate.contentStyle(BqContentStyles.WIDTH_FULL)
    );
    expect(page.pageSize).toBe('full');
    expect(pageComponent.nativeElement.querySelector('.page.full')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_LARGE)
    );
    expect(page.pageSize).toBe('large');
    expect(pageComponent.nativeElement.querySelector('.page.large')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_MEDIUM)
    );
    expect(page.pageSize).toBe('medium');
    expect(pageComponent.nativeElement.querySelector('.page.medium')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_SMALL)
    );
    expect(page.pageSize).toBe('small');
    expect(pageComponent.nativeElement.querySelector('.page.small')).toBeTruthy();
  });

});
