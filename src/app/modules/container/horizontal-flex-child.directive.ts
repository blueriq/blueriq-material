import { Directive, DoCheck, Input, Renderer2 } from '@angular/core';
import { getAngularComponent } from '@blueriq/angular';
import { Container, Element } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

/**
 * This directive can be added to a container to add a flex-grow style to it, based on the container's content style.
 * It is meant for dashboard columns only!
 */
@Directive({
  selector: '[bqFlexChild]'
})
export class HorizontalFlexChildDirective implements DoCheck {

  private static REGEXP = new RegExp('^' + BqContentStyles.DASHBOARD_COLUMN_PREFIX + '(\\d+)$');

  @Input()
  bqElement: Element;

  constructor(private renderer: Renderer2) {
  }

  ngDoCheck(): void {
    if (this.bqElement instanceof Container && this.bqElement.contentStyle) {

      // (legacy) content styles
      const matches = this.bqElement.contentStyle.match(HorizontalFlexChildDirective.REGEXP);
      if (matches) {

        // retrieve the host element from from the angular component
        const component = getAngularComponent(this.bqElement);
        if (component) {
          this.renderer.addClass(component.location.nativeElement, 'column-wrapper');
          this.renderer.setStyle(component.location.nativeElement, 'flex-grow', +matches[1]);
        }
      }
    }
  }
}
