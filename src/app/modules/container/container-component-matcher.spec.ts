import { ContainerTemplate } from '@blueriq/core/testing';
import { ContainerComponentMatcher } from './container-component-matcher';

describe('ContainerComponentMatcher', () => {

  const containerComponentMatcher = new ContainerComponentMatcher();

  it('should not match on empty container', () => {
    const container = ContainerTemplate.create().build();

    expect(containerComponentMatcher.matches(container)).toBe(false);
  });

  it('should match on container with displayName', () => {
    const container = ContainerTemplate.create().displayName('Some title').build();

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

  it('should match on container with FontAwesome icon', () => {
    const container = ContainerTemplate.create().styles('icon_thermometer_empty').build();

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

  it('should match on container with Material icon', () => {
    const container = ContainerTemplate.create().styles('IconDashboard').build();

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

  it('should not match on container without icon', () => {
    const container = ContainerTemplate.create().styles('Horizontal').build();

    expect(containerComponentMatcher.matches(container)).toBe(false);
  });

  it('should match on container with children', () => {
    const container = ContainerTemplate.create().children(ContainerTemplate.create()).build();

    expect(containerComponentMatcher.matches(container)).toBe(true);
  });

});
