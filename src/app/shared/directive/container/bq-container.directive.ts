import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BlueriqListeners, BlueriqSession } from '@blueriq/angular';
import { Container, Page } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqContentStyles } from '../../../modules/BqContentStyles';
import { BqPresentationStyles } from '../../../modules/BqPresentationStyles';

@Directive({
  selector: '[bqContainer]'
})
export class BqContainerDirective implements OnInit, OnDestroy {

  private _container: Container;

  @Input('bqDisableHeader')
  _disableHeader: boolean;

  private _subscription: Subscription | undefined;

  constructor(private hostElement: ElementRef,
              private blueriqSession: BlueriqSession,
              private renderer: Renderer2,
              private listeners: BlueriqListeners) {
  }

  /**
   * Finds presentation styles to determine the look-and-feel of the container
   */
  @Input('bqContainer')
  set bqContainer(container: Container) {
    this._container = container;
  }

  ngOnInit(): void {
    this._subscription = this.listeners.listen(this._container).subscribe(() => {
      this.renderer.removeClass(this.hostElement.nativeElement, 'card');
      this.determineDisplayStyle(this._container);
    });
    this.determineDisplayStyle(this._container);
  }

  private determineDisplayStyle(container: Container) {
    const isDashboardBody = container.contentStyle === BqContentStyles.DASHBOARD_BODY;
    const dashboardWidget = container.contentStyle === BqContentStyles.DASHBOARD_WIDGET ||
      container.contentStyle === BqContentStyles.DASHBOARD_FLOWWIDGET;
    const topContainer = container.parent instanceof Page && this.blueriqSession.isRoot;
    const transparent = container.styles.has(BqPresentationStyles.TRANSPARENT);
    const introduction = container.styles.has(BqPresentationStyles.INTRODUCTION);
    const card = (topContainer && !isDashboardBody && !transparent && !introduction)
      || dashboardWidget;
    const alignRight = container.styles.hasAny(BqPresentationStyles.ALIGNRIGHT,
      BqPresentationStyles.DEPRECATED_ALIGNRIGHT);
    if (topContainer) {
      this.renderer.addClass(this.hostElement.nativeElement, 'top-container');
    }
    if (introduction) {
      this.renderer.addClass(this.hostElement.nativeElement, 'introduction');
    }
    else if (transparent) {
      this.renderer.addClass(this.hostElement.nativeElement, 'transparent');
    }
    else if (card) {
      this.renderer.addClass(this.hostElement.nativeElement, 'card');
    }
    if (alignRight) {
      this.renderer.addClass(this.hostElement.nativeElement, 'align-right');
    }
    if (dashboardWidget) {
      this.renderer.addClass(this.hostElement.nativeElement, 'bq-widget');
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
