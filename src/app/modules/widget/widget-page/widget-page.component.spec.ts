import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WidgetPageComponent} from './widget-page.component';
import {ContainerTemplate, PageModelTemplate, PageTemplate} from "@blueriq/core/testing";
import {
  BlueriqSessionTemplate,
  BlueriqTestingModule,
  BlueriqTestSession,
  SessionTemplate
} from "@blueriq/angular/testing";
import {WidgetModule} from "../widget.module";
import {SessionRegistry} from "@blueriq/angular";
import {FlowWidgetComponent} from "../flow-widget/flow-widget.component";
import {By} from "@angular/platform-browser";
import {BqContainerDirective} from "@shared/directive/container/bq-container.directive";
import {ContainerModule} from "../../container/container.module";

describe('WidgetPageComponent', () => {
  let component: ComponentFixture<FlowWidgetComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BlueriqTestingModule,
        WidgetModule,
        ContainerModule
      ],
    });
  }));

  beforeEach(() => {
    const container = ContainerTemplate.create('containername')
      .displayName('Container display name')
      .contentStyle('dashboard_flowwidget')
      .properties({'info': 'WidgetInfo_DashboardFlowWidget'});

    const pageModel = PageModelTemplate.create(
      PageTemplate.create('pagename')
        .displayName('Widget display name')
        .children(
          ContainerTemplate.create('containername1')
            .displayName('Container display name1'),
          ContainerTemplate.create('containername2')
            .displayName('Container display name2')
        )
    );
    const dashboardSession = SessionTemplate.create()
      .sessionName('session-name-DashboardFlowWidget')
      .pageModel(pageModel).build();

    const sessionRegistry: SessionRegistry = TestBed.get(SessionRegistry);
    sessionRegistry.register(dashboardSession);

    session = BlueriqSessionTemplate.create().build(container);

    component = session.get(FlowWidgetComponent);
    component.detectChanges();
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should contain 2 children', () => {
    expect(component.nativeElement.querySelectorAll('.widget-page-child').length).toBe(2);
    expect(component.nativeElement.querySelectorAll('bq-container').length).toBe(2);
  });
});
