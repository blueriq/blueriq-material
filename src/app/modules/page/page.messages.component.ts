import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './page.messages.component.html',
  styleUrls: ['./page.messages.component.scss']
})
export class PageMessagesComponent {

  constructor(private snackBar: MatSnackBar,
              @Inject(MAT_SNACK_BAR_DATA) public messages: any) {
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }
}
