import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { DocumentLinkComponent } from './document-link/document-link.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { FileDownloadService } from './file-download/file-download.service';
import { FileUploadComponent } from './file-upload/file-upload.component';

export function provideFileComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
      FileDownloadComponent,
      FileUploadComponent,
      DocumentLinkComponent,
    ]),
    FileDownloadService,
  ]);
}
