import { Component, isDevMode } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Container, FailedElement } from '@blueriq/core';

@Component({
  selector: 'bq-failed',
  styleUrls: ['./failed.component.scss'],
  templateUrl: './failed.component.html'
})
@BlueriqComponent({
  type: Container,
  selector: ':has(* > [type=failedelement])'
})
export class FailedComponent {

  @BlueriqChild(FailedElement, '[type=failedelement]', { optional: true })
  failedElement: FailedElement;

  showTrace = false;
  isDev = false;

  constructor() {
    this.isDev = isDevMode();
  }
}
