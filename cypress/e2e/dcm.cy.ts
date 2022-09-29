describe('DCM App', () => {

  const PAGE_LOGIN_TAGNAME = 'bq-login';
  const PAGE_LOGIN_FIELDNAME_USERNAME = 'input[name="username"]';
  const PAGE_LOGIN_FIELDNAME_PASSWORD = 'input[name="password"]';
  const PAGE_ERROR_TAGNAME = 'mat-error';
  const PAGE_PROJECT_TAGNAME = 'bq-project';

  describe('default', () => {
    beforeEach(() => {
      cy.visitRuntime('/flow/export-Main_Dashboard/Dashboard', { loginRequired: true });
    });

    it('should not login and display an error when no credentials are set', () => {
      cy.get(PAGE_LOGIN_TAGNAME).should('exist');
      cy.get(PAGE_ERROR_TAGNAME).should('not.exist');

      cy.get(PAGE_LOGIN_TAGNAME).find('button').click();

      cy.get(PAGE_LOGIN_TAGNAME).should('exist');
      cy.get(PAGE_ERROR_TAGNAME).should('have.text', 'Authentication failed');
    });

    executeSharedTests();
  });

  describe('by shortcut', () => {
    beforeEach(() => {
      cy.visitRuntime('/shortcut/DCM', {loginRequired: true});
    });

    executeSharedTests();
  });

  /* These tests are both executed for routes via flow and shortcut */
  function executeSharedTests() {
    it('should first render the login page with the corresponding elements', () => {
      cy.get(PAGE_LOGIN_FIELDNAME_USERNAME).should('not.have.text');
      cy.get(PAGE_LOGIN_FIELDNAME_PASSWORD).should('not.have.text');
      cy.get(PAGE_LOGIN_TAGNAME).should('exist');
      cy.get(PAGE_LOGIN_TAGNAME).find('button').should('exist');
      cy.get(PAGE_PROJECT_TAGNAME).should('not.exist');
    });

    it('should be able to login with the correct credentials and able to logout again', () => {
      cy.get(PAGE_LOGIN_FIELDNAME_USERNAME).type('Aanvrager');
      cy.get(PAGE_LOGIN_FIELDNAME_PASSWORD).type('Aanvrager');
      cy.get(PAGE_LOGIN_TAGNAME).find('button').click();

      // The loginpage is not expected anymore after entering the correct credentials
      cy.get(PAGE_LOGIN_TAGNAME).should('not.exist');
      cy.get(PAGE_PROJECT_TAGNAME).should('exist');

      // Logout again
      const timeout = 1000 * 15 /* seconds */;
      cy.get('button.active-user-menu', {timeout}).click();
      cy.contains('Uitloggen').click();

      // State: logged out (but not to a login page)
      cy.get(PAGE_LOGIN_TAGNAME).should('not.exist');
      cy.get(PAGE_PROJECT_TAGNAME).should('not.exist');
      cy.get('bq-notification-overlay .message').should('have.text', 'Successfully logged out');
    });
  }

});
