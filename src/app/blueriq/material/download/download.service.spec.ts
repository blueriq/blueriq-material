import { Link } from '@blueriq/core';
import { LinkTemplate } from '@blueriq/core/testing';
import { DownloadService } from './download.service';

describe('DownloadService', () => {
  let downloadService: DownloadService;

  beforeEach(() => {
    downloadService = new DownloadService();
  });

  it('should have a url containing document name, type and sessionId', () => {
    const linkJson = LinkTemplate.create().text('clickme').parameters({
      'document-name': 'downloadme',
      'document-type': 'pdf',
      'page-name': ''
    });
    const link = new Link(linkJson.toJson());
    const mockSession: any = { sessionId: '1234-5678-910' };

    // SUT
    const downloadUrl = downloadService.getDownloadUrl(link, mockSession);

    // Verify
    // http://localhost:4200/Runtime/api/v2/session/1234-5678-910/document/downloadme/pdf
    expect(downloadUrl).not.toBeNull();
    expect(downloadUrl).toContain('1234-5678-910');
    expect(downloadUrl).toContain('downloadme');
    expect(downloadUrl).toContain('pdf');
    expect(downloadUrl).toContain('http://');
  });

});
