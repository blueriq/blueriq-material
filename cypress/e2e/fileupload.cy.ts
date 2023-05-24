describe('File Upload', () => {
  it('should handle single file upload', () => {
    cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');

    // Open the file upload page
    cy.get('#P866_File_1').click();

    // Upload a file
    uploadFile('#P724-C0-C0 bq-file-upload', 'single.txt');

    // Verify the first file
    cy.get('#P724_File-Name_1').should('contain.text', 'single.txt');

    // Upload the file again
    uploadFile('#P724-C0-C0 bq-file-upload', 'single.txt');

    // Verify the second file
    cy.get('#P724_File-Name_2').should('contain.text', 'single.txt');
  });

  it('should handle multi file upload', () => {
    cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');

    // Open the file upload page
    cy.get('#P866_File_1').click();

    // Upload a file
    uploadFile('#P724-C0-C2 bq-file-upload', 'multi_1.txt', 'multi_2.txt');

    // Verify files
    cy.get('#P724_File-Name_1').should('contain.text', 'multi_1.txt');
    cy.get('#P724_File-Name_2').should('contain.text', 'multi_2.txt');
  });

  it('should display errors', () => {
    cy.visitRuntime('flow/export-Suitcase/Demo/0.0-Trunk/en-GB');

    // Open the file upload page
    cy.get('#P866_File_1').click();

    // Upload a too large file
    uploadFile('#P724-C0-C0 bq-file-upload', 'filetobig.txt')

    // Verify file not uploaded because file is too large.
    cy.get('#P724_File-Name_1').should('not.exist');
    cy.get('#P724-C0-C0 bq-file-upload mat-error').should('have.text', 'File is too large');

    // Upload a file with the wrong extension
    uploadFile('#P724-C0-C0 bq-file-upload', 'wrongextension.rtf')

    // Verify file not uploaded because file has the wrong extensions.
    cy.get('#P724_File-Name_1').should('not.exist');
    cy.get('#P724-C0-C0 bq-file-upload mat-error').should('have.text', 'File type not allowed');
  });
});

function uploadFile(containerId: string, ...files: string[]): void {
  cy.get(containerId)
    .within(() => {
      cy.get('input[type="file"]').attachFile(files);
    });
}
