describe('Free Navigation', () => {
  it('should render the navigation menu correctly', () => {
    cy.visitRuntime('flow/export-FreeNavigationExample/Start');

    cy.getTitleTextFor('P355', 'Person').equalIgnoreWhiteSpace('Person');

    // first navigation item is active.
    cy.get('bq-navigation-item .circle').eq(0).should('have.class', 'active');

    // Renders the navigation menu correctly.
    cy.get('bq-navigation-menu button').should('have.length', 4);
    cy.get('bq-navigation-menu button').eq(0).equalIgnoreWhiteSpace('Person');
    cy.get('bq-navigation-menu button').eq(1).equalIgnoreWhiteSpace('Work');
    cy.get('bq-navigation-menu button').eq(2).equalIgnoreWhiteSpace('Hobbies');
    cy.get('bq-navigation-menu button').eq(3).equalIgnoreWhiteSpace('Summary');

    // Disable hobbies button. Wait for the field-refresh round-trip to finish so the assertion below
    // reflects the model-driven disabled state, not the transient disable that applies to every
    // button while a request to the backend is active.
    cy.waitForPageReady();
    cy.intercept('POST', '**/api/v2/session/*/event').as('hobbiesRefresh');
    cy.getCheckboxFor('P355', 'Person-HasHobbies').click();
    cy.wait('@hobbiesRefresh');
    cy.get('bq-navigation-menu button').eq(2).should('be.disabled');

    // Navigate to next page. Buttons are disabled while a request is in flight, so wait until the
    // button is enabled again before clicking.
    cy.getButtonFor('P355', 'Next').should('be.enabled').click();
    cy.getTitleTextFor('P129', 'Work').equalIgnoreWhiteSpace('Work');

    // Second navigation item is active, first is incomplete.
    cy.get('bq-navigation-item .circle').eq(0).should('have.class', 'error');
    cy.get('bq-navigation-item .circle').eq(1).should('have.class', 'active');

    // Fill in mandatory fields (wait for the page to settle so the input is not dropped while inert)
    cy.waitForPageReady();
    cy.getInputFor('P129', 'Work-Salary').type('10{enter}');

    // Navigate to next page (wait out any in-flight request that disables the button).
    cy.getButtonFor('P129', 'Next').should('be.enabled').click();
    cy.getTitleTextFor('P258', 'Summary').equalIgnoreWhiteSpace('Summary');

    // Fourth navigation item is active, first is incomplete, second is complete.
    cy.get('bq-navigation-item .circle').eq(0).should('have.class', 'error');
    cy.get('bq-navigation-item .circle').eq(1).within(() => {
      cy.get('mat-icon').should('have.text', 'check');
    });
    cy.get('bq-navigation-item .circle').eq(3).should('have.class', 'active');
  });

  it('should navigate with errors', () => {
    cy.visitRuntime('flow/export-FreeNavigationExample/Start');

    cy.getInputFor('P355', 'Person-Name').focus().blur();
    cy.get('#P355_Person-Name_1 mat-error').should('exist');

    cy.getButtonFor('P355', 'Next').click();
    cy.getTitleTextFor('P129', 'Work').should('have.text', 'Work');
  });

  it('should navigate correctly', () => {
    cy.visitRuntime('flow/export-FreeNavigationExample/Start');

    // We are on the first page
    cy.getTitleTextFor('P355', 'Person').equalIgnoreWhiteSpace('Person');

    // Navigate via menu to the third page.
    cy.get('bq-navigation-menu button').eq(2).click();
    cy.getTitleTextFor('P216', 'Hobbies').equalIgnoreWhiteSpace('Hobbies');

    // Navigate via menu to the second page.
    cy.get('bq-navigation-menu button').eq(1).click();
    cy.getTitleTextFor('P129', 'Work').equalIgnoreWhiteSpace('Work');

    // Navigate via previous buttons to the first page.
    cy.getButtonFor('P129', 'Previous').click();
    cy.getTitleTextFor('P216', 'Hobbies').equalIgnoreWhiteSpace('Hobbies');
    cy.getButtonFor('P216', 'Previous').click();
    cy.getTitleTextFor('P355', 'Person').equalIgnoreWhiteSpace('Person');

    // Navigate to previous does not work as there is no previous page.
    cy.getButtonFor('P355', 'Previous').click();
    cy.getTitleTextFor('P355', 'Person').equalIgnoreWhiteSpace('Person');
  });

});
