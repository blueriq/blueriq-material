import { Directive, Input, OnChanges, OnDestroy, Renderer2, Self, SimpleChanges } from '@angular/core';
import { BlueriqListeners, BqElementDirective, getAngularComponent } from '@blueriq/angular';
import { Element } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqContentStyles } from '../../BqContentStyles';
import { BqPresentationStyles } from '../../BqPresentationStyles';

/**
 * This directive can be added to a container to add a flex-grow style and bq-column class to it, only if it has a content
 * style that starts with `dashboard_column`
 */
@Directive({
  selector: '[bqFlexColumn]',
})
export class FlexColumnDirective implements OnChanges, OnDestroy {

  private _subscription: Subscription | undefined;

  @Input()
  bqElement: Element;

  constructor(private renderer: Renderer2,
              private listeners: BlueriqListeners,

              // Inject BqElementDirective to force its ordering to be
              // before this directive, to ensure the component has been rendered
              @Self() bqElementDirective: BqElementDirective) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._subscription = this.listeners.listen(this.bqElement).subscribe(() => {
      this.addFlexStyles(this.bqElement);
    });

    this.addFlexStyles(this.bqElement);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private addFlexStyles(element: Element): void {
    if (element.contentStyle && element.contentStyle.indexOf(BqContentStyles.DASHBOARD_COLUMN_PREFIX) === 0) {

      const columnComponent = getAngularComponent(element);
      if (columnComponent) {
        const domColumn = columnComponent.location.nativeElement;
        this.renderer.setStyle(domColumn, 'flex-grow', this.determineWeight(element));
        this.renderer.addClass(domColumn, 'bq-column');
        this.renderer.addClass(domColumn.parentNode, 'bq-row');
      }
    }

  }

  private determineWeight(element: Element): number {
    let weight = 1;
    const weightPresentationStyle = element.styles.get(style => style.startsWith(BqPresentationStyles.WEIGHT_PREFIX));
    if (weightPresentationStyle) {
      const matches = weightPresentationStyle.match(BqPresentationStyles.WEIGHT_REGEXP);
      if (matches) {
        weight = +matches[1];
      }
    } else if (element.contentStyle) {
      const matches = element.contentStyle.match(BqContentStyles.WEIGHT_REGEXP);
      if (matches) {
        weight = +matches[1];
      }
    }
    return weight;
  }

}
