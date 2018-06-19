import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';

@Injectable()
export class DocumentLinkService {

  getDownloadUrl(link: Link, blueriqSession: BlueriqSession): string {
    let url = 'http://' + document.location.host + '/Runtime/api/v2/';
    url += 'session/' + blueriqSession.sessionId + '/document/' + link.documentName + '/' + link.documentType;
    return url;
  }

}
