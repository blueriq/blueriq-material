import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { PageTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { BqContentStyles } from '../BqContentStyles';
import { PageComponent } from './page.component';

fdescribe('PageComponent', () => {
  let pageTemplate: PageTemplate;
  let pageComponent: ComponentFixture<PageComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent],
      providers: [BlueriqComponents.register([PageComponent])],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule
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

    expect(page.size).toBe('responsive');
    expect(pageComponent.nativeElement.querySelector('.page.responsive')).toBeTruthy();
    expect(pageComponent.nativeElement.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should have widths based on content styles', () => {
    const page = pageComponent.componentInstance;

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_FULL)
    );
    expect(page.size).toBe('full');
    expect(pageComponent.nativeElement.querySelector('.page.full')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_LARGE)
    );
    expect(page.size).toBe('large');
    expect(pageComponent.nativeElement.querySelector('.page.large')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_MEDIUM)
    );
    expect(page.size).toBe('medium');
    expect(pageComponent.nativeElement.querySelector('.page.medium')).toBeTruthy();

    session.update(
      pageTemplate.contentStyle(BqContentStyles.WIDTH_SMALL)
    );
    expect(page.size).toBe('small');
    expect(pageComponent.nativeElement.querySelector('.page.small')).toBeTruthy();
  });

});
