import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, OnInit, Optional } from '@angular/core';
import { BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-container',
  templateUrl: './container.component.html',
  animations: [
    trigger('animate', [
      transition(':leave', [
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),
  ],
})
@BlueriqComponent({
  type: Container,
})
export class ContainerComponent implements OnInit, OnUpdate {

  public isHorizontal = false;

  constructor(public container: Container,
              @Optional() public readonly list: List) {
  }

  ngOnInit() {
    this.determineDisplayStyle();
  }

  bqOnUpdate() {
    this.determineDisplayStyle();
  }

  /**
   * Whether to display the heading for this container
   */
  public shouldDisplayHeading(): boolean {
    return !this.hasListAsAncestor() && !this.isDirectChildOfTab();
  }

  private hasListAsAncestor(): boolean {
    return !!this.list;
  }

  private isDirectChildOfTab(): boolean {
    if (this.container.parent) {
      return this.container.parent.contentStyle === BqContentStyles.TAB;
    }
    return false;
  }

  /**
   * Finds presentation styles to determine if it is a horizontal view
   */
  private determineDisplayStyle() {
    this.isHorizontal = this.container.styles.has(BqPresentationStyles.HORIZONTAL);
  }

}
