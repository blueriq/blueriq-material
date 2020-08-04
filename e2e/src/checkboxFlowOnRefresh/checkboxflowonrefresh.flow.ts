import Promise = promise.Promise;
import { browser, by, element, ElementFinder, promise } from 'protractor';

export class CheckboxflowonrefreshFlow {
  public PAGE_ID_CHECKBOX_FLOW_REFRESH: string = 'P588';

  private path = '/flow/export-CheckboxFlowOnRefresh/ActiveInstance';

  get pageTitlePersonsActive(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_CHECKBOX_FLOW_REFRESH + '_PersonsActive_1');
  }

  get nrOfCheckboxes(): Promise<number> {
    return element.all(by.tagName('mat-checkbox')).count();
  }

  get nrOfTextAreas(): Promise<number> {
    return element.all(by.tagName('textarea')).count();
  }

  getCheckbox(checkboxId: number): ElementFinder {
    return this.getInputFor(this.PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-TriggerRefresh', checkboxId);
  }

  getCheckboxLabel(checkboxId: number): ElementFinder {
    return this.getInputLabelFor(this.PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-TriggerRefresh', checkboxId);
  }

  getTextForCheckbox(textId: number): Promise<string> {
    return this.getTextFor(this.PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', textId);
  }

  getInputFor(page: string, field: string, id: number): ElementFinder {
    return element(by.id(page + '_' + field + '_' + id)).element(by.tagName('input'));
  }

  getInputLabelFor(page: string, field: string, id: number): ElementFinder {
    return element(by.id(page + '_' + field + '_' + id)).element(by.tagName('label'));
  }

  getTextareaFor(page: string, field: string, id: number): ElementFinder {
    return element(by.id(page + '_' + field + '_' + id)).element(by.tagName('textarea'));
  }

  getTextFor(page: string, field: string, id: number): Promise<string> {
    return this.getTextareaFor(page, field, id).getAttribute('value');
  }

  start() {
    return browser.get(this.path);
  }

  reset() {
    return browser.restart();
  }

  private getTitleTextFor(id: string): Promise<string> {
    return element(by.id(id)).element(by.tagName('h1')).getText();
  }

}
