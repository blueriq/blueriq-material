import { Directive, HostBinding } from '@angular/core';
import { Element } from '@blueriq/core';

@Directive({
  selector: '[bqKey]',
})
export class BqKeyDirective {

  constructor(private readonly scopedElement: Element) {
  }

  @HostBinding('attr.id')
  get id(): string {
    return this.scopedElement.functionalKey;
  }

}
