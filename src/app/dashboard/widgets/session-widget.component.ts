import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  BlueriqDashboard,
  DashboardAuthService,
  DashboardState,
  DashboardWidgets,
  DashboardWidgetSession
} from '@blueriq/dashboard';
import { Observable } from 'rxjs';

@Component({
    selector: 'bq-session-widget',
    template: '',
    standalone: false
})
export class SessionWidgetComponent implements OnInit {

  readonly DashboardState = DashboardState;
  parameters$: Observable<Params>;
  baseUrl: string;
  dashboardState: DashboardState;

  @Input()
  widget: DashboardWidgets;

  get sessionName(): string {
    return this.widgetSession.name;
  }

  get id(): string {
    return this.widgetSession.id;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly widgetSession: DashboardWidgetSession,
    private readonly dashboard: BlueriqDashboard,
    private readonly authService: DashboardAuthService,
  ) {
  }

  ngOnInit(): void {
    this.widgetSession.initialize(this.widget.id);
    this.baseUrl = this.widget.baseUrl + '/' + this.widgetSession.id;
    this.parameters$ = this.route.queryParams;
    this.dashboard.state.subscribe(state => this.dashboardState = state);
  }

  onUnauthorized(): void {
    this.authService.login();
  }

}
