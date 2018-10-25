import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { PageTemplate } from '@blueriq/core/testing';
import { PageComponent } from './page.component';
import { PageMessagesComponent } from './page.messages.component';
import { PageModule } from './page.module';

describe('PageComponent', () => {
  let pageTemplate: PageTemplate;
  let pageComponent: ComponentFixture<PageComponent>;
  let session: BlueriqTestSession;
  const errorMsg = 'This is an error message';
  const warnMsg = 'This is a warning message';
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async(() => {
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['openFromComponent', 'dismiss']);
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        RouterModule.forRoot([]),
        PageModule
      ]
    });
  }));

  it('should display page error messages if there are any', (done) => {
    pageTemplate = PageTemplate.create().error(errorMsg);
    session = BlueriqSessionTemplate.create().build(pageTemplate);
    pageComponent = session.get(PageComponent);

    setTimeout(() => {
      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(PageMessagesComponent, {
        data: [{ type: 'error', text: errorMsg }],
        panelClass: 'snackbar-error'
      });
      done();
    });
  });

  it('should display page warning messages if there are any', (done) => {
    pageTemplate = PageTemplate.create().warning(warnMsg);
    session = BlueriqSessionTemplate.create().build(pageTemplate);
    pageComponent = session.get(PageComponent);

    setTimeout(() => {
      expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(PageMessagesComponent, {
        data: [{ type: 'warning', text: warnMsg }],
        panelClass: 'snackbar-warning'
      });
      done();
    });
  });
});
