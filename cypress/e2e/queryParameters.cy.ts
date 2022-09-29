describe('QueryParameters app', () => {

  const PAGE_ID = 'P308';

  beforeEach(() => {
    cy.visitRuntime('/shortcut/QueryParameters?test=BlueriqCypress');
  });

  it('should display the correct query parameter value', () => {
    cy.getTextareaFor(PAGE_ID, 'QueryParameters-TestParameter').invoke('val').should('eq', 'BlueriqCypress');
  });
});
