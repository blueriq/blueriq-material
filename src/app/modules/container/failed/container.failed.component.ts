import { Component, isDevMode } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Container, FailedElement } from '@blueriq/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'bq-failed',
    styleUrls: ['./container.failed.component.scss'],
    templateUrl: './container.failed.component.html',
    imports: [MatIconButton, MatTooltip, MatIcon]
})
@BlueriqComponent({
  type: Container,
  selector: ':has(* > [type=failedelement])',
})
export class ContainerFailedComponent {

  @BlueriqChild(FailedElement, '[type=failedelement]', { optional: true })
  failedElement: FailedElement;

  showTrace = false;
  isDev = isDevMode();

  copyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.textContent = this.failedElement.stacktrace || '';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
