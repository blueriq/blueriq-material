import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class FileDownloadService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  download(url: string) {
    if (this.document && this.document.location) {
      this.document.location.href = this.toAbsoluteLink(url);
    }
  }

  // Dirty hack to fix a bug where IE would interpret a relative link differently than Chrome:
  // relative to the current URL in the browser instead of relative to the location of index.html
  // See: BQ-5234
  private toAbsoluteLink(linkText: string): string {
    const temp: HTMLElement | any = document.createElement('a');
    temp.href = linkText;
    return temp.href;
  }
}
