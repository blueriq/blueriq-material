import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BlueriqChild, BlueriqChildren, BlueriqComponent } from '@blueriq/angular';
import { Button, Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
  selector: 'bq-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.MODAL,
})
export class ModalComponent implements OnInit {

  dialogRef: MatDialogRef<Element>;

  @ViewChild('dialog', { static: true, read: TemplateRef })
  dialogTemplate: TemplateRef<Element>;

  @BlueriqChildren(Button, `.${BqPresentationStyles.MODAL_ACTION_BUTTON}`, { exclude: true })
  modalActionButtons: Button[];

  @BlueriqChild(Button, `.${BqPresentationStyles.MODAL_CLOSE_BUTTON}`, { exclude: true })
  modalCloseButton: Button;

  constructor(private readonly dialog: MatDialog, public container: Container) {
    console.log(container);
  }

  ngOnInit() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, { disableClose: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
