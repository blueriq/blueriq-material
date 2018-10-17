import { ComponentMatcher } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqIconDirective } from '@shared/directive/icon/icon.directive';

export class ContainerComponentMatcher implements ComponentMatcher<Container> {
  matches(element: Container): boolean {
    // Has displayName or has an icon or has any child elements
    return (element.displayName ? true : false) || BqIconDirective.hasIcon(element.styles) || element.children.length > 0;
  }
}
