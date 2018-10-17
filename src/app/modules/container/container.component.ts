import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container, Page } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-container',
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
  animations: [
    trigger('animate', [
      transition(':leave', [
        query('@*', animateChild(), { optional: true })
      ])
    ])
  ]
})
@BlueriqComponent({
  type: Container
})
export class ContainerComponent implements OnInit, OnUpdate {

  public dashboardwidget = false;
  public topcontainer = false;
  public introduction = false;
  public transparent = false;
  public card = false;
  public horizontal = false;
  public alignRight = false;

  constructor(@Host() public container: Container,
              @Optional() @Host() public readonly table: List,
              private blueriqSession: BlueriqSession
  ) {
  }

  ngOnInit() {
    this.determineDisplayStyle();
  }

  bqOnUpdate() {
    this.determineDisplayStyle();
  }

  /**
   * Finds presentation styles to determine the look-and-feel of the container
   */
  private determineDisplayStyle() {
    const isDashboardbody = this.container.contentStyle === BqContentStyles.DASHBOARD_BODY;
    const isDashboardrow = this.container.contentStyle === BqContentStyles.DASHBOARD_ROW;
    this.dashboardwidget = this.container.contentStyle === BqContentStyles.DASHBOARD_WIDGET;
    this.topcontainer = this.container.parent instanceof Page && this.blueriqSession.isRoot;
    this.introduction = this.container.styles.has(BqPresentationStyles.INTRODUCTION);
    this.transparent = this.container.styles.has(BqPresentationStyles.TRANSPARENT);
    this.card = (this.topcontainer && !isDashboardbody && !this.transparent && !this.introduction)
      || this.dashboardwidget;
    this.horizontal = this.container.styles.has(BqPresentationStyles.HORIZONTAL) || isDashboardrow;
    this.alignRight = this.container.styles.hasAny(BqPresentationStyles.ALIGNRIGHT,
      BqPresentationStyles.DEPRECATED_ALIGNRIGHT);
  }

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

}
