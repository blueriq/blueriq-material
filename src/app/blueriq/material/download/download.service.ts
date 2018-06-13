import { Injectable } from '@angular/core';

@Injectable()
export class DownloadService {

  constructor(/* inject what?*/) {
  }

  // ***REMOVED***/api/v2/
  // session/616b9c36-1cb2-432c-b787-452b169f895e/document/Document/pdf
  // ?error-redirect=
  // ***REMOVED***/session/616b9c36-1cb2-432c-b787-452b169f895e/mvc/index.html
  getDownloadURL(): string {
    return 'www.google.nl';
  }

}
