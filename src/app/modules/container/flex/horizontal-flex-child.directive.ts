import { ComponentRef, Directive, Input, OnChanges, OnDestroy, Renderer2, Self, SimpleChanges } from '@angular/core';
import { BlueriqListeners, BqElementDirective } from '@blueriq/angular';
import { Element } from '@blueriq/core';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BqContentStyles } from '../../BqContentStyles';
import { BqPresentationStyles } from '../../BqPresentationStyles';

/**
 * This directive can be added to a container to add a flex-grow style to it, based on the container's content style.
 * It is meant for children of containers with presentation style 'horizontal' only!
 */
@Directive({
  selector: '[bqFlexChild]',
})
export class HorizontalFlexChildDirective implements OnChanges, OnDestroy {

  private _subscription: Subscription | undefined;

  @Input()
  bqElement: Element;

  constructor(private renderer: Renderer2,
              private listeners: BlueriqListeners,
              @Self() private bqElementDirective: BqElementDirective) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this._subscription = combineLatest([
      this.bqElementDirective.component$,
      this.listeners.listen(this.bqElement).pipe(startWith(this.bqElement)),
    ]).subscribe(([componentRef, element]) => {
      this.applyStylesIfRequired(componentRef, element);
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private applyStylesIfRequired(componentRef: ComponentRef<unknown>, element: Element): void {
    const flexGrow = determineWeight(element);
    const domElement = componentRef.location.nativeElement;
    this.renderer.addClass(domElement, 'bq-column');
    this.renderer.setStyle(domElement, 'flex-grow', flexGrow);
  }
}

function determineWeight(element: Element): number {
  const weightPresentationStyle = element.styles.get(style => style.startsWith(BqPresentationStyles.WEIGHT_PREFIX));
  return extractWeight(weightPresentationStyle, BqPresentationStyles.WEIGHT_REGEXP)
    ?? extractWeight(element.contentStyle, BqContentStyles.WEIGHT_REGEXP)
    ?? 1;
}

function extractWeight(style: string | undefined, regex: RegExp): number | null {
  const matches = style && style.match(regex);
  return matches ? +matches[1] : null;
}
