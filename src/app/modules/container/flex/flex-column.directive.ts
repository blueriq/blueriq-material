import { Directive, Input, OnDestroy, Renderer2 } from '@angular/core';
import { BlueriqListeners, getAngularComponent } from '@blueriq/angular';
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
export class FlexColumnDirective implements OnDestroy {

  private _subscription: Subscription | undefined;

  constructor(private renderer: Renderer2,
              private listeners: BlueriqListeners) {
  }

  @Input()
  set bqElement(element: Element) {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._subscription = this.listeners.listen(element).subscribe(() => {
      this.addFlexStyles(element);
    });

    this.addFlexStyles(element);
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
