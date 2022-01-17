import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlueriqResponseError, FailedAction, SessionRegistry } from '@blueriq/angular';
import {
  BlueriqSessionTemplate,
  BlueriqTestingModule,
  BlueriqTestSession,
  SessionTemplate,
} from '@blueriq/angular/testing';
import { ErrorType } from '@blueriq/core';
import { ContainerTemplate, PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { WidgetModule } from '../widget.module';
import { FlowWidgetComponent } from './flow-widget.component';

describe('FlowWidgetComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<FlowWidgetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        WidgetModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    container = ContainerTemplate.create('containername')
      .displayName('Container display name')
      .contentStyle('dashboard_flowwidget')
      .properties({ 'info': 'WidgetInfo_DashboardFlowWidget' });

    const pageModel = PageModelTemplate.create(PageTemplate.create('pagename').displayName('Widget display name'));
    const dashboardSession = SessionTemplate.create()
      .sessionName('session-name-DashboardFlowWidget')
      .pageModel(pageModel).build();

    const sessionRegistry: SessionRegistry = TestBed.inject(SessionRegistry);
    sessionRegistry.register(dashboardSession);

    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FlowWidgetComponent);
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should display an error message when widget fails to load', () => {
    const error = new BlueriqResponseError({ errorType: ErrorType.Exception, title: 'Error!', message: 'Whoops' });
    const bqError: FailedAction = { type: 'some_error', error };
    component.componentInstance.handleError(bqError);
    component.detectChanges();

    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(widgetSessionSpan).toBeFalsy('No widget should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('Whoops');
  });

  it('should display a generic error for an unrecognized error', () => {
    const bqError: FailedAction = { error: { type: 'unknown' }, type: 'some_error' };
    component.componentInstance.handleError(bqError);
    component.detectChanges();

    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(widgetSessionSpan).toBeFalsy('No widget should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('An unknown error occurred');
  });

  it('should display an error message when widget session is expired', () => {
    component.componentInstance.handleSessionExpired();
    component.detectChanges();

    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(widgetSessionSpan).toBeFalsy('No widget should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('Your session has expired');
  });

  it('should display an error message when flow has ended', () => {
    component.componentInstance.handleFlowEnded();
    component.detectChanges();

    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(widgetSessionSpan).toBeFalsy('No widget should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('The flow has ended');
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });
});
