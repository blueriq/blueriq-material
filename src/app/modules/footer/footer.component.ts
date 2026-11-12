import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'bq-footer',
    template: `
    <footer>
      <mat-divider></mat-divider>
      <span align="center" class="img-logo"></span>
      <address>
        <a href="https://my.blueriq.com/" target="_blank">my.blueriq.com</a><br>
        <a href="mailto:support@blueriq.com">support&#64;blueriq.com</a>
      </address>
    </footer>
  `,
    styleUrls: ['./footer.component.scss'],
    imports: [MatDivider]
})
export class FooterComponent {

}
