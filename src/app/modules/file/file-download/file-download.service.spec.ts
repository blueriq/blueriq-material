import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FileDownloadService } from './file-download.service';

describe('FileDownloadService', () => {

  beforeEach(() => {
    const mockDocument = { location: { href: 'http://blueriq.com/current' } };
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
    expect(mockDocument.location.href).toMatch(/\d\/url-to-download/, 'The user should have been redirected to an absolute URL');
    expect(mockDocument.location.href).toContain('=http%3A%2F%2Fblueriq.com%2Fcurrent', 'An error redirect should be provided');
  });
});
