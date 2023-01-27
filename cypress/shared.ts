export const PAGE_LOGIN_TAGNAME = 'bq-login';
export const PAGE_ERROR_TAGNAME = 'mat-error';

export const PAGE_LOGIN_FIELDNAME_USERNAME = 'input[name="username"]';
export const PAGE_LOGIN_FIELDNAME_PASSWORD = 'input[name="password"]';
export const PAGE_PROJECT_TAGNAME = 'bq-project';

export const DASHBOARD_PAGE = 'bq-dashboard-page';
export const DASHBOARD_HEADER = 'bq-dashboard-header';
export const DASHBOARD_MENU = 'bq-dashboard-menu';
export const DASHBOARD_WIDGET = 'bq-flow-widget';
export const DASHBOARD_WIDGET_PROJECT = 'bq-project';

/* These tests are both executed for routes via flow and shortcut */
export function executeSharedTests() {
  it('should first render the login page with the corresponding elements', () => {
    cy.get(PAGE_LOGIN_FIELDNAME_USERNAME).should('not.have.text');
    cy.get(PAGE_LOGIN_FIELDNAME_PASSWORD).should('not.have.text');
    cy.get(PAGE_LOGIN_TAGNAME).should('exist');
    cy.get(PAGE_LOGIN_TAGNAME).find('button').should('exist');
    cy.get(PAGE_PROJECT_TAGNAME).should('not.exist');
  });

  it('should be able to login with the correct credentials and able to logout again', () => {
    cy.doLogin('Aanvrager', 'Aanvrager');

    // Logout again
    const timeout = 1000 * 15 /* seconds */;
    cy.get('button.active-user-menu', { timeout }).click();
    cy.contains('Uitloggen').click();

    // State: logged out (but not to a login page)
    cy.get(PAGE_LOGIN_TAGNAME).should('not.exist');
    cy.get(PAGE_PROJECT_TAGNAME).should('not.exist');
    cy.get('bq-notification-overlay .message').should('have.text', 'Successfully logged out');
  });
}
