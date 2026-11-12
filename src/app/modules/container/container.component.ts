import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { BlueriqComponent, OnUpdate, BlueriqCommonModule } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { BqContainerDirective } from '../../shared/directive/container/bq-container.directive';
import { HeadingComponent } from '../heading/heading.component';
import { HorizontalFlexChildDirective } from './flex/horizontal-flex-child.directive';
import { FlexColumnDirective } from './flex/flex-column.directive';

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
    imports: [
      BlueriqCommonModule,
      BqKeyDirective,
      BqContainerDirective,
      HeadingComponent,
      HorizontalFlexChildDirective,
      FlexColumnDirective,
    ]
})
@BlueriqComponent({
  type: Container,
})
export class ContainerComponent implements OnInit, OnUpdate {
  container = inject(Container);
  readonly list = inject(List, { optional: true });


  public isHorizontal = false;

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
