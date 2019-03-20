import { Component, Host } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BlueriqComponent,
  BlueriqComponents,
  BlueriqResponseError,
  FailedAction,
  SessionRegistry,
} from '@blueriq/angular';
import {
  BlueriqSessionTemplate,
  BlueriqTestingModule,
  BlueriqTestSession,
  SessionTemplate,
} from '@blueriq/angular/testing';
import { ErrorType, Page } from '@blueriq/core';
import { ContainerTemplate, PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { ExternalContainerComponent } from './external-container.component';
import { ExternalContainerModule } from './external-container.module';


@Component({
  template: '<span id="externalContainer">{{page.displayName}}</span>',
})
@BlueriqComponent({
  type: Page,
})
class MockPageComponent {
  constructor(@Host() public readonly page: Page) {
  }
}

describe('ExternalContainerComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<ExternalContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockPageComponent],
      providers: [BlueriqComponents.register([MockPageComponent])],
      imports: [
        BlueriqTestingModule,
        ExternalContainerModule,
      ],
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create('containername')
      .displayName('Container display name')
      .contentStyle('external_container')
      .properties({ 'info': 'ExternalContainer', 'configurationid': 'testConfigurationid' });

    const pageModel = PageModelTemplate.create(PageTemplate.create('pagename').displayName('ExternalContainer display name'));
    const dashboardSession = SessionTemplate.create()
      .sessionName('session-name-ExternalContainer')
      .pageModel(pageModel).build();

    const sessionRegistry: SessionRegistry = TestBed.get(SessionRegistry);
    sessionRegistry.register(dashboardSession);

    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(ExternalContainerComponent);
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should display an error message when external container fails to load', () => {
    const error = new BlueriqResponseError({ errorType: ErrorType.Exception, title: 'Error!', message: 'Whoops' });
    const bqError: FailedAction = { type: 'some_error', error };
    component.componentInstance.handleError(bqError);
    component.detectChanges();

    const containerSessionSpan = component.nativeElement.querySelector('#ExternalContainer');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(containerSessionSpan).toBeFalsy('No container should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('Whoops');
  });

  it('should display a generic error for an unrecognized error', () => {
    const bqError: FailedAction = { error: { type: 'unknown' }, type: 'some_error' };
    component.componentInstance.handleError(bqError);
    component.detectChanges();

    const containerSessionSpan = component.nativeElement.querySelector('#ExternalContainer');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(containerSessionSpan).toBeFalsy('No container should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('An unknown error occurred');
  });

  it('should display an error message when container session is expired', () => {
    component.componentInstance.handleSessionExpired();
    component.detectChanges();

    const containerSessionSpan = component.nativeElement.querySelector('#ExternalContainer');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(containerSessionSpan).toBeFalsy('No container should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('Your session has expired');
  });

  it('should display an error message when flow has ended', () => {
    component.componentInstance.handleFlowEnded();
    component.detectChanges();

    const containerSessionSpan = component.nativeElement.querySelector('#ExternalContainer');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(containerSessionSpan).toBeFalsy('No container should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('The flow has ended');
  });

});
