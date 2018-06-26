import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display header', () => {
    page.navigateTo;
    expect(page.paragraphText).toMatch(/^Blueriq Material/);
    expect(page.paragraphText).toMatch(/Work in Progress$/);
  });

  it('should have 6 buttons', () => {
    page.navigateTo;
    expect(page.nrOfButtons).toBe(6);
  });

  it('should display a validation message on flowing to the next page', () => {
    page.navigateTo;
    page.continueButton.click();
    expect(page.nrOfValidations).toBe(1);
  });
});
