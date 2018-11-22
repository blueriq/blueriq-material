import Promise = promise.Promise;
import { browser, by, element, promise } from 'protractor';

export class RoutesApp {
  public PAGE_ID_AANVRAGEN_KINDERBIJSLAG: string = 'P960';
  public PAGE_ID_DEFAULT_SHORTCUT_START: string = 'P866';

  get pageTitleAanvragenKinderbijslag(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_AANVRAGEN_KINDERBIJSLAG + '_AanvragenKinderbijslag_1');
  }

  get pageTitleDefaultShortcutFlow(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_DEFAULT_SHORTCUT_START + '_Start_1');
  }

  private getTitleTextFor(id: string): Promise<string> {
    return element(by.id(id)).element(by.tagName('h1')).getText();
  }

  retrieveSessionId(sessionName: string): Promise<string> {
    return browser.executeScript(`return window.sessionStorage.getItem("${sessionName}");`);
  }

  start(route: string) {
    return browser.get(route);
  }

  reset() {
    return browser.restart();
  }

}
