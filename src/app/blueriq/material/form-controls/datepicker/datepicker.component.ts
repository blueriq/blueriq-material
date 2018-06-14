import { Component, Host, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

export function dateFormatFactory(session: BlueriqSession): MatDateFormats {

  return {
    parse: {
      dateInput: session.language.patterns.date.toUpperCase()
    },
    display: {
      dateInput: session.language.patterns.date.toUpperCase(),
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: session.language.patterns.date.toUpperCase(),
      monthYearA11yLabel: 'MMMM YYYY'
    }
  };
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: dateFormatFactory,
      deps: [BlueriqSession]
    }
  ]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=date]'
})
export class DatepickerComponent implements OnInit {

  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder,
              private readonly session: BlueriqSession,
              private adapter: DateAdapter<any>) {
    if (session.language.languageCode !== undefined) {
      this.adapter.setLocale(session.language.languageCode);
    }
  }

  ngOnInit(): void {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
    this.formControl.setValue(this.field.getValue());
  }

  /** Whether the select has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the string field is read only */
  isReadonly() {
    return this.field.readonly;
  }

}
