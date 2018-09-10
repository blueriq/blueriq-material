import { Directive, Input, OnDestroy, Renderer2 } from '@angular/core';
import { BlueriqListeners, getAngularComponent } from '@blueriq/angular';
import { Element } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';

/**
 * This directive can be added to a container to add a flex-grow style to it, based on the container's content style.
 * It is meant for dashboard columns only!
 */
@Directive({
  selector: '[bqFlexChild]'
})
export class HorizontalFlexChildDirective implements OnDestroy {

  private static REGEXP_PS = new RegExp('^' + BqPresentationStyles.WEIGHT_PREFIX + '(\\d+)$');
  private static REGEXP_CS = new RegExp('^' + BqContentStyles.DASHBOARD_COLUMN_PREFIX + '(\\d+)$');

  @Input('bqFlexChild')
  enableFlexChild: boolean;

  private _subscription: Subscription | undefined;

  constructor(private renderer: Renderer2,
              private listeners: BlueriqListeners) {
  }

  @Input()
  set bqElement(element: Element) {
    if (this.enableFlexChild) {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }

      this._subscription = this.listeners.listen(element).subscribe(() => {
        this.applyStylesIfRequired(element);
      });

      this.applyStylesIfRequired(element);
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private applyStylesIfRequired(element: Element): void {
    const weightStyle = element.styles.get(style => style.startsWith(BqPresentationStyles.WEIGHT_PREFIX));
    if (weightStyle) {
      if (this.decorateHostElement(element, weightStyle, HorizontalFlexChildDirective.REGEXP_PS)) {
        return;
      }
    }

    // (legacy) content style
    if (element.contentStyle) {
      if (this.decorateHostElement(element, element.contentStyle, HorizontalFlexChildDirective.REGEXP_CS)) {
        return;
      }
    }

    this.applyStyles(element, 1);
  }

  private decorateHostElement(element: Element, style: string, regex: RegExp): boolean {
    const matches = style.match(regex);
    if (matches) {
      this.applyStyles(element, +matches[1]);
      return true;
    }
    return false;
  }

  private applyStyles(element: Element, flexGrow: number) {
    // retrieve the host element from the angular component
    const component = getAngularComponent(element);
    if (component) {
      this.renderer.addClass(component.location.nativeElement, 'bq-column');
      this.renderer.setStyle(component.location.nativeElement, 'flex-grow', flexGrow);
    }
  }
}
