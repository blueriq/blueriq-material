describe('Blueriq ProjectComponent Routes', () => {

  const PAGE_ID_AANVRAGEN_KINDERBIJSLAG = 'P163';
  const startDefaultShortcutPath = '/';
  const startFlowPath = '/flow/export-Kinderbijslag/Start';
  const startFlowVersionPath = '/flow/export-Kinderbijslag/Start/0.0-Trunk';
  const startFlowVersionLanguagePath = '/flow/export-Kinderbijslag/Start/0.0-Trunk/en-GB';
  const startShortcutPath = '/shortcut/kinderbijslag';

  it('should start flow Kinderbijslag.Start',  () => {
    cy.visitRuntime(startFlowPath);

    // Verify
    cy.getTitleTextFor(PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'OuderGegevens').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
  });


  it('should start flow Kinderbijslag.Start with version',  () => {
    cy.visitRuntime(startFlowVersionPath);

    // Verify
    cy.getTitleTextFor(PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'OuderGegevens').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
  });

  it('should start flow Kinderbijslag.Start with version and language',  () => {
    cy.visitRuntime(startFlowVersionLanguagePath);

    // Verify
    cy.getTitleTextFor(PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'OuderGegevens').equalIgnoreWhiteSpace(''); // because there is no title defined in this language
  });

  it('should start Kinderbijslag shortcut',  () => {
    cy.visitRuntime(startShortcutPath);

    // Verify
    cy.getTitleTextFor(PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'OuderGegevens').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
  });

  it('should start default shortcut',  () => {
    cy.visitRuntime(startDefaultShortcutPath);

    // Verify
    cy.getTitleTextFor(PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'OuderGegevens').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
  });

  it('should start app for sessionId',  () => {
    cy.visitRuntime(startDefaultShortcutPath);
    const sessionName = 'blueriq-session-default-Main';
    cy.wait(1000);
    cy.window().then(win=> {
      const sessionId = win.sessionStorage.getItem(sessionName);
      cy.wrap(sessionId).should('exist');
      cy.visit(`/sessionId/${sessionId}`, {timeout: 1000 * 15});

      // Verify
      cy.getTitleTextFor(PAGE_ID_AANVRAGEN_KINDERBIJSLAG, 'OuderGegevens').equalIgnoreWhiteSpace('Kinderbijslag Aanvragen');
    });
  });

});
