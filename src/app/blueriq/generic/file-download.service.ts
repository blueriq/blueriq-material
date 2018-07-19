import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class FileDownloadService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  download(url: string) {
    this.document.location.href = url;
  }
}
