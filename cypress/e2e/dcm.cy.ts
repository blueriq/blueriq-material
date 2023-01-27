import { executeSharedTests } from '../shared';
import { PAGE_ERROR_TAGNAME, PAGE_LOGIN_TAGNAME } from '../shared';

describe('DCM App', () => {

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
      cy.visitRuntime('/shortcut/DCM', { loginRequired: true });
    });

    executeSharedTests();
  });

});
