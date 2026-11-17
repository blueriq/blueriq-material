import { Directive, inject, input } from '@angular/core';
import { Element } from '@blueriq/core';

@Directive({
  selector: '[bqKey]',
  host: { '[attr.id]': 'id' },
})
export class BqKeyDirective {
  private readonly scopedElement = inject(Element);


  readonly bqKey = input<Element | null | undefined>();

  get id(): string {
    const element = this.bqKey() || this.scopedElement;
    return element.functionalKey;
  }

}
