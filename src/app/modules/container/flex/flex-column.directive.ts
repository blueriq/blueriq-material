import { ComponentRef, Directive, Input, OnChanges, OnDestroy, Renderer2, Self, SimpleChanges } from '@angular/core';
import { BlueriqListeners, BqElementDirective } from '@blueriq/angular';
import { Element } from '@blueriq/core';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BqContentStyles } from '../../BqContentStyles';
import { BqPresentationStyles } from '../../BqPresentationStyles';

/**
 * This directive can be added to a container to add a flex-grow style and bq-column class to it, only if it has a content
 * style that starts with `dashboard_column`
 */
@Directive({
    selector: '[bqFlexColumn]',
    standalone: false
})
export class FlexColumnDirective implements OnChanges, OnDestroy {

  private _subscription: Subscription | undefined;

  @Input()
  bqElement: Element;

  constructor(private readonly renderer: Renderer2,
              private readonly listeners: BlueriqListeners,
              @Self() private readonly bqElementDirective: BqElementDirective) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._subscription = combineLatest([
      this.bqElementDirective.component$,
      this.listeners.listen(this.bqElement).pipe(startWith(this.bqElement)),
    ]).subscribe(([componentRef, element]) => {
      this.addFlexStyles(componentRef, element);
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private addFlexStyles(componentRef: ComponentRef<unknown>, element: Element): void {
    if (element.contentStyle && element.contentStyle.startsWith(BqContentStyles.DASHBOARD_COLUMN_PREFIX)) {
      const domColumn = componentRef.location.nativeElement;
      this.renderer.setStyle(domColumn, 'flex-grow', this.determineWeight(element));
      this.renderer.addClass(domColumn, 'bq-column');
      this.renderer.addClass(domColumn.parentNode, 'bq-row');
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
