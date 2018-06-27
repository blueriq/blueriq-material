import { SuitcaseFlow } from './suitcase.flow';

describe('workspace-project App', () => {

  let flow: SuitcaseFlow = new SuitcaseFlow();
  flow.start();

  it('should display header', () => {
    expect(flow.toolbarText).toMatch(/^Blueriq Material/);
    expect(flow.toolbarText).toMatch(/Work in Progress$/);
  });

  it('should have 1 button', () => {
    expect(flow.nrOfButtons).toBe(1);
  });

  it('should display a validation message when clearing a field', () => {
    expect(flow.requiredStringField.getAttribute('value')).toEqual('It is required');
    flow.requiredStringField.sendKeys('\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b');
    expect(flow.requiredStringField.getAttribute('value')).toEqual('');
    flow.requiredStringField.sendKeys('\t');
    expect(flow.nrOfValidations).toBe(1);
  });

  it('should flow to the next page', () => {
    flow.requiredStringField.sendKeys('It is required');
    flow.requiredStringField.sendKeys('\t');
    flow.continueButton.click();
    expect(flow.nrOfButtons).toBe(6);
    expect(flow.pageTitle).toEqual('Form controls');
  });

  it('should display a validation message when flowing to the next page', () => {
    flow.continueButton.click();
    expect(flow.nrOfValidations).toBe(1);
  });
});
