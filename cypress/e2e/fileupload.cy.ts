describe('File Upload', () => {
  it('should handle single file upload', () => {
    cy.visitRuntime('flow/export-Fileupload_e2e/Start/0.0-Trunk/en-US');
    // Upload a file
    uploadFile('#P791-C0 bq-file-upload', 'single.txt');

    // Verify the first file
    cy.get('#P791_File-Name_1 textarea').should('have.value', 'single.txt');

    // Delete file
    cy.intercept('POST', '/runtime/api/v2/session/*/event').as('deleteFile');
    cy.get('#P791_Delete_1').click();
    cy.wait('@deleteFile').its('response.statusCode').should('equal', 200);

    // Upload the file again
    uploadFile('#P791-C0 bq-file-upload', 'single.txt');

    // Verify the second file
    cy.get('#P791_File-Name_1 textarea').should('have.value', 'single.txt');
  });

  it('should handle multi file upload', () => {
    cy.visitRuntime('flow/export-Fileupload_e2e/Start/0.0-Trunk/en-US');

    // Upload a file
    uploadFile('#P791-C1 bq-file-upload', 'multi_1.txt', 'multi_2.txt');

    // Verify files
    cy.get('#P791_MultiFile-Name_1 textarea').should('have.value', 'multi_1.txt');
    cy.get('#P791_MultiFile-Name_2 textarea').should('have.value', 'multi_2.txt');
  });

  it('should display errors', () => {
    cy.visitRuntime('flow/export-Fileupload_e2e/Start/0.0-Trunk/en-US');
    // Upload a too large file
    uploadFile('#P791-C0 bq-file-upload', 'filetobig.txt');

    // Verify file not uploaded because file is too large.
    cy.get('#P791_File-Name_1').should('not.exist');
    cy.get('#P791-C0 bq-file-upload mat-error').should('have.text', 'File is too large');

    // Upload a file with the wrong extension
    uploadFile('#P791-C0 bq-file-upload', 'wrongextension.rtf');

    // Verify file not uploaded because file has the wrong extensions.
    cy.get('#P791_File-Name_1').should('not.exist');
    cy.get('#P791-C0 bq-file-upload mat-error').should('have.text', 'File type not allowed');
  });

  it('should remove the container after the file is uploaded due to a precondition', () => {
    cy.visitRuntime('flow/export-Fileupload_e2e/Start/0.0-Trunk/en-US');
    // Upload a file
    uploadFile('#P791-C2 bq-file-upload', 'single.txt');

    // Verify that the container is removed
    cy.get('#P791-C2').should('not.exist');
  });

  it('should upload the file to the correct container when repeated', () => {
    cy.visitRuntime('flow/export-Fileupload_e2e/Start/0.0-Trunk/en-US');
    // Upload a file
    uploadFile('#P791-C3-C0 bq-file-upload', 'single.txt');

    // Verify file
    cy.get('#P791_RepeatFile-Name_1 textarea').should('have.value', 'single.txt');
    cy.get('#P791_RepeatFile-Name_2').should('not.exist');

    // Upload a file
    uploadFile('#P791-C3-C1 bq-file-upload', 'single-again.txt');

    // Verify file
    cy.get('#P791_RepeatFile-Name_1 textarea').should('have.value', 'single.txt');
    cy.get('#P791_RepeatFile-Name_2 textarea').should('have.value', 'single-again.txt');
  });

  it('should enforce the maxupload size of the configured runtime', () => {
    cy.visitRuntime('flow/export-Fileupload_e2e/Start/0.0-Trunk/en-US');

    // Verify max upload hint is set 10MB and not the configured 20MB
    cy.get('#P791-C4 bq-file-upload mat-hint').should('have.text', 'Maximum file size is: 10 MB');
  });
});

function uploadFile(containerId: string, ...files: string[]): void {
  cy.get(containerId)
  .within(() => {
    cy.get('input[type="file"]').attachFile(files);
  });
}
