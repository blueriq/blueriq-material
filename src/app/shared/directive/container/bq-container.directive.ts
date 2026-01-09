import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { BlueriqListeners, BlueriqSession } from '@blueriq/angular';
import { Container, Page } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqContentStyles } from '../../../modules/BqContentStyles';
import { BqPresentationStyles } from '../../../modules/BqPresentationStyles';

@Directive({
    selector: '[bqContainer]',
    standalone: false
})
export class BqContainerDirective implements OnInit, OnDestroy {
  private readonly hostElement = inject(ElementRef);
  private readonly blueriqSession = inject(BlueriqSession);
  private readonly renderer = inject(Renderer2);
  private readonly listeners = inject(BlueriqListeners);


  private _container: Container;
  private _subscription: Subscription | undefined;

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
    const alignRight = container.styles.hasAny(BqPresentationStyles.ALIGNRIGHT,
      BqPresentationStyles.DEPRECATED_ALIGNRIGHT);

    if (topContainer) {
      this.renderer.addClass(this.hostElement.nativeElement, 'top-container');
    }
    if (alignRight) {
      this.renderer.addClass(this.hostElement.nativeElement, 'align-right');
    }
    if (dashboardWidget) {
      this.renderer.addClass(this.hostElement.nativeElement, 'bq-widget');
    }
    /* A container can have one of the following styling:
     * Introduction / Transparent / Card (default) */
    if (container.styles.has(BqPresentationStyles.INTRODUCTION)) {
      this.renderer.addClass(this.hostElement.nativeElement, 'introduction');
    } else if (container.styles.has(BqPresentationStyles.TRANSPARENT)) {
      this.renderer.addClass(this.hostElement.nativeElement, 'transparent');
    } else if ((topContainer && !isDashboardBody) || dashboardWidget) {
      this.renderer.addClass(this.hostElement.nativeElement, 'card');
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
