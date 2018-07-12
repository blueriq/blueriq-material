import { browser, by, element } from 'protractor';

export class SuitcaseFlow {

  private path = '/flow/export-Kinderbijslag/Start';

  get toolbarText() {
    return element(by.css('bq-app-root mat-toolbar')).getText();
  }

  get pageTitle() {
    return element(by.css('.page h1')).getText();
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
    return element(by.id('P960_Verzekerde-Voornaam_1')).element(by.tagName('input'));
  }

  start() {
    return browser.get(this.path);
  }
}
