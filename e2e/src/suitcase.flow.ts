import { browser, by, element } from 'protractor';

export class SuitcaseFlow {

  private path = '/flow/export-Kinderbijslag/Start';

  get toolbarTitleText() {
    return element(by.id('P960_AanvragenKinderbijslag_1')).element(by.tagName('h1')).getText();
  }

  get nrOfButtons() {
    return element.all(by.tagName('button')).count();
  }

  get continueButton() {
    return element(by.buttonText('Bereken kinderbijslag'));
  }

  get nrOfValidations() {
    return element.all(by.css('mat-error')).count();
  }

  get requiredStringField() {
    return element(by.id('^Verzekerde-Voornaam_1')).element(by.tagName('input'));
  }

  start() {
    return browser.get(this.path);
  }
}
