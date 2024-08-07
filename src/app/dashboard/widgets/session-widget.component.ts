import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DashboardWidgetSession, WidgetModels } from '@blueriq/dashboard';
import { Observable } from 'rxjs';
import { LoginAction } from '../events/actions';
import { Dispatcher } from '@blueriq/angular';

@Component({
  selector: 'bq-session-widget',
  template: '',
})
export class SessionWidgetComponent implements OnInit {

  @Input()
  widget: WidgetModels;

  parameters$: Observable<Params>;
  baseUrl: string;

  get sessionName(): string {
    return this.widgetSession.name;
  }

  get id(): string {
    return this.widgetSession.id;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly widgetSession: DashboardWidgetSession,
    protected readonly dispatcher: Dispatcher,
  ) {
  }

  ngOnInit(): void {
    this.widgetSession.initialize(this.widget.id);
    this.baseUrl = this.widget.baseUrl + '/' + this.widgetSession.id;
    this.parameters$ = this.route.queryParams;
  }

  onUnauthorized(): void {
    this.dispatcher.dispatch(new LoginAction());
  }

}
