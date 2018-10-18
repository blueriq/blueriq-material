import { Container, ContainerJson, Element, ElementJson, ElementVisitor, PageModel } from '@blueriq/core';
import { ContainerComponentMatcher } from './container-component-matcher';

describe('ContainerComponentMatcher', () => {
  const fakeChildElement: Element = new class extends Element {
    accept<T>(visitor: ElementVisitor<T>, context: T): void {
    }

    patch(data: ElementJson): void {
    }

    resolve(pageModel: PageModel, data: ElementJson): void {
    }
  };
  const containerComponentMatcher = new ContainerComponentMatcher();
  let containerJson: ContainerJson;

  beforeEach(() => {
    fakeChildElement.key = 'P0-C0-B0';
    fakeChildElement.type = 'button';
    fakeChildElement.name = 'TestButton';
    containerJson = {
      key: 'P0-C0',
      functionalKey: 'P0_TestContainer_0',
      type: 'container',
      name: 'TestContainer',
      properties: [],
      contentStyle: '',
      styles: [],
      displayName: '',
      children: []
    };
  });

  it('should not match on empty container', () => {
    const container = new Container(containerJson);

    expect(containerComponentMatcher.matches(container)).toBe(false);
  });

  it('should match on container with displayName', () => {
    containerJson.displayName = 'User data';
    const container = new Container(containerJson);

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

  it('should match on container with FontAwesome icon', () => {
    containerJson.styles = ['icon_thermometer_empty'];
    const container = new Container(containerJson);

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

  it('should match on container with Material icon', () => {
    containerJson.styles = ['IconDashboard'];
    const container = new Container(containerJson);

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

  it('should match on container with children', () => {
    const container = new Container(containerJson);
    container.children = [fakeChildElement];

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

});
