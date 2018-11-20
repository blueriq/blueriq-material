import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FileDownloadService } from './file-download.service';

describe('FileDownloadService', () => {

  beforeEach(() => {
    const mockDocument = { location: { href: '' } };
    TestBed.configureTestingModule({
      providers: [
        FileDownloadService,
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });
  });

  it('should redirect to given url', () => {
    const fileDownloadService: FileDownloadService = TestBed.get(FileDownloadService);
    const mockDocument: any = TestBed.get(DOCUMENT);
    fileDownloadService.download('URL');
    expect(mockDocument.location.href).toMatch(/URL$/);
  });
});
