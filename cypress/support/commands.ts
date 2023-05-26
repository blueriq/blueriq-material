import Chainable = Cypress.Chainable;
const compareSnapshotCommand = require('cypress-image-diff-js/dist/command');
import 'cypress-file-upload';
compareSnapshotCommand();
import {
  DASHBOARD_HEADER,
  DASHBOARD_MENU,
  DASHBOARD_PAGE,
  DASHBOARD_WIDGET,
  DASHBOARD_WIDGET_PROJECT,
  PAGE_LOGIN_FIELDNAME_PASSWORD,
  PAGE_LOGIN_FIELDNAME_USERNAME,
  PAGE_LOGIN_TAGNAME,
  PAGE_PROJECT_TAGNAME,
} from '../shared';

export {};

interface VisitOptions {
  loginRequired: boolean;
}

Cypress.Commands.add('equalIgnoreWhiteSpace', { prevSubject: true },
  // eslint-disable-next-line
  (subject: any, equalTo: string) => {
    expect(subject.text().trim()).to.eq(equalTo);
  },
);

Cypress.Commands.add('getById',
  (page: string, field: string, nr = '1') => getById(page, field, nr),
);

Cypress.Commands.add('getInputFor',
  (page: string, field: string) => cy.getById(page, field).find('input'),
);

Cypress.Commands.add('getMultiInputFor',
  (page: string, field: string) => cy.getById(page, field).find('mat-chip-list'),
);

Cypress.Commands.add('getTextareaFor',
  (page: string, field: string, nr = '1') => cy.getById(page, field, nr).find('textarea'),
);

Cypress.Commands.add('getCheckboxFor',
  (page: string, field: string, nr = '1') => cy.getById(page, field, nr).find('label'),
);

Cypress.Commands.add('getSelectFor',
  (page: string, field: string) => cy.getById(page, field).find('mat-select'),
);

Cypress.Commands.add('selectOption', { prevSubject: true },
  // eslint-disable-next-line
  (subject: any, selectOption: string) => {
    subject.click();
    cy.wait(100);
    return cy.get('mat-option').contains(selectOption).click();
  },
);

Cypress.Commands.add('getTableCellFor',
  (page: string, field: string, nr: string) => cy.getById(page, field, nr),
);

Cypress.Commands.add('getButtonFor',
  (page: string, field: string) => getByTagName('button', page, field),
);

Cypress.Commands.add('nrOfValidations',
  (length: number) => cy.get('mat-error').should('have.length', length),
);

Cypress.Commands.add('getTitleTextFor',
  (page: string, field: string) => cy.getById(page, field).find('h1'),
);

Cypress.Commands.add('getContainerTitleTextFor',
  (page: string, field: string, nr = '1') => cy.getById(page, field, nr).find('h2'),
);

Cypress.Commands.add('visitRuntime', visitRuntime);

Cypress.Commands.add('startDashboard', startDashboard);

Cypress.Commands.add('clickForDashboardChange', clickForDashboardChange);

Cypress.Commands.add('doLogin', doLogin);

Cypress.Commands.add('doGatewayLogin', doGatewayLogin);

Cypress.Commands.add('doGatewayLogout', doGatewayLogout);

Cypress.Commands.add('doLogout', doLogout);

Cypress.Commands.add('startCaseTypeA', startCaseTypeA);

Cypress.Commands.add('openCase', openCase);

Cypress.Commands.add('involveCase', involveCase);

Cypress.Commands.add('verifyOpenCasePage', verifyOpenCasePage);

Cypress.Commands.add('waitForListEntry', waitForListEntry);

function getById(page: string, field: string, nr = '1'): Chainable<unknown> {
  return getByTagName('', page, field, nr);
}

function getByTagName(tagName: string, page: string, field: string, nr = '1'): Chainable<unknown> {
  return cy.get(`${tagName}[id^=${page + '_' + field + '_' + nr}]`);
}

function visitRuntime(url: string, visitOptions: VisitOptions = { loginRequired: false }): Chainable<unknown> {
  cy.intercept({ method: 'POST', url: /\/runtime\/api\/v2\/start(\/?).*$/ }).as('visitRuntime');
  cy.visit(url);

  // A login page could be expected (401 = unauthorized)
  return cy.wait('@visitRuntime').its('response.statusCode').should('equal', visitOptions.loginRequired ? 401 : 200);
}

function startDashboard(url: string, visitOptions: VisitOptions = { loginRequired: false }): Chainable<unknown> {
  if (visitOptions.loginRequired) {
    interceptGatewayAuthCssLoading();
  }

  cy.intercept({ method: 'get', url: '/dashboards/**' }).as('getDashboard');
  cy.visit(url, {
    onBeforeLoad: (win) => {
      win.sessionStorage.clear();
    },
  });

  // A login page could be expected (401 = unauthorized)
  return cy.wait('@getDashboard').its('response.statusCode').should('equal', visitOptions.loginRequired ? 401 : 200);
}

