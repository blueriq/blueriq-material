import { Directive, DoCheck, ElementRef, Input } from '@angular/core';
import { Container, Element } from '@blueriq/core';

/**
 * This directive can be added to a container to add a flex-grow style to it, based on the container's content style.
 * It is meant for dashboard columns only!
 */
@Directive({
  selector: '[bqFlexChild]'
})
export class HorizontalFlexChildDirective implements DoCheck {

  @Input()
  bqElement: Element;

  constructor(private elementRef: ElementRef) {
  }

  ngDoCheck(): void {
    if (this.bqElement instanceof Container) {

      // legacy content styles
      const matches = this.bqElement.contentStyle!.match(/^dashboard_column(\d+)$/);
      if (matches && matches[1]) {
        // this.elementRef refers to a comment, whose next sibling is supposed to be the <ng-component> tag that
        // will be the flex item for the dashboard
        this.elementRef.nativeElement.nextSibling.style.flexGrow = +matches[1];
        this.elementRef.nativeElement.nextSibling.style.width = 0;
      }
    }
  }
}
