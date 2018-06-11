import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';

@Component({
  selector: 'app-percentage-field',
  templateUrl: '../input-field.component.html',
  styleUrls: ['./percentage.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=percentage]:not([hasDomain])'
})

export class PercentageFieldComponent extends InputFieldComponent {
  fieldsuffix = '%';
}
