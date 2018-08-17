import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { getFieldMessages } from '@blueriq/angular/forms';

/**
 * This ErrorStateMatcher determines that a field is in an error state when:
 * * the field is invalid and it is touched, or
 * * the field is invalid and the form in which the field is included is submitted, or
 * * the field contains Blueriq validation messages
 */
export class BqErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && (
        (
          control.invalid &&
          (control.touched || (form && form.submitted))
        ) ||
        getFieldMessages(control).hasErrors)
    );
  }
}
