describe('Kinderbijslag App', () => {

  const PAGE_ID_OUDER_GEGEVENS = 'P163';
  const PAGE_ID_OVERZICHT_KINDEREN = 'P322';
  const PAGE_ID_VRAGENLIJST_OUDERSKIND = 'P713';
  const PAGE_ID_RESULTAAT_BEREKENING = 'P309';

  beforeEach(() => {
    cy.visitRuntime('/flow/export-Kinderbijslag/Start');
  });

  it('should display a validation message when flowing to the next page', () => {
    cy.getButtonFor(PAGE_ID_OUDER_GEGEVENS, 'Verder').click();
    cy.nrOfValidations(8);
  });

  it('should successfully go through the kinderbijslag process', () => {
    // Start page should display headers with text
    cy.getTitleTextFor(PAGE_ID_OUDER_GEGEVENS, 'OuderGegevens').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
    cy.getContainerTitleTextFor(PAGE_ID_OUDER_GEGEVENS, 'OuderGegevens', '2').equalIgnoreWhiteSpace('Jouw gegevens');

    fillInRequiredFieldsOuder();
    cy.getButtonFor(PAGE_ID_OUDER_GEGEVENS, 'Verder').click();

    // should navigate to page: Overzicht Kinderen
    cy.getTitleTextFor(PAGE_ID_OVERZICHT_KINDEREN, 'OverzichtKinderen').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
    cy.getContainerTitleTextFor(PAGE_ID_OVERZICHT_KINDEREN, 'LijstVanKinderen').equalIgnoreWhiteSpace('Kinderen');
    cy.get('button').should('have.length', 7);

    // Page to add a child
    cy.getButtonFor(PAGE_ID_OVERZICHT_KINDEREN, 'Toevoegen').click();

    cy.getTitleTextFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'VragenlijstOudersKind').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
    cy.getContainerTitleTextFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'SoortOudersVragen').equalIgnoreWhiteSpace('Vragen over ouders kind');

    fillInQuestionsOuderKind();

    cy.getContainerTitleTextFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind').equalIgnoreWhiteSpace('Vragen over het kind');
    let yearOfBirth = (new Date().getFullYear() - 2);
    fillInRequiredFieldsKind(yearOfBirth);
    cy.getButtonFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Verder').click();

    // should be able to add a child
    cy.getTitleTextFor(PAGE_ID_OVERZICHT_KINDEREN, 'OverzichtKinderen').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
    cy.getContainerTitleTextFor(PAGE_ID_OVERZICHT_KINDEREN, 'LijstVanKinderen').equalIgnoreWhiteSpace('Kinderen');
    cy.getTableCellFor(PAGE_ID_OVERZICHT_KINDEREN, 'cell', '6').equalIgnoreWhiteSpace('Jack');
    cy.getTableCellFor(PAGE_ID_OVERZICHT_KINDEREN, 'cell', '7').equalIgnoreWhiteSpace('Sparrow');
    cy.getTableCellFor(PAGE_ID_OVERZICHT_KINDEREN, 'cell', '8').equalIgnoreWhiteSpace(`01-01-${yearOfBirth}`);


    cy.getButtonFor(PAGE_ID_OVERZICHT_KINDEREN, 'Bereken').click();

    // should calculate Kinderbijslag
    cy.getTitleTextFor(PAGE_ID_RESULTAAT_BEREKENING, 'Resultaatberekening').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
    cy.getContainerTitleTextFor(PAGE_ID_RESULTAAT_BEREKENING, 'Kinderbijslag').equalIgnoreWhiteSpace('Kinderbijslag');
    cy.getTableCellFor(PAGE_ID_RESULTAAT_BEREKENING, 'cell', '9').equalIgnoreWhiteSpace('€ 188,57');
    cy.getTextareaFor(PAGE_ID_RESULTAAT_BEREKENING, 'Verzekerde-Kinderbijslag').invoke('val').should('eq', '€ 188,57');
    cy.getTextareaFor(PAGE_ID_RESULTAAT_BEREKENING, 'Verzekerde-AantalKinderen').invoke('val').should('eq', '1');
    cy.getButtonFor(PAGE_ID_RESULTAAT_BEREKENING, 'DownloadLink').equalIgnoreWhiteSpace('Download hier uw formulier');
  });

  function fillInRequiredFieldsOuder() {
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Voornaam').type('Teague');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Achternaam').type('Sparrow');
    cy.getSelectFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Geslacht').selectOption('Vrouw');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Straat').type('Teststraat');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Huisnummer').type('12');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-HuisnummerToevoeging').type('a');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Postcode').type('1234AA');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Woonplaats').type('Amsterdam');
    cy.getSelectFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-Land').selectOption('Nederland');
    cy.getInputFor(PAGE_ID_OUDER_GEGEVENS, 'Verzekerde-BankGiroRekeningNummer').type('P0');
  }

  function fillInQuestionsOuderKind() {
    cy.getSelectFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-VrouwAlsMoeder').selectOption('Ja');
  }

  function fillInRequiredFieldsKind(yearOfBirth: number) {
    cy.getSelectFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-BehoortTotHuishoudenVerzekerde').selectOption('Ja');
    cy.getSelectFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-WoontInNederlandEersteDagKalenderkwartaal').selectOption('Ja');
    cy.getInputFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-Voornaam').type('Jack');
    cy.getInputFor(PAGE_ID_VRAGENLIJST_OUDERSKIND, 'Kind-Geboortedatum').type(`01-01-${yearOfBirth}`);
  }

});