function clickForDashboardChange(button: Chainable): Chainable<unknown> {
  cy.intercept({ method: 'get', url: /\/runtime\/(.*)\/api\/v2\/start(\/?).*$/ }).as('dashboardChanges');
  button.click();

  return cy.wait('@dashboardChanges').its('response.statusCode').should('equal', 200);
}

function doLogin(username: string, password: string): Chainable<unknown> {
  cy.get(PAGE_LOGIN_FIELDNAME_USERNAME).type(username);
  cy.get(PAGE_LOGIN_FIELDNAME_PASSWORD).type(password);


  const login = cy.get(PAGE_LOGIN_TAGNAME).find('button').click();

  // The loginpage is not expected anymore after entering the correct credentials
  cy.get(PAGE_LOGIN_TAGNAME).should('not.exist');
  cy.get(PAGE_PROJECT_TAGNAME).should('exist');

  return login;
}

function doGatewayLogin(username: string, password: string): Chainable<unknown> {
  cy.get('a[href*="oauth2/authorization/keycloak"]').click();

  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#kc-login').click();

  return cy.get('bq-dashboard').should('exist');
}

function doLogout(): Chainable<unknown> {
  cy.get(DASHBOARD_HEADER).within(() => {
    cy.get('.logout').should('exist').click();
  });

  return cy.get('button').should('exist').click();
}

function doGatewayLogout(): Chainable<unknown> {
  interceptGatewayAuthCssLoading();

  cy.get(DASHBOARD_HEADER).within(() => {
    cy.get('button.active-user-menu').should('exist').click();
  });
  cy.get('.logout').should('exist').click();

  cy.url().should('contain', '/auth/logout');

  return cy.get('button').should('exist').click();
}

function startCaseTypeA(reference: string): Chainable<unknown> {
  cy.get(DASHBOARD_HEADER).within(() => {
    cy.get(DASHBOARD_MENU).contains('button', 'Zaakcatalogus').click();
  });

  cy.get(DASHBOARD_PAGE).within(() => {
    cy.get(DASHBOARD_WIDGET + '[id="start-cases"]').should('exist').within(_ => {
      cy.intercept('POST', '/runtime/*/api/v2/session/*/load').as('startCase');
      cy.getButtonFor('P169', 'Aanvragen').click();
      cy.wait('@startCase').its('response.statusCode').should('equal', 200);
    });
  });

  cy.get(DASHBOARD_PAGE).within(() => {
    cy.get(DASHBOARD_WIDGET + '[id="StartZaak"]').should('exist').within(_ => {
      cy.getInputFor('P572', 'Domeingegevens-Aanvraaggegevens').type(reference);
      cy.getButtonFor('P572', 'Ok').click();
    });
  });

  cy.get(DASHBOARD_PAGE).within(() => {
    cy.get(DASHBOARD_WIDGET + '[id="StartZaak"]').should('exist').within(_ => {
      cy.get('div[id="P525_AanvraagGeregistreerd_1"]').contains('De aanvraag is bekend met het kenmerk');
      cy.get('div[id="P525_AanvraagGeregistreerd_1"] bq-textitem-dynamic').then($element => {
          cy.wrap($element.text()).as(reference);
      })
    });
  })

  cy.get(DASHBOARD_HEADER).within(() => {
    cy.get(DASHBOARD_MENU).contains('button', 'Home').click();
  });

  return cy.get(DASHBOARD_PAGE).within(() => {
    cy.get(DASHBOARD_WIDGET + '[id="StartZaak"]').should('not.exist');
    cy.get(DASHBOARD_WIDGET + '[id="toegewezen-zaken"]').should('exist');
  });
}

function openCase(reference: string): Chainable<unknown> {
  return handleCase(reference, 'open');
}

function involveCase(reference: string): Chainable<unknown> {
  return handleCase(reference, 'involve');
}

function handleCase(reference: string, type: 'involve' | 'open'): Chainable<unknown> {
  cy.get(DASHBOARD_PAGE).within(() => {
    const widgetId = type === 'open' ? "toegewezen-zaken" : "niet-toegewezen-zaken";


    cy.get(DASHBOARD_WIDGET + `[id="${widgetId}"]`).should('exist').within(() => {
      cy.intercept('POST', '/runtime/*/api/v2/session/*/load').as('handleCase');

      waitForListEntry(reference);
      // get the row that has our passed reference
      cy.get('.asset').contains(reference).parents('tr').within(() => {

        if (type === 'open') {
          cy.get('button[id^="P682_Open_"]').click();
        } else {
          cy.get('button[id^="P76_NeemInBehandeling_"]').click();
        }

        cy.wait('@handleCase').its('response.statusCode').should('equal', 200);

        // sometimes the browser is not done after previous wait. :(
        cy.wait(1000);
      });
    });
  });

  return verifyOpenCasePage(type);
}

