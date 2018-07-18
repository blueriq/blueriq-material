import { SuitcaseFlow } from './suitcase.flow';

describe('workspace-project App', () => {

  let flow: SuitcaseFlow = new SuitcaseFlow();
  flow.start();

  it('should display header with text', () => {
    expect(flow.toolbarTitleText).toBe('Aanvragen kinderbijslag');
  });

  it('should have 2 buttons', () => {
    expect(flow.nrOfButtons).toBe(2);
  });

  it('should display a validation message when flowing to the next page', () => {
    flow.continueButton.click();
    expect(flow.nrOfValidations).toBe(8);
  });
});
