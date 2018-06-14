import { Component, Host, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

export let MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: '',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

// export class MyDateFormat implements MatDateFormats {
//   pattern;
//   parse: {
//     dateInput: this.pattern;
//   };
//   display: {
//     dateInput: 'DD-MM-YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: '',
//     monthYearA11yLabel: 'MMMM YYYY'
//   };
//
//   constructor(private readonly session: BlueriqSession) {
//     this.pattern = session.language.patterns.date;
//   }
// }

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: languageCode },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=date]'
})

export class DatepickerComponent implements OnInit {

  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder, private readonly session: BlueriqSession, private adapter: DateAdapter<any>/*, private formats: MatDateFormats*/) {
    if (session.language.languageCode !== undefined) {
      this.adapter.setLocale(session.language.languageCode);
    }
    // formats.parse.dateInput = session.language.patterns.date;
    // formats.display.dateInput = session.language.patterns.date;
    // formats.display.dateA11yLabel = session.language.patterns.date;
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