function verifyOpenCasePage(type: 'involve' | 'open' = 'open'): Chainable<unknown> {
  return cy.get(DASHBOARD_PAGE).within(() => {
    cy.get(DASHBOARD_WIDGET).should('have.length', 6);

    cy.get(DASHBOARD_WIDGET + '[id="open-case-details"]').should('exist').within(() => {
      if(type === 'involve'){
        cy.url().should('include','Event=NeemInBehandeling');
      }

      cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
    });
    cy.get(DASHBOARD_WIDGET + '[id="open-case-tasks"]').should('exist').within(() => {
      cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
    });
    cy.get(DASHBOARD_WIDGET + '[id="open-case-documents"]').should('exist').within(() => {
      cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
    });
    cy.get(DASHBOARD_WIDGET + '[id="open-case-applicants"]').should('exist').within(() => {
      cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
    });
    cy.get(DASHBOARD_WIDGET + '[id="open-case-notes"]').should('exist').within(() => {
      cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
    });
    cy.get(DASHBOARD_WIDGET + '[id="open-case-history"]').should('exist').within(() => {
      cy.get(DASHBOARD_WIDGET_PROJECT).should('exist');
    });

    cy.get(DASHBOARD_HEADER).within(() => {
      cy.get(DASHBOARD_MENU).contains('button', 'Home');
    });
  });
}

function waitForListEntry(reference: string, attempts: number = 0): Chainable<unknown> {
  if (attempts > 5) {
    throw new Error(`entry with reference '${reference}' was not found in time`);
  }

  return cy.get('bq-table').then($table => {
    if ($table.find('.asset').get().some(asset => asset.innerHTML.indexOf(reference) > 0)) {
      return;
    }
    cy.wait(1000);
    cy.get(`bq-filter button`).click();
    cy.intercept('POST', '/runtime/*/api/v2/session/*/event').as('events');
    cy.root().parentsUntil('html').last().within(() => {
      // Filter Kenmerk
      cy.get('mat-dialog-container mat-form-field mat-select').selectOption('Kenmerk');
      // Filter reference
      cy.get('mat-dialog-container bq-text-filter input').first().type(reference);

      cy.get('mat-dialog-container button.mat-primary').click();
    });
    cy.wait('@events').its('response.statusCode').should('equal', 200);

    waitForListEntry(reference, attempts + 1);
  });

}

function interceptGatewayAuthCssLoading() {
  cy.intercept({ method: 'get', url: '*signin.css' }, req => req.reply('success'));
  cy.intercept({ method: 'get', url: '*bootstrap.min.css' }, req => req.reply('success'));
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      visitRuntime: typeof visitRuntime;

      /**
       * Start the requested dashboard. This function should not be called in the beforeEach stage as it contains
       * stubbed routes. Stubbed routes are cleared before each test but not in the beforeEach stage, which can cause
       * flake tests.
       */
      startDashboard: typeof startDashboard;
      clickForDashboardChange: typeof clickForDashboardChange;

      equalIgnoreWhiteSpace(text: string): Chainable<Subject>;

      getById(page: string, field: string, nr?: string): Chainable<Subject>;

      getTitleTextFor(page: string, field: string): Chainable<Subject>;

      getContainerTitleTextFor(page: string, field: string, nr?: string): Chainable<Subject>;

      getInputFor(page: string, field: string): Chainable<Subject>;

      getMultiInputFor(page: string, field: string): Chainable<Subject>;

      getTextareaFor(page: string, field: string, nr?: string): Chainable<Subject>;

      getCheckboxFor(page: string, field: string, nr?: string): Chainable<Subject>;

      getSelectFor(page: string, field: string): Chainable<Subject>;

      selectOption(selectOption: string): Chainable<Subject>;

      getTableCellFor(page: string, field: string, nr: string): Chainable<Subject>;

      getButtonFor(page: string, field: string): Chainable<Subject>;

      nrOfValidations(length: number): Chainable<Subject>;

      doLogin(username: string, password: string): Chainable<Subject>;

      doGatewayLogin(username: string, password: string): Chainable<Subject>;

      doLogout(): Chainable<Subject>;

      doGatewayLogout(): Chainable<Subject>;

      /**
       * Starts a case of type A.
       *
       * @param reference can be used to refer to the case at a later time
       * @returns the reference id used to find a case. 
       */
      startCaseTypeA(reference: string): Chainable<unknown>;

      /**
       * Open a case by reference.
       *
       * @param reference the reference of the existing case
       */
      openCase(reference: string): Chainable<Subject>;

      /**
       * Involves a case by reference.
       *
       * @param reference the reference of the existing case
       */
      involveCase(reference: string): Chainable<Subject>;

      /**
       * Verify if the current page is the case view page.
       */
      verifyOpenCasePage(): Chainable<Subject>;

      /**
       * Wait for a list entry to appear.
       *
       * @param reference the reference to search for.
       */
      waitForListEntry(reference: string): Chainable<Subject>;
    }
  }
}
