describe('CheckBox flow on refresh App', () => {

  const PAGE_ID_CHECKBOX_FLOW_REFRESH = 'P588';

  beforeEach(() => {
    cy.visitRuntime('/flow/export-CheckboxFlowOnRefresh/ActiveInstance');
  });

  it('should display header with text', () => {
    cy.getTitleTextFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'PersonsActive').equalIgnoreWhiteSpace('persons');
  });

  it('should have 4 checkboxes', () => {
    cy.get('mat-checkbox').should('have.length', 4);
  });

  it('should have 4 textareas', () => {
    cy.get('textarea').should('have.length', 4);
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '1').invoke('val').should('eq', '1');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '2').invoke('val').should('eq', '2');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '3').invoke('val').should('eq', '2');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '4').invoke('val').should('eq', '3');
  });

  it('only the first text should be 5 after checking the first checkbox', () => {
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '1').invoke('val').should('eq', '1');
    cy.getCheckboxFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-TriggerRefresh', '1').click();
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '1').invoke('val').should('eq', '5');

    // Not been changed
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '2').invoke('val').should('not.eq', '5');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '3').invoke('val').should('not.eq', '5');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '4').invoke('val').should('not.eq', '5');
  });

  it('only the second and third text should be 5 after checking the second and third checkbox', () => {
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '2').invoke('val').should('eq', '2');
    cy.getCheckboxFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-TriggerRefresh', '2').click();
    cy.getCheckboxFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-TriggerRefresh', '3').click();
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '2').invoke('val').should('eq', '5');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '3').invoke('val').should('eq', '5');

    // Not been changed
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '1').invoke('val').should('eq', '1');
    cy.getTextareaFor(PAGE_ID_CHECKBOX_FLOW_REFRESH, 'Active-Number', '4').invoke('val').should('eq', '3');
  });
});
