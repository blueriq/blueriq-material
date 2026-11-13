import { Directive, HostBinding, inject, input } from '@angular/core';
import { Element } from '@blueriq/core';

@Directive({ selector: '[bqKey]' })
export class BqKeyDirective {
  private readonly scopedElement = inject(Element);


  readonly bqKey = input<Element | null | undefined>();

  @HostBinding('attr.id')
  get id(): string {
    const element = this.bqKey() || this.scopedElement;
    return element.functionalKey;
  }

}
