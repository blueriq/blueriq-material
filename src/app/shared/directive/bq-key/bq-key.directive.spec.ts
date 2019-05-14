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
});
