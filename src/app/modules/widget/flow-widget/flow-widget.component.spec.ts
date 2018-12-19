import { Component, Host } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlueriqComponent, BlueriqComponents, FailedAction, SessionRegistry } from '@blueriq/angular';
import {
  BlueriqSessionTemplate,
  BlueriqTestingModule,
  BlueriqTestSession,
  SessionTemplate,
} from '@blueriq/angular/testing';
import { Page } from '@blueriq/core';
import { ContainerTemplate, PageModelTemplate, PageTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { WidgetModule } from '../widget.module';
import { FlowWidgetComponent } from './flow-widget.component';

@Component({
  template: '<span id="widgetSessionDisplayName">{{page.displayName}}</span>',
})
@BlueriqComponent({
  type: Page,
})
class MockPageComponent {
  constructor(@Host() public readonly page: Page) {
  }
}

describe('FlowWidgetComponent', () => {
  let container: ContainerTemplate;
  let component: ComponentFixture<FlowWidgetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockPageComponent],
      providers: [BlueriqComponents.register([MockPageComponent])],
      imports: [
        BlueriqTestingModule,
        WidgetModule,
      ],
    });
  }));

  beforeEach(() => {
    container = ContainerTemplate.create('containername')
    .displayName('Container display name')
    .contentStyle('dashboard_flowwidget')
    .properties({ 'info': 'WidgetInfo_DashboardFlowWidget' });

    const pageModel = PageModelTemplate.create(PageTemplate.create('pagename').displayName('Widget display name'));
    const dashboardSession = SessionTemplate.create()
    .sessionName('session-name-DashboardFlowWidget')
    .pageModel(pageModel).build();

    const sessionRegistry: SessionRegistry = TestBed.get(SessionRegistry);
    sessionRegistry.register(dashboardSession);

    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(FlowWidgetComponent);
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should display an error message when widget fails to load', () => {
    const bqError: FailedAction = { error: { cause: { message: 'whoops' } }, type: 'some_error' };
    component.componentInstance.handleError(bqError);
    component.detectChanges();

    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');
    const errorElement = component.nativeElement.querySelector('mat-error');

    // Verify
    expect(widgetSessionSpan).toBeFalsy('No widget should be shown');
    expect(errorElement).toBeTruthy();
    expect(errorElement.innerText).toContain('whoops');
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

  it('should use the bq-heading to display header', () => {
    const widgetSessionSpan = component.nativeElement.querySelector('#widgetSessionDisplayName');

    // Verify
    expect(component.nativeElement.querySelector('bq-heading')).toBeTruthy();
    expect(widgetSessionSpan.innerHTML).toEqual('Widget display name');
  });

});
