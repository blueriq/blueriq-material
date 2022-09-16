import Promise = promise.Promise;
import { browser, by, element, ElementFinder, promise } from 'protractor';

export class KinderbijslagFlow {
  public PAGE_ID_OUDER_GEGEVENS: string = 'P163';
  public PAGE_ID_OVERZICHT_KINDEREN: string = 'P322';
  public PAGE_ID_VRAGENLIJST_OUDERSKIND: string = 'P713';
  public PAGE_ID_RESULTAAT_BEREKENING: string = 'P309';


  private path = '/flow/export-Kinderbijslag/Start';

  get pageTitleKinderbijslagAanvragen(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_OUDER_GEGEVENS + '_OuderGegevens_1');
  }

  get containerTitleOuderGegevens(): Promise<string> {
    return this.getContainerTitleTextFor(this.PAGE_ID_OUDER_GEGEVENS + '_OuderGegevens_2');
  }

  get pageTitleOverzichtKinderen(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_OVERZICHT_KINDEREN + '_OverzichtKinderen_1');
  }

  get containerTitleKinderen(): Promise<string> {
    return this.getContainerTitleTextFor(this.PAGE_ID_OVERZICHT_KINDEREN + '_LijstVanKinderen_1');
  }

  get pageTitleVragenlijstOuderskind(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_VRAGENLIJST_OUDERSKIND + '_VragenlijstOudersKind_1');
  }

  get containerTitleVragenOuders(): Promise<string> {
    return this.getContainerTitleTextFor(this.PAGE_ID_VRAGENLIJST_OUDERSKIND + '_SoortOudersVragen_1');
  }

  get containerTitleVragenKind(): Promise<string> {
    return this.getContainerTitleTextFor(this.PAGE_ID_VRAGENLIJST_OUDERSKIND + '_Kind_1');
  }

  get pageTitleResultaatBerekening(): Promise<string> {
    return this.getTitleTextFor(this.PAGE_ID_RESULTAAT_BEREKENING + '_Resultaatberekening_1');
  }

  get containerTitleKinderbijslag(): Promise<string> {
    return this.getContainerTitleTextFor(this.PAGE_ID_RESULTAAT_BEREKENING + '_Kinderbijslag_1');
  }

  get buttonTitleDownloadLink(): Promise<string> {
    return this.getButtonTitleTextFor(this.PAGE_ID_RESULTAAT_BEREKENING + '_DownloadLink_1');
  }

  get nrOfButtons(): Promise<number> {
    return element.all(by.tagName('button')).count();
  }

  get buttonAddChild(): ElementFinder {
    return element(by.id(this.PAGE_ID_OVERZICHT_KINDEREN + '_Toevoegen_1'));
  }

  get buttonVerder1(): ElementFinder {
    return element(by.id(this.PAGE_ID_OUDER_GEGEVENS + '_Verder_1'));
  }

  get buttonVerder2(): ElementFinder {
    return element(by.id(this.PAGE_ID_VRAGENLIJST_OUDERSKIND + '_Verder_1'));
  }

  get buttonBereken(): ElementFinder {
    return element(by.id(this.PAGE_ID_OVERZICHT_KINDEREN + '_Bereken_1'));
  }

  get nrOfValidations(): Promise<number> {
    return element.all(by.css('mat-error')).count();
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

  private getContainerTitleTextFor(id: string): Promise<string> {
    return element(by.id(id)).element(by.tagName('h2')).getText();
  }

  private getButtonTitleTextFor(id: string): Promise<string> {
    return element(by.id(id)).element(by.tagName('span')).getText();
  }

}
