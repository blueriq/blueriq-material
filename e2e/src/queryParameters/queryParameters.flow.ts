import Promise = promise.Promise;
import { browser, by, element, promise, ProtractorBrowser } from 'protractor';

export class QueryParametersFlow {
  public PAGE_ID: string = 'P308';
  public PATH: string = '/shortcut/QueryParameters?test=Blueriq';

  getTestParameterValue(): Promise<string> {
    return element(by.id(this.PAGE_ID + '_QueryParameters-TestParameter_1')) //
    .element(by.tagName('textarea')) //
    .getAttribute('value');
  }

  start(): Promise<any> {
    return browser.get(this.PATH);
  }

  reset(): Promise<ProtractorBrowser> {
    return browser.restart();
  }
}
