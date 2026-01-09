import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Summary} from '@blueriq/angular/zone';
import { Container } from '@blueriq/core';
import {
  dateFromNowHumanReadable,
  dateToDateTime,
} from '@shared/date/bq-date-parser';

@Component({
    selector: 'bq-summary',
    templateUrl: './summary.component.html',
    styleUrls: [
        './summary.component.scss',
    ],
    providers: [Summary],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: 'summary',
})
export class SummaryComponent {
  container = inject(Container);
  readonly summary = inject(Summary);
  private readonly session = inject(BlueriqSession);


  dateToExpirationFormat(expirationTime: Date): string {
    if (expirationTime.getTime() < Date.now()){
      return 'expired ' + dateFromNowHumanReadable(expirationTime, this.session.localization, true);
    }
    return 'expires at ' + dateToDateTime(expirationTime, this.session.localization);
  }

  expirationTimeIcon(expirationTime: Date): string {
    if (expirationTime.getTime() < Date.now()){
      return 'clear';
    }
    return 'hourglass_empty';
  }
}
