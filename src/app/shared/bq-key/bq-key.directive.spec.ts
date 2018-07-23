import { Element } from '@blueriq/core';
import { ElementJson } from '@blueriq/core/src/elements/types';
import { ElementVisitor } from '@blueriq/core/src/elements/visitor';
import { BqKeyDirective } from '@shared/bq-key/bq-key.directive';

class MockElement extends Element {
  accept<T>(visitor: ElementVisitor<T>, context: T): void {
  }

  patch(element: ElementJson): void {
  }
}

describe('BqKeyDirective', () => {
  let bqKeyDirective: BqKeyDirective;
  let element: Element;

  beforeEach(() => {
    element = new MockElement();
    element.functionalKey = 'very_functional';
    bqKeyDirective = new BqKeyDirective(element);
  });

  it('should create an instance', () => {
    expect(bqKeyDirective).toBeTruthy();
  });

  it('should get correct id', () => {

    expect(bqKeyDirective.id).toBe('very_functional');
  });
});
