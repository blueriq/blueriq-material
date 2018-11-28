import { Directive, Input, OnDestroy, Renderer2 } from '@angular/core';
import { BlueriqListeners, getAngularComponent } from '@blueriq/angular';
import { Element } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqContentStyles } from '../../BqContentStyles';
import { BqPresentationStyles } from '../../BqPresentationStyles';

/**
 * This directive can be added to a container to add a flex-grow style to it, based on the container's content style.
 * It is meant for children of containers with presentation style 'horizontal' only!
 */
@Directive({
  selector: '[bqFlexChild]',
})
export class HorizontalFlexChildDirective implements OnDestroy {

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
      this.applyStylesIfRequired(element);
    });

    this.applyStylesIfRequired(element);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private applyStylesIfRequired(element: Element): void {
    const weightPresentationStyle = element.styles.get(style => style.startsWith(BqPresentationStyles.WEIGHT_PREFIX));
    if (weightPresentationStyle) {
      if (this.decorateHostElement(element, weightPresentationStyle, BqPresentationStyles.WEIGHT_REGEXP)) {
        return;
      }
    }

    // (legacy) content style
    if (element.contentStyle) {
      if (this.decorateHostElement(element, element.contentStyle, BqContentStyles.WEIGHT_REGEXP)) {
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
