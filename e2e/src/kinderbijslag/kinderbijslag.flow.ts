import Promise = promise.Promise;
import { browser, by, element, ElementFinder, promise } from 'protractor';

export class KinderbijslagFlow {
  public PAGE_ID_AANVRAGEN_KINDERBIJSLAG: string = 'P960';
  public PAGE_ID_VRAGENLIJST_OVER_OUDERSKIND: string = 'P501';
  public PAGE_ID_KIND_GEGEVENS: string = 'P836';
  public PAGE_ID_RESULTAAT_BEREKENING: string = 'P309';

  private path = '/flow/export-Kinderbijslag/Start';

  get pageTitleAanvragenKinderbijslag(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_AANVRAGEN_KINDERBIJSLAG + '_AanvragenKinderbijslag_1');
  }

  get pageTitleVragenlijstOverOuderskind(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_VRAGENLIJST_OVER_OUDERSKIND + '_VragenlijstOverOudersKind_1');
  }

  get pageTitleKindGegevens(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_KIND_GEGEVENS + '_Kindgegevens_1');
  }

  get pageTitleResultaatBerekening(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_RESULTAAT_BEREKENING + '_Resultaatberekening_1');
  }

  get nrOfButtons(): Promise<number> {
    return element.all(by.tagName('button')).count();
  }

  get buttonAddChild(): ElementFinder {
    return element(by.id(this.PAGE_ID_AANVRAGEN_KINDERBIJSLAG + '_Nieuw_1'));
  }

  get buttonOpslaanKind(): ElementFinder {
    return element(by.id(this.PAGE_ID_KIND_GEGEVENS + '_Opslaan_1'));
  }

  get buttonVerder(): ElementFinder {
    return element(by.id(this.PAGE_ID_VRAGENLIJST_OVER_OUDERSKIND + '_Verder_1'));
  }

  get buttonBereken(): ElementFinder {
    return element(by.id(this.PAGE_ID_AANVRAGEN_KINDERBIJSLAG + '_Bereken_1'));
  }

  get nrOfValidations(): Promise<number> {
    return element.all(by.css('mat-error')).count();
  }

  get requiredStringField(): ElementFinder {
    return element(by.id(this.PAGE_ID_AANVRAGEN_KINDERBIJSLAG + '_Verzekerde-Voornaam_1')).element(by.tagName('input'));
  }

  getInputFor(page: string, field: string): ElementFinder {
    return element(by.id(page + '_' + field + '_1')).element(by.tagName('input'));
  }

  getTextareaFor(page: string, field: string): ElementFinder {
    return element(by.id(page + '_' + field + '_1')).element(by.tagName('textarea'));
  }

  getTextFor(page: string, field: string): Promise<string> {
    return element(by.id(page + '_' + field + '_1')).getText();
  }

  getSelectFor(page: string, field: string): ElementFinder {
    return element(by.id(page + '_' + field + '_1')).element(by.tagName('mat-select'));
  }

  getTableCellFor(id: string): Promise<string> {
    return element(by.id(id)).getText();
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
