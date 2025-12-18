import { Directive, HostBinding, Input } from '@angular/core';
import { Element } from '@blueriq/core';

@Directive({
    selector: '[bqKey]',
    standalone: false
})
export class BqKeyDirective {

  @Input() bqKey: Element | null | undefined;

  constructor(private readonly scopedElement: Element) {
  }

  @HostBinding('attr.id')
  get id(): string {
    const element = this.bqKey || this.scopedElement;
    return element.functionalKey;
  }

}
