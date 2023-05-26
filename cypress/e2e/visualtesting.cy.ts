describe('Visual testing', () => {
  beforeEach(() => {
    cy.viewport(1920,4000);
  });

  describe('Input fields', () => {
    beforeEach(() => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');
      cy.get('#P866_InputFields_2').click().wait(2000);
    });

    it('Check String fields', () => {
      cy.compareSnapshot('string-fields', 0.02);
    });

    it('Check Integer fields', () => {
      cy.get('#mat-tab-label-0-1').click().wait(2000);
      cy.compareSnapshot('integer-fields', 0.02);
    });

    it('Check Number fields', () => {
      cy.get('#mat-tab-label-0-2').click().wait(2000);
      cy.compareSnapshot('number-fields', 0.02);
    });

    it('Check Percentage fields', () => {
      cy.get('#mat-tab-label-0-3').click().wait(2000);
      cy.compareSnapshot('percentage-fields', 0.02);
    });

    it('Check Currency fields', () => {
      cy.get('#mat-tab-label-0-4').click().wait(2000);
      cy.compareSnapshot('currency-fields', 0.02);
    });
  });

  describe('Multi input', () => {
    beforeEach(() => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');
      cy.get('#P866_MultiInput_1').click().wait(2000);
    });

    it('Check Dropdowns', () => {
      cy.compareSnapshot('dropdowns', 0.02);
    });

    it('Check Radio buttons', () => {
      cy.get('#mat-tab-label-0-1').click().wait(2000);
      cy.compareSnapshot('radio-buttons', 0.02);
    });

    it('Check Instance linkers', () => {
      cy.get('#mat-tab-label-0-3').click().wait(2000);
      cy.compareSnapshot('instance-linkers', 0.02);
    });
  });

  describe('Buttons and booleans', () => {
    beforeEach(() => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');
      cy.get('#P866_ButtonsBooleans_1').click().wait(2000);
    });

    it('Check Buttons', () => {
      cy.compareSnapshot('buttons', 0.02);
    });

    it('Check Checkboxes', () => {
      cy.get('#mat-tab-label-0-1').click().wait(2000);
      cy.compareSnapshot('checkboxes', 0.02);
    });

    it('Check Slide toggle', () => {
      cy.get('#mat-tab-label-0-2').click().wait(2000);
      cy.compareSnapshot('slide-toggle', 0.02);
    });
  });

  describe('Date input', () => {
    beforeEach(() => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');
      cy.get('#P866_DateTimepicker_1').click();
      // timeout because the date picker content takes a long time to show up due to already existing errors.
      cy.get('#mat-tab-label-0-0', { timeout: 150000 });
    });

    it('Check Date Pickers', () => {
      cy.compareSnapshot('date-pickers', 0.02);
    });

    it ('Check Date Time Pickers', () => {
      // check date time pickers
      cy.get('#mat-tab-label-0-1').click().wait(2000);
      cy.compareSnapshot('datetime-pickers', 0.02);
    });

    it ('Check Date Time Pickers Material', () => {
      // check date time pickers material
      cy.get('#mat-tab-label-0-2').click().wait(2000);
      cy.compareSnapshot('datetime-pickers-material', 0.02);
    });
  });

  describe('Containers', () => {
    beforeEach(() => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');
    });

    it('Check Layouts', () => {
      cy.get('#P866_Layouts_1').click().wait(2000);
      cy.compareSnapshot('layout-check', 0.02);
    });

    it('Check Menu', () => {
      cy.get('#P866_Menu_1').click().wait(2000);
      cy.compareSnapshot('menu', 0.02);
    });
  });

  describe('Textual content', () => {
    it('Check Text Items', () => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');

      cy.get('#P866_TextItems_2').click().wait(2000);
      cy.compareSnapshot('text-items', 0.02);
    });
  });

  describe('Dashboard', () => {
    it('Check Dashboard', () => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');

      cy.get('#P866_Dashboard_2').click().wait(2000);
      cy.compareSnapshot('dashboard', 0.02);
    });
  });

  describe('List containers', () => {
    it('Check Instance List', () => {
      cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');

      cy.get('#P866_InstanceList_1').click().wait(2000);
      cy.compareSnapshot('instance-list', 0.02);
    });
  });
});
