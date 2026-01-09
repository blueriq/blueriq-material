import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
    selector: 'bq-expansion-container',
    templateUrl: './expansion.component.html',
    styleUrls: ['./expansion.component.scss'],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.EXPANSION,
})
export class ExpansionComponent {  container = inject(Container);


}
