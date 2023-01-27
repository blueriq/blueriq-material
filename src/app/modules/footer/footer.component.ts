import { Component } from '@angular/core';

@Component({
  selector:'bq-footer',
  template:`
    <footer>
      <mat-divider></mat-divider>
      <span align="center" class="img-logo"></span>
      <address>
        <a href="https://my.blueriq.com/" target="_blank">my.blueriq.com</a><br>
        <a href="mailto:support@blueriq.com">support@blueriq.com</a>
      </address>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
