import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';

@Injectable()
export class DownloadService {

  getDownloadUrl(link: Link, blueriqSession: BlueriqSession): string {
    let url = 'http://localhost:4200/Runtime/api/v2/';
    url += 'session/' + blueriqSession.sessionId + '/document/' + link.documentName + '/' + link.documentType;
    // url += '?error-redirect=';
    // url += '***REMOVED***/
    // session/616b9c36-1cb2-432c-b787-452b169f895e/mvc/index.html';
    // console.log(url);
    return url;
  }

}
