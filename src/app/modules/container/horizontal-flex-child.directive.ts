import { Directive, DoCheck, Input, Renderer2 } from '@angular/core';
import { getAngularComponent } from '@blueriq/angular';
import { Container, Element } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';

/**
 * This directive can be added to a container to add a flex-grow style to it, based on the container's content style.
 * It is meant for dashboard columns only!
 */
@Directive({
  selector: '[bqFlexChild]'
})
export class HorizontalFlexChildDirective implements DoCheck {

  private static REGEXP_PS = new RegExp('^' + BqPresentationStyles.WEIGHT_PREFIX + '(\\d+)$');
  private static REGEXP_CS = new RegExp('^' + BqContentStyles.DASHBOARD_COLUMN_PREFIX + '(\\d+)$');

  @Input()
  bqElement: Element;

  constructor(private renderer: Renderer2) {
  }

  ngDoCheck(): void {
    if (this.bqElement instanceof Container) {
      let matches: RegExpMatchArray | null;
      const presentationStyle = this.bqElement.styles
      .get(style => style.startsWith(BqPresentationStyles.WEIGHT_PREFIX));
      if (presentationStyle) {
        matches = presentationStyle.match(HorizontalFlexChildDirective.REGEXP_PS);
        if (matches) {
          this.decorateHostElement(+matches[1]);
          return;
        }
      }

      // (legacy) content styles
      if (this.bqElement.contentStyle) {
        matches = this.bqElement.contentStyle.match(HorizontalFlexChildDirective.REGEXP_CS);
        if (matches) {
          this.decorateHostElement(+matches[1]);
          return;
        }
      }
    }
  }

  private decorateHostElement(flexGrow: number) {
    // retrieve the host element from from the angular component
    const component = getAngularComponent(this.bqElement);
    if (component) {
      this.renderer.addClass(component.location.nativeElement, 'column-wrapper');
      this.renderer.setStyle(component.location.nativeElement, 'flex-grow', flexGrow);
    }
  }
}
