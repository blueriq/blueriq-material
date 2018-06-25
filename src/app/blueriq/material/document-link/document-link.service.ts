import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';
import { Configuration } from '../../../configuration/configuration';

@Injectable()
export class DocumentLinkService {

  constructor() {
  }

  /** Constructs the URL from where to download the document. TODO: replace with red-cow code when it's available. */
  getDownloadUrl(link: Link, blueriqSession: BlueriqSession): string {
    let url: string = Configuration.BASE_URL + '/api/v2/';
    url += 'session/' + blueriqSession.sessionId + '/document/' + link.documentName + '/' + link.documentType;
    return url;
  }

}
