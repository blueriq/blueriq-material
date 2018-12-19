import { ComponentMatcher } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqIconDirective } from '../../../shared/directive/icon/icon.directive';

export class ContainerEmptyComponentMatcher implements ComponentMatcher<Container> {
  matches(element: Container): boolean {
    // Has no displayName and has no icon and has no child elements
    return !!!element.displayName && !BqIconDirective.hasIcon(element.styles) && element.children.length === 0;
  }

  get priority(): number {
    return 200;
  }

  /* This will be printed in the development console overview */
  toString() {
    return '[!displayName], !BqIconDirective.hasIcon(element.styles), children.length === 0 ';
  }
}
