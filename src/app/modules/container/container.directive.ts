import { Directive, ElementRef, Host, Input, Optional, Renderer2 } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container, Page } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Directive({
  selector: '[bqContainer]'
})
export class ContainerDirective {

  constructor(private hostElement: ElementRef,
              private blueriqSession: BlueriqSession,
              private renderer: Renderer2,
              @Optional() @Host() public readonly table: List
              /*private listeners: BlueriqListeners*/) {
    renderer.addClass(hostElement.nativeElement, 'container');
    console.log('inTable?:', !!this.table);
  }

  /**
   * Finds presentation styles to determine the look-and-feel of the container
   */
  @Input('bqContainer')
  set bqContainer(container: Container) {
    // TODO const isDashboardrow = container.contentStyle === BqContentStyles.DASHBOARD_ROW;
    // TODO const horizontal = container.styles.has(BqPresentationStyles.HORIZONTAL) || isDashboardrow;
    const isDashboardbody = container.contentStyle === BqContentStyles.DASHBOARD_BODY;
    const dashboardwidget = container.contentStyle === BqContentStyles.DASHBOARD_WIDGET;
    const topcontainer = container.parent instanceof Page && this.blueriqSession.isRoot;
    const transparent = container.styles.has(BqPresentationStyles.TRANSPARENT);
    const introduction = container.styles.has(BqPresentationStyles.INTRODUCTION);
    const card = (topcontainer && !isDashboardbody && !transparent && !introduction)
      || dashboardwidget;
    const alignRight = container.styles.hasAny(BqPresentationStyles.ALIGNRIGHT,
      BqPresentationStyles.DEPRECATED_ALIGNRIGHT);

    if (topcontainer) {
      this.renderer.addClass(this.hostElement.nativeElement, 'top-container');
    }
    if (introduction) {
      this.renderer.addClass(this.hostElement.nativeElement, 'introduction');
    }
    if (transparent) {
      this.renderer.addClass(this.hostElement.nativeElement, 'transparent');
    }
    if (card) {
      this.renderer.addClass(this.hostElement.nativeElement, 'card');
    }
    if (alignRight) {
      this.renderer.addClass(this.hostElement.nativeElement, 'align-right');
    }
    if (dashboardwidget) {
      this.renderer.addClass(this.hostElement.nativeElement, 'bq-widget');
    }
  }

  // TODO ?
  // ngOnInit() {
  //   this.determineDisplayStyle();
  // }
  //
  // bqOnUpdate() {
  //   this.determineDisplayStyle();
  // }

}
