import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';
import { Configuration } from '../../../configuration';

@Injectable()
export class DocumentLinkService {

  constructor() {
  }

  getDownloadUrl(link: Link, blueriqSession: BlueriqSession): string {
    let url: string = Configuration.BASE_URL + '/api/v2/';
    url += 'session/' + blueriqSession.sessionId + '/document/' + link.documentName + '/' + link.documentType;
    return url;
  }

}
