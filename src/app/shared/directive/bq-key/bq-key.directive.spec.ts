import { ButtonTemplate } from '@blueriq/core/testing';
import { BqKeyDirective } from '@shared/directive/bq-key/bq-key.directive';

describe('BqKeyDirective', () => {
  let bqKeyDirective: BqKeyDirective;

  beforeEach(() => {
    const element = ButtonTemplate.create('MyButton').build();
    bqKeyDirective = new BqKeyDirective(element);
  });

  it('should create an instance', () => {
    expect(bqKeyDirective).toBeTruthy();
  });

  it('should get correct id', () => {
    expect(bqKeyDirective.id).toContain('MyButton');
  });

  it('should override element used for id creation', () => {
    bqKeyDirective.bqKey = ButtonTemplate.create('MyButton1').build();

    expect(bqKeyDirective.id).toContain('MyButton1');
  });

  it('should not override element used for id creation if element is undefined', () => {
    bqKeyDirective.bqKey = undefined;

    expect(bqKeyDirective.id).toContain('MyButton');
  });

  it('should not override element used for id creation if element is null', () => {
    bqKeyDirective.bqKey = null;

    expect(bqKeyDirective.id).toContain('MyButton');
  });
});
