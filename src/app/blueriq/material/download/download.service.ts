import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';

@Injectable()
export class DownloadService {

  constructor(/* inject what?*/) {
  }

  // ***REMOVED***/api/v2/
  // session/616b9c36-1cb2-432c-b787-452b169f895e/document/<documentname>/pdf
  // ?error-redirect=
  // ***REMOVED***/session/616b9c36-1cb2-432c-b787-452b169f895e/mvc/index.html
  getDownloadUrl(link: Link, blueriqSession: BlueriqSession): string {
    let url = ' ***REMOVED***/api/v2/';
    url += 'session/' + blueriqSession.sessionId + '/document/' + link.documentName + '/' + link.documentType;
    url += '?error-redirect=http://www.google.nl';
    console.log('generated url:', url);
    return url;
  }

}
