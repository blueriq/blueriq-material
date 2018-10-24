import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ContainerComponentMatcher } from './container-component-matcher';

@Component({
  selector: 'bq-container',
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
  type: Container,
  selector: new ContainerComponentMatcher()
})

export class ContainerComponent implements OnInit, OnUpdate {

  public horizontal = false;

  constructor(@Host() public container: Container,
              @Optional() @Host() public readonly table: List,
              private blueriqSession: BlueriqSession
  ) {
  }

  get isWidget(): boolean {
    return this.blueriqSession.isWidget;
  }

  ngOnInit() {
    this.determineDisplayStyle();
  }

  bqOnUpdate() {
    this.determineDisplayStyle();
  }

  /**
   * Finds presentation styles to determine if it is a horizontal view
   */
  private determineDisplayStyle() {
    this.horizontal = this.container.styles.has(BqPresentationStyles.HORIZONTAL) || this.container.contentStyle === BqContentStyles.DASHBOARD_ROW;
  }

}
