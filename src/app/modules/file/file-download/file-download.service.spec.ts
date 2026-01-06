import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FileDownloadService } from './file-download.service';

describe('FileDownloadService', () => {

  beforeEach(() => {
    const mockDocument = {
      location: { href: 'http://blueriq.com/current' },
      querySelectorAll: document.querySelectorAll.bind(document),
    };
    TestBed.configureTestingModule({
      providers: [
        FileDownloadService,
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });
  });

  it('should redirect to given url', () => {
    const fileDownloadService: FileDownloadService = TestBed.inject(FileDownloadService);
    const mockDocument: Document = TestBed.inject(DOCUMENT);
    fileDownloadService.download('./url-to-download');
    expect(mockDocument.location.href).withContext('The user should have been redirected to an absolute URL').toMatch(/\d\/url-to-download/);
    expect(mockDocument.location.href).withContext('An error redirect should be provided').toContain('=http%3A%2F%2Fblueriq.com%2Fcurrent');
  });
});
