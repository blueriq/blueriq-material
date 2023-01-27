import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BlueriqResponseError, CloseSessionStrategy, Dispatcher, SessionRegistry } from '@blueriq/angular';
import { ErrorType } from '@blueriq/core';
import { DashboardSessionModule, DashboardWidgetSession } from '@blueriq/dashboard';
import { TestDispatcher } from '@blueriq/angular/testing';
import { NotificationType } from '../../../notification-overlay/notification.model';
import { FlowWidgetComponent } from './flow-widget.component';

describe('Flow Widget Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowWidgetComponent],
      imports: [
        RouterModule.forRoot([]),
        DashboardSessionModule,
      ],
      providers: [
        DashboardWidgetSession,
        SessionRegistry,
        { provide: Dispatcher, useClass: TestDispatcher },
        CloseSessionStrategy,
      ],
    }).compileComponents();
  });

  it('should return widgetStartType regular when NO shortcut is set', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    expect(fixture.componentInstance.widgetStartType).toEqual('regular');
  });

  it('should return widgetStartType shortcut when shortcut is set', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      shortcutName: 'TEST_SHORTCUT',
    };
    fixture.componentInstance.ngOnInit();

    expect(fixture.componentInstance.widgetStartType).toEqual('shortcut');
  });

  it('should return widgetStartType invalid when invalid widget model', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
    };
    fixture.componentInstance.ngOnInit();

    expect(fixture.componentInstance.widgetStartType).toEqual('invalid');
  });

  it('should update the notification when a session is expired', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.onSessionExpired();

    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.SessionExpired);
    expect(notification!.title).toEqual('Session expired');
    expect(notification!.message).toEqual('Your session has expired due to inactivity');
  });

  it('should update the notification when a flow has ended', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.onFlowEnded();

    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('Widget Ended');
    expect(notification!.message).toEqual(`The flow for 'TEST-ID' has ended. Widget flows should never end, please revisit the widget's flowing.`);
  });

  it('should display an Blueriq error message', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.onError({
      error: new BlueriqResponseError({
        errorType: ErrorType.Exception,
        message: 'woepsie',
        title: 'error',
      }), type: 'error',
    });

    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('error');
    expect(notification!.message).toEqual('woepsie');
  });


  it('should display a generic error message', () => {
    const fixture = TestBed.createComponent(FlowWidgetComponent);
    fixture.componentInstance.widget = {
      id: 'TEST-ID',
      type: 'blueriq-flow',
      baseUrl: '/',
      flowName: 'TEST_FLOW',
      projectName: 'TEST_PROJECT',
      versionName: 'TEST_VERSION',
    };
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.onError({
      error: 'error', type: 'error',
    });

    const notification = fixture.componentInstance.notification;
    expect(notification!.type).toBe(NotificationType.Error);
    expect(notification!.title).toEqual('Oops!');
    expect(notification!.message).toEqual('An unknown error occurred');
  });
});
