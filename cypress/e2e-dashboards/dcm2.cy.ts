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
    it('should be able to login when starting a separate flow with JWT authentication enabled', () => {
      cy.visitRuntime('/shortcut/ZaakIntake', { loginRequired: true });

      cy.get('#username').type('Behandelaar');
      cy.get('#password').type('Behandelaar');
      cy.get('#kc-login').click();

      cy.get('h2').contains('Zaak intake').should('exist');
    });

    it('should be able to login via the gateway', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');
    });

    it('should be able to logout via the gateway', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');
      cy.doGatewayLogout();
      cy.get('#kc-login').should('be.visible');
    });

    it('should be able to login with multiple users', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');
      cy.doGatewayLogout();
      cy.doGatewayLogin('Aanvrager', 'Aanvrager');
    });

    it('should display the full name of the user', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('johndoe', 'johndoe');

      cy.get(DASHBOARD_HEADER).within(() => {
        cy.get('.username').contains('span', 'John Doe');
      });
    });
  });

  describe('by routes and authorization', () => {
    it('should display dcm dashboard main page as Behandelaar', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.get(DASHBOARD_HEADER).within(() => {
        cy.get(DASHBOARD_MENU).contains('button', 'Business Activity Monitor');
      });

      cy.get(DASHBOARD_PAGE).within(() => {
        cy.get(DASHBOARD_WIDGET).should('have.length', 2);

        cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakentoegewezen-1"]').should('exist').within(() => {
          cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
        });

        cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakentoegewezen-1"]').should('exist').within(() => {
          cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
        });
      });
    });

    it('Should display an error when the dashboard service response with an HTTP 404 response', () => {
      const dashboardUrl = '/dashboard/export-foundation/Trunk/foundation/maindashboard';
      cy.startDashboard(dashboardUrl, { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.intercept({ method: 'get', url: '/dcm-dashboard/**' }).as('getDashboard');

      cy.visit(dashboardUrl, {
        onBeforeLoad: (win) => {
          win.sessionStorage.clear();
        },
      });

      cy.wait('@getDashboard').its('response.statusCode').should('equal', 404);

      cy.get('bq-notification-overlay').within(() => {
        cy.get('.message').should('have.text', 'Unable to open page');
        cy.get('.notification-error').should('exist');
      });
    });

    it('Should display an error when the dashboard service responds with an HTTP 400 response', () => {
      const dashboardUrl = '/dashboard/foundation/V7_3_0/foundation/maindashboard';
      cy.startDashboard(dashboardUrl, { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.intercept({ method: 'get', url: '/dcm-dashboard/**' }).as('getDashboard');

      cy.visit(dashboardUrl, {
        onBeforeLoad: (win) => {
          win.sessionStorage.clear();
        },
      });

      cy.wait('@getDashboard').its('response.statusCode').should('equal', 400);

      cy.get('bq-notification-overlay').within(() => {
        cy.get('.title').should('have.text', 'Unexpected error');
        cy.get('.notification-error').should('exist');
      });
    });

    it('should display dcm dashboard main page as Aanvrager', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.get(DASHBOARD_HEADER).within(() => {
        cy.get(DASHBOARD_MENU).contains('button', 'Business Activity Monitor').should('not.exist');
      });

      cy.get(DASHBOARD_PAGE).within(() => {
        cy.get(DASHBOARD_WIDGET).should('have.length', 1);

        cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakentoegewezen-1"]').should('exist').within(() => {
          cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
        });
      });

      cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakenniettoegewezen-1"]').should('not.exist');
    });

    it('should display login page after logout while on restricted route', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.doGatewayLogout();

      // Should be back on login page because the return path from logout page is restricted
      cy.get('#kc-login').should('be.visible');
    });
  });

  describe('case actions', () => {
    it('should start a case', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.startCaseTypeA('start-case');
    });

    it('should start a case for a shortcut', () => {
      cy.startDashboard('/dashboard/shortcut/foundation', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.startCaseTypeA('start-case');
    });

    it('should display open case', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      const reference = 'open-case';
      cy.startCaseTypeA(reference);

      cy.get(`@${reference}`).then(referenceId => cy.openCase(referenceId as unknown as string));
    });

    it('should display an involved case with additional parameters', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      const reference = 'open-case';
      cy.startCaseTypeA(reference);

      cy.doGatewayLogout();

      cy.doGatewayLogin('Behandelaar', 'Behandelaar');

      cy.get(`@${reference}`).then(referenceId => cy.involveCase(referenceId as unknown as string));
    });

    it('should refresh the dashboard widgets', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      cy.startCaseTypeA('refreshable-case-filtering');

      // set filter to have no values in table
      cy.intercept('POST', '/runtime/*/api/v2/session/*/event').as('events');
      cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakentoegewezen-1"]').within(() => {
        cy.get(`bq-filter button`).click();
        cy.root().parentsUntil('html').last().within(() => {
          cy.get('mat-dialog-container mat-form-field mat-select').selectOption('Kenmerk');
          cy.get('mat-dialog-container bq-text-filter input').first().type('abba');
          cy.get('mat-dialog-container button.mat-primary').click();
        });
      });
      cy.wait('@events').its('response.statusCode').should('equal', 200);
      cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakentoegewezen-1"] bq-table tbody').children().should('have.length', 0);

      // reload page
      cy.get('button[id="dashboard-refresh"]').click();

      // verify that filter is reset
      cy.get(DASHBOARD_WIDGET + '[id="maindashboard-shortcut-zakentoegewezen-1"] bq-table tbody').children().should('have.length.above', 0);
    });

  });

  describe('task actions', () => {
    it('should be able to successfully complete a task', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      const reference = 'start-task-completed';

      cy.startCaseTypeA(reference);

      cy.get(`@${reference}`).then(referenceId => cy.openCase(referenceId as unknown as string));

      cy.get(DASHBOARD_WIDGET + '[id="zaakdashboard-shortcut-widgettakenlijst-1"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });

      // Start Task
      cy.getButtonFor('P893', 'Start').click();
      // Finish Task
      cy.getButtonFor('P463', 'Ok').click();

      // Verify we are back in the case
      cy.verifyOpenCasePage();

      // New task should be available
      cy.get(DASHBOARD_WIDGET + '[id="zaakdashboard-shortcut-widgettakenlijst-1"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });
    });

    it('should be able to successfully cancel a task', () => {
      cy.startDashboard('/dashboard/export-foundation/V7_3_0/foundation/maindashboard', { loginRequired: true });

      cy.doGatewayLogin('Aanvrager', 'Aanvrager');

      const reference = 'start-task-canceled';

      cy.startCaseTypeA(reference);

      cy.get(`@${reference}`).then(referenceId => cy.openCase(referenceId as unknown as string));

      cy.get(DASHBOARD_WIDGET + '[id="zaakdashboard-shortcut-widgettakenlijst-1"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });

      // Start Task
      cy.getButtonFor('P893', 'Start').click();

      // Cancel Task
      cy.getButtonFor('P463', 'Annuleren').click();

      // Verify we are back in the case
      cy.verifyOpenCasePage();

      // Verify the task is still in the list
      cy.get(DASHBOARD_WIDGET + '[id="zaakdashboard-shortcut-widgettakenlijst-1"]').within(() => {
        cy.waitForListEntry('Toevoegen bewijsstukken');
      });
    });
  });
});
