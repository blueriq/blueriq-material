import Promise = promise.Promise;
import { browser, by, element, ElementFinder, promise } from 'protractor';

export class DcmFlow {
  public PAGE_LOGIN_TAGNAME: string = 'bq-login';
  public PAGE_LOGIN_FIELDNAME_USERNAME: string = 'username';
  public PAGE_LOGIN_FIELDNAME_PASSWORD: string = 'password';
  public PAGE_ERROR_TAGNAME: string = 'mat-error';

  public PAGE_PROJECT_TAGNAME: string = 'bq-project';

  private path = '/flow/studio-DCM_Foundation-Main_Dashboard/Dashboard';
  private shortcut = '/shortcut/DCM';

  get loginPage(): ElementFinder {
    return element(by.tagName(this.PAGE_LOGIN_TAGNAME));
  }

  get projectPage(): ElementFinder {
    return element(by.tagName(this.PAGE_PROJECT_TAGNAME));
  }

  get nrOfButtons(): Promise<number> {
    return element.all(by.tagName('button')).count();
  }

  get buttonLogin(): ElementFinder {
    return this.loginPage.element(by.tagName('button'));
  }

  get usernameInput(): ElementFinder {
    return element(by.name(this.PAGE_LOGIN_FIELDNAME_USERNAME));
  }

  get passwordInput(): ElementFinder {
    return element(by.name(this.PAGE_LOGIN_FIELDNAME_PASSWORD));
  }

  get loginPageErrors() {
    return this.loginPage.element(by.tagName(this.PAGE_ERROR_TAGNAME));
  }

  get buttonLogout(): ElementFinder {
    const userMenu = this.projectPage.element(by.className('active-user-menu'));
    userMenu.click();
    browser.waitForAngular();
    return element(by.buttonText('Uitloggen'));
  }

  start() {
    return browser.get(this.path);
  }

  startByShortcut() {
    return browser.get(this.shortcut);
  }

  reset() {
    return browser.restart();
  }

}
