import { browser, by, element } from 'protractor';

export class AppPage {

  get navigateTo() {
    return browser.get('/shortcut/default');
  }

  get paragraphText() {
    return element(by.css('bq-app-root mat-toolbar')).getText();
  }

  get nrOfButtons() {
    return element.all(by.tagName('button')).count();
  }

  get continueButton() {
    return element(by.buttonText('Continue'));
  }

  get nrOfValidations() {
    return element.all(by.css('mat-error')).count();
  }
}
