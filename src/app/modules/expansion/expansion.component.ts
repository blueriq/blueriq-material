import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

@Component({
    selector: 'bq-expansion-container',
    templateUrl: './expansion.component.html',
    styleUrls: ['./expansion.component.scss'],
    imports: [MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, BlueriqCommonModule]
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.EXPANSION,
})
export class ExpansionComponent {  container = inject(Container);


}
