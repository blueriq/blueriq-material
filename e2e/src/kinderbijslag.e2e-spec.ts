import { protractor } from 'protractor';
import { KinderbijslagFlow } from './kinderbijslag.flow';

describe('Kinderbijslag App', () => {

  let app: KinderbijslagFlow = new KinderbijslagFlow();

  beforeEach(() => {
    app.reset(); // in beforeEach because taking screenshot for failing tests fails when placed in the afterEach
    app.start();
  });

  it('should display header with text', () => {
    expect(app.pageTitleAanvragenKinderbijslag).toBe('Aanvragen kinderbijslag');
  });

  it('should have 3 buttons', () => {
    expect(app.nrOfButtons).toBe(3);
  });

  it('should display a validation message when flowing to the next page', () => {
    app.buttonBereken.click();
    expect(app.nrOfValidations).toBe(8);
  });

  it('should navigate to page: Kind toevoegen', () => {
    fillInRequiredFieldsVerzekerde();

    // navigate to page 'kind toevoegen'
    app.buttonAddChild.click();

    // Verify
    expect(app.pageTitleVragenlijstOverOuderskind).toBe('Vragen over het kind');
  });

  it('should be able to add a child', () => {
    fillInRequiredFieldsVerzekerde();
    app.buttonAddChild.click();

    fillInQuestionsOuderKind();
    app.buttonVerder.click();
    expect(app.pageTitleKindGegevens).toBe('Gegevens kind');

    fillInRequiredFieldsKind();
    app.buttonOpslaanKind.click();

    // Verify
    expect(app.pageTitleAanvragenKinderbijslag).toBe('Aanvragen kinderbijslag');

    expect(app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Kind-Voornaam').getAttribute('value')).toBe('Jack');
    expect(app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Kind-Achternaam').getAttribute('value')).toBe('Sparrow');
    expect(app.getTableCellFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG + '_cell_3')).toBe('01-01-2018');
  });

  it('should calculate Kinderbijslag', () => {
    fillInRequiredFieldsVerzekerde();
    app.buttonAddChild.click();
    fillInQuestionsOuderKind();
    app.buttonVerder.click();
    fillInRequiredFieldsKind();
    app.buttonOpslaanKind.click();

    app.buttonBereken.click();

    // Verify
    expect(app.pageTitleResultaatBerekening).toBe('Resultaat berekening');
    expect(app.getTableCellFor(app.PAGE_ID_RESULTAAT_BEREKENING + '_cell_4')).toBe('euro_symbol');
    expect(app.getInputFor(app.PAGE_ID_RESULTAAT_BEREKENING, 'Kind-BedragKinderbijslag').getAttribute('value')).toBe('188,57');
    expect(app.getTextareaFor(app.PAGE_ID_RESULTAAT_BEREKENING, 'Verzekerde-Kinderbijslag').getAttribute('value')).toBe('€ 188,57');
    expect(app.getTextareaFor(app.PAGE_ID_RESULTAAT_BEREKENING, 'Verzekerde-AantalKinderen').getAttribute('value')).toBe('1');
  });

  function fillInRequiredFieldsVerzekerde() {
    app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Voornaam').sendKeys('Teague' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Achternaam').sendKeys('Sparrow' + protractor.Key.TAB);
    app.getSelectFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Geslacht').sendKeys('V');
    app.getSelectFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Geslacht').sendKeys(protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Adres').sendKeys('Teststraat' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Postcode').sendKeys('1234AA' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Woonplaats').sendKeys('Amsterdam' + protractor.Key.TAB);
    app.getSelectFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Land').sendKeys('n');
    app.getSelectFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-Land').sendKeys(protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'Verzekerde-BankGiroRekeningNummer').sendKeys('P0' + protractor.Key.TAB);
  }

  function fillInQuestionsOuderKind() {
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OVER_OUDERSKIND, 'Kind-VrouwAlsMoeder').sendKeys('J');
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OVER_OUDERSKIND, 'Kind-VrouwAlsMoeder').sendKeys(protractor.Key.TAB);
  }

  function fillInRequiredFieldsKind() {
    app.getSelectFor(app.PAGE_ID_KIND_GEGEVENS, 'Kind-BehoortTotHuishoudenVerzekerde').sendKeys('J');
    app.getSelectFor(app.PAGE_ID_KIND_GEGEVENS, 'Kind-BehoortTotHuishoudenVerzekerde').sendKeys(protractor.Key.TAB);
    app.getSelectFor(app.PAGE_ID_KIND_GEGEVENS, 'Kind-WoontInNederlandEersteDagKalenderkwartaal').sendKeys('J');
    app.getSelectFor(app.PAGE_ID_KIND_GEGEVENS, 'Kind-WoontInNederlandEersteDagKalenderkwartaal').sendKeys(protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_KIND_GEGEVENS, 'Kind-Voornaam').sendKeys('Jack' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_KIND_GEGEVENS, 'Kind-Geboortedatum').sendKeys('01-01-2018' + protractor.Key.TAB);
  }

});
