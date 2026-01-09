import { Directive, HostBinding, Input, inject } from '@angular/core';
import { Element } from '@blueriq/core';

@Directive({
    selector: '[bqKey]',
    standalone: false
})
export class BqKeyDirective {
  private readonly scopedElement = inject(Element);


  @Input() bqKey: Element | null | undefined;

  @HostBinding('attr.id')
  get id(): string {
    const element = this.bqKey || this.scopedElement;
    return element.functionalKey;
  }

}
