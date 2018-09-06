import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Container, Page } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
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
export class ContainerComponent implements OnInit {

  constructor(@Host() public container: Container,
              @Optional() @Host() public readonly table: Table,
              private blueriqSession: BlueriqSession
  ) {
  }

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

  ngOnInit() {
  }

  isDashboardBody(): boolean {
    return this.container.contentStyle === BqContentStyles.DASHBOARD_BODY;
  }

  isDashboardRow(): boolean {
    return this.container.contentStyle === BqContentStyles.DASHBOARD_ROW;
  }

  isDashboardWidget(): boolean {
    return this.container.contentStyle === BqContentStyles.DASHBOARD_WIDGET;
  }

  isTopContainer() {
    return this.container.parent instanceof Page && this.blueriqSession.isRoot;
  }

  isIntroduction(): boolean {
    return this.container.styles.has(BqPresentationStyles.INTRODUCTION);
  }

  isTransparent(): boolean {
    return this.container.styles.has(BqPresentationStyles.TRANSPARENT);
  }

  isCard(): boolean {
    return (this.isTopContainer() && !this.isDashboardBody() && !this.isTransparent() && !this.isIntroduction())
      || this.isDashboardWidget();
  }

  isHorizontal(): boolean {
    return this.container.styles.has(BqPresentationStyles.HORIZONTAL) || this.isDashboardRow();
  }

  isAlignRight(): boolean {
    return this.container.styles.hasAny(BqPresentationStyles.ALIGNRIGHT, BqPresentationStyles.DEPRECATED_ALIGNRIGHT);
  }
}
