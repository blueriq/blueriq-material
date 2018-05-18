import { Component, OnInit, Host, Input } from '@angular/core';
import { Field } from '@blueriq/core';

@Component({
  selector: 'bq-mat-field-characteristics',
  templateUrl: './field-characteristics.component.html',
  styleUrls: ['./field-characteristics.component.css']
})
export class FieldCharacteristicsComponent {
  @Input() field:Field;
}
