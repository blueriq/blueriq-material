import {
  DASHBOARD_HEADER,
  DASHBOARD_MENU,
  DASHBOARD_PAGE,
  DASHBOARD_WIDGET,
  DASHBOARD_WIDGET_PROJECT,
} from '../shared';

describe('Dashboards App', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  afterEach(() => {
    // visit a blank page to ensure the test context is fresh without any previous test requests bleeding
    // in the next test.
    cy.window().then((win) => {
      win.location.href = 'about:blank';
    });
  });

  describe('authentication flow', () => {
    it('should be able to login', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');
    });

    it('should be able to logout', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');
      cy.doGatewayLogout();
      cy.get('a[href*="oauth2/authorization/keycloak"]').should('be.visible');
    });

    it('should be able to login with multiple users', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');
      cy.doGatewayLogout();
      cy.doGatewayLogin('Aanvrager', 'Aanvrager');
    });

    it('should display the full name of the user', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('johndoe', 'johndoe');

      cy.get(DASHBOARD_HEADER).within(() => {
        cy.get('.username').contains('span', 'John Doe');
      });
    });
  });

  describe('by routes and authorization', () => {
    it('should display dcm dashboard main page as Behandelaar', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.get(DASHBOARD_HEADER).within(() => {
        cy.get(DASHBOARD_MENU).contains('button', 'Behandelaar only');
      });

      cy.get(DASHBOARD_PAGE).within(() => {
        cy.get(DASHBOARD_WIDGET).should('have.length', 2);

        cy.get(DASHBOARD_WIDGET + '[id="niet-toegekende-zaken"]').should('exist').within(() => {
          cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
        });

        cy.get(DASHBOARD_WIDGET + '[id="zaken-per-behandelaar"]').should('exist').within(() => {
          cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
        });
      });
    });

    it('should display dcm dashboard main page as Aanvrager', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.get(DASHBOARD_HEADER).within(() => {
        cy.get(DASHBOARD_MENU).contains('button', 'Behandelaar only').should('not.exist');
      });

      cy.get(DASHBOARD_PAGE).within(() => {
        cy.get(DASHBOARD_WIDGET).should('have.length', 1);

        cy.get(DASHBOARD_WIDGET + '[id="niet-toegekende-zaken"]').should('exist').within(() => {
          cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
        });
      });

      cy.get(DASHBOARD_WIDGET + '[id="zaken-per-behandelaar"]').should('not.exist');
    });

    it('should display login page after logout while on restricted route', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.doGatewayLogout();

      // Should be back on login page because the return path from logout page is restricted
      cy.url().should('include', '/auth/login');
    });
  });

  describe('case actions', () => {
    it('should start a case', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.startCaseTypeA('start-case');
    });

    it('should display open case', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.startCaseTypeA('open-case');

      cy.openCase('open-case');
    });

    it('should display an involved case with additional parameters', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.startCaseTypeA('open-case-parameters');

      cy.involveCase('open-case-parameters');
    });

    it('should refresh the dashboard widgets', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      const reference = 'refreshable-case-filtering';
      cy.startCaseTypeA(reference);

      // set filter to have no values in table
      cy.intercept('POST', '/runtime/*/api/v2/session/*/event').as('events');
      cy.get(DASHBOARD_WIDGET + '[id="niet-toegekende-zaken"]').within(() => {
        cy.get(`bq-filter button`).click();
        cy.root().parentsUntil('html').last().within(() => {
          cy.get('mat-dialog-container mat-form-field mat-select').selectOption('Aanvraaggegevens');
          cy.get('mat-dialog-container button.mat-primary').click();
        });
      });
      cy.wait('@events').its('response.statusCode').should('equal', 200);
      cy.get(DASHBOARD_WIDGET + '[id="niet-toegekende-zaken"] bq-table tbody').children().should('have.length', 0);

      // reload page
      cy.get('button[id="dashboard-refresh"]').click();

      // verify that filter is reset
      cy.get(DASHBOARD_WIDGET + '[id="niet-toegekende-zaken"] bq-table tbody').children().should('have.length.above', 0);
    });

  });

  describe('task actions', () => {
    it('should be able to successfully complete a task', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      const reference = 'start-task-completed';
      cy.startCaseTypeA(reference);

      cy.openCase(reference);

      cy.get(DASHBOARD_WIDGET + '[id="open-case-tasks"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });

      // Start Task
      cy.getButtonFor('P374', 'Start').click();
      // Finish Task
      cy.getButtonFor('P463', 'Ok').click();

      // Verify we are back in the case
      cy.verifyOpenCasePage();

      // New task should be available
      cy.get(DASHBOARD_WIDGET + '[id="open-case-tasks"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });
    });

    it('should be able to successfully cancel a task', () => {
      cy.startDashboard('/dashboard/e2e', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      const reference = 'start-task-canceled';
      cy.startCaseTypeA(reference);

      cy.openCase(reference);

      cy.get(DASHBOARD_WIDGET + '[id="open-case-tasks"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });

      // Start Task
      cy.getButtonFor('P374', 'Start').click();

      // Cancel Task
      cy.getButtonFor('P463', 'Cancel').click();

      // Verify we are back in the case
      cy.verifyOpenCasePage();

      // Verify the task is still in the list
      cy.get(DASHBOARD_WIDGET + '[id="open-case-tasks"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });
    });
  });
});