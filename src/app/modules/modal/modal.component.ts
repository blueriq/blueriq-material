import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { BlueriqChild, BlueriqChildren, BlueriqComponent } from '@blueriq/angular';
import { Button, Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
    selector: 'bq-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.MODAL,
})
export class ModalComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  container = inject(Container);


  dialogRef: MatDialogRef<Element>;

  @ViewChild('dialog', { static: true, read: TemplateRef })
  dialogTemplate: TemplateRef<Element>;

  @BlueriqChildren(Button, `.${BqPresentationStyles.MODAL_ACTION_BUTTON}`, { exclude: true })
  modalActionButtons: Button[];

  @BlueriqChild(Button, `.${BqPresentationStyles.MODAL_CLOSE_BUTTON}`, { exclude: true })
  modalCloseButton: Button;

  ngOnInit() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, { disableClose: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
