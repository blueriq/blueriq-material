import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { DocumentLinkComponent } from './document-link/document-link.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { FileDownloadService } from './file-download/file-download.service';
import { FileUploadComponent } from './file-upload/file-upload.component';

const FILE_COMPONENTS = [
  FileDownloadComponent,
  FileUploadComponent,
  DocumentLinkComponent
];

@NgModule({
  declarations: [
    FILE_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(FILE_COMPONENTS),
    FileDownloadService
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    FileUploadModule,

    /* Material modules */
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule
  ],
  exports: [FILE_COMPONENTS]
})
export class FileModule {
}
