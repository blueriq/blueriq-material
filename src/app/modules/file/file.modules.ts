import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { HeadingModule } from '../heading/heading.module';
import { DocumentLinkComponent } from './document-link/document-link.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { FileDownloadService } from './file-download/file-download.service';
import { DottedFileExtensionsPipe } from './file-upload/dotted-file-extensions.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';

const FILE_COMPONENTS = [
  FileDownloadComponent,
  FileUploadComponent,
  DocumentLinkComponent,
];

const FILE_PIPES = [
  DottedFileExtensionsPipe,
];

@NgModule({
  declarations: [
    FILE_COMPONENTS,
    FILE_PIPES,
  ],
  providers: [
    BlueriqComponents.register(FILE_COMPONENTS),
    FileDownloadService,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    FileUploadModule,
    HeadingModule,

    /* Material modules */
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
  ],
  exports: [FILE_COMPONENTS],
})
export class FileModule {
}
