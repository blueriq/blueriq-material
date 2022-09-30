// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// @ts-ignore
// @ts-ignore

// Cypress.Commands.add('login', (email, password) => { ... })

import Chainable = Cypress.Chainable;

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

function getById(page: string, field: string, nr = '1'): Chainable<unknown> {
  return getByTagName('', page, field, nr);
}

function getByTagName(tagName: string, page: string, field: string, nr = '1'): Chainable<unknown> {
  return cy.get(`${tagName}[id^=${page + '_' + field + '_' + nr}]`);
}

function visitRuntime(url: string, visitOptions: VisitOptions = { loginRequired: false }): Chainable<unknown> {
  cy.intercept({ method: 'POST', url: '/runtime/api/v2/start/**' }).as('dataGetFirst');
  cy.visit(url);

  // A login page could be expected (401 = unauthorized)
  return cy.wait('@dataGetFirst').its('response.statusCode').should('equal', visitOptions.loginRequired ? 401 : 200);
}


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      visitRuntime: typeof visitRuntime;

      equalIgnoreWhiteSpace(text: string): Chainable<Subject>;

      getById(page: string, field: string, nr?: string): Chainable<Subject>;

      getTitleTextFor(page: string, field: string): Chainable<Subject>;

      getContainerTitleTextFor(page: string, field: string, nr?: string): Chainable<Subject>;

      getInputFor(page: string, field: string): Chainable<Subject>;

      getTextareaFor(page: string, field: string, nr?: string): Chainable<Subject>;

      getCheckboxFor(page: string, field: string, nr?: string): Chainable<Subject>;

      getSelectFor(page: string, field: string): Chainable<Subject>;

      selectOption(selectOption: string): Chainable<Subject>;

      getTableCellFor(page: string, field: string, nr: string): Chainable<Subject>;

      getButtonFor(page: string, field: string): Chainable<Subject>;

      nrOfValidations(length: number): Chainable<Subject>;
    }
  }
}
