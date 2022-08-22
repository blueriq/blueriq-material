import { browser, protractor } from 'protractor';
import { KinderbijslagFlow } from './kinderbijslag.flow';

fdescribe('Kinderbijslag App', () => {

  let app: KinderbijslagFlow = new KinderbijslagFlow();

  beforeEach(async () => {
    await app.reset(); // in beforeEach because taking screenshot for failing tests fails when placed in the afterEach
    await app.start();
  });

  it('should display headers with text', () => {
    expect(app.pageTitleKinderbijslagAanvragen).toBe('Kinderbijslag Aanvragen');
    expect(app.containerTitleOuderGegevens).toBe('Jouw gegevens');

  });

  it('should have 1 button', () => {
    expect(app.nrOfButtons).toBe(1);
  });

  it('should display a validation message when flowing to the next page', () => {
    app.buttonVerder1.click();
    browser.waitForAngular();

    expect(app.nrOfValidations).toBe(8);
  });

  it('should navigate to page: Overzicht Kinderen', () => {
    fillInRequiredFieldsOuder();

    // navigate to page 'overzicht kinderen'
    app.buttonVerder1.click();
    browser.waitForAngular();

    // Verify
    expect(app.pageTitleOverzichtKinderen).toBe('Kinderbijslag Aanvragen');
    expect(app.containerTitleKinderen).toBe('Kinderen');
    expect(app.nrOfButtons).toBe(7);
  });

  it('should be able to add a child', () => {
    fillInRequiredFieldsOuder();
    app.buttonVerder1.click();
    browser.waitForAngular();
    app.buttonAddChild.click();
    browser.waitForAngular();

    expect(app.pageTitleVragenlijstOuderskind).toBe('Kinderbijslag Aanvragen');
    expect(app.containerTitleVragenOuders).toBe('Vragen over ouders kind');

    fillInQuestionsOuderKind();
    browser.waitForAngular();

    expect(app.containerTitleVragenKind).toBe('Vragen over het kind');
    fillInRequiredFieldsKind();
    app.buttonVerder2.click();
    browser.waitForAngular();

    // Verify
    expect(app.pageTitleOverzichtKinderen).toBe('Kinderbijslag Aanvragen');
    expect(app.containerTitleKinderen).toBe('Kinderen');
    expect(app.getTableCellFor(app.PAGE_ID_OVERZICHT_KINDEREN + '_cell_6')).toBe('Jack');
    expect(app.getTableCellFor(app.PAGE_ID_OVERZICHT_KINDEREN + '_cell_7')).toBe('Sparrow');
    expect(app.getTableCellFor(app.PAGE_ID_OVERZICHT_KINDEREN + '_cell_8')).toBe('01-01-2018');
  });

  it('should calculate Kinderbijslag', () => {
    fillInRequiredFieldsOuder();
    app.buttonVerder1.click();
    browser.waitForAngular();
    app.buttonAddChild.click();
    browser.waitForAngular();

    fillInQuestionsOuderKind();
    browser.waitForAngular();

    fillInRequiredFieldsKind();
    app.buttonVerder2.click();
    browser.waitForAngular();

    app.buttonBereken.click();
    browser.waitForAngular();


    // Verify
    expect(app.pageTitleResultaatBerekening).toBe('Kinderbijslag Aanvragen');
    expect(app.containerTitleKinderbijslag).toBe('Kinderbijslag');
    expect(app.getTableCellFor(app.PAGE_ID_RESULTAAT_BEREKENING + '_cell_9')).toBe('€ 188,57');
    expect(app.getTextareaFor(app.PAGE_ID_RESULTAAT_BEREKENING, 'Verzekerde-Kinderbijslag').getAttribute('value')).toBe('€ 188,57');
    expect(app.getTextareaFor(app.PAGE_ID_RESULTAAT_BEREKENING, 'Verzekerde-AantalKinderen').getAttribute('value')).toBe('1');
    expect(app.buttonTitleDownloadLink).toBe('DOWNLOAD HIER UW FORMULIER');

  });

  function fillInRequiredFieldsOuder() {
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Voornaam').sendKeys('Teague' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Achternaam').sendKeys('Sparrow' + protractor.Key.TAB);
    app.getSelectFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Geslacht').sendKeys('V');
    app.getSelectFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Geslacht').sendKeys(protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Straat').sendKeys('Teststraat' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Huisnummer').sendKeys('12' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-HuisnummerToevoeging').sendKeys('a' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Postcode').sendKeys('1234AA' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Woonplaats').sendKeys('Amsterdam' + protractor.Key.TAB);
    app.getSelectFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Land').sendKeys('n');
    app.getSelectFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Land').sendKeys(protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-BankGiroRekeningNummer').sendKeys('P0' + protractor.Key.TAB);
  }

  function fillInQuestionsOuderKind() {
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-VrouwAlsMoeder').sendKeys('J');
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-VrouwAlsMoeder').sendKeys(protractor.Key.TAB);
  }

  function fillInRequiredFieldsKind() {
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-BehoortTotHuishoudenVerzekerde').sendKeys('J');
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-BehoortTotHuishoudenVerzekerde').sendKeys(protractor.Key.TAB);
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-WoontInNederlandEersteDagKalenderkwartaal').sendKeys('J');
    app.getSelectFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-WoontInNederlandEersteDagKalenderkwartaal').sendKeys(protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-Voornaam').sendKeys('Jack' + protractor.Key.TAB);
    app.getInputFor(app.PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-Geboortedatum').sendKeys('01-01-2018' + protractor.Key.TAB);
  }

});
