import { Injectable } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';
import { Options } from '../../../options';

@Injectable()
export class DocumentLinkService {

  constructor() {
  }

  getDownloadUrl(link: Link, blueriqSession: BlueriqSession): string {
    let url: string = Options.BASE_URL + '/api/v2/';
    url += 'session/' + blueriqSession.sessionId + '/document/' + link.documentName + '/' + link.documentType;
    return url;
  }

}
