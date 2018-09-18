import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { DomainValueTransformer } from './domain-value-transformer';

@Component({
  selector: 'bq-autocomplete',
  templateUrl: './autocomplete.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '.' + BqPresentationStyles.AUTOCOMPLETE + '[hasDomain][multiValued=false]'
})
export class AutocompleteComponent implements OnInit {
  formControl = this.form.control(this.field, {
    syncOn: 'update',
    disableWhen: BqPresentationStyles.DISABLED,
    transformer: DomainValueTransformer
  });
  filteredDomainOptions$: Observable<DomainValue[]>;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  ngOnInit() {
    // The possible domain options will be filtered based on the string value from the input field
    this.filteredDomainOptions$ = this.formControl.valueChanges
    .pipe(
      startWith<DomainValue | string>(''),
      map(value => this.displayDomainValue(value)),
      map(displayValue => displayValue ? this.filter(displayValue) : this.field.domain.options.slice())
    );
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  displayDomainValue(value: DomainValue | string | null): string | null {
    if (value === null) {
      return null;
    }
    return typeof value === 'string' ? value : value.displayValue;
  }

  /**
   * Checks if the value of the autocomplete input is valid within the fields' domain.
   * If that is not the case, reset the input value
   * @param event the event that is dispatched when the autocomplete input value is changed (blur)
   */
  checkValidOption(event): void {
    if (event && event.target && event.target.value) {
      if (this.field.domain.getValue(event.target.value) === undefined) {
        event.target.value = null;
      }
    }
  }

  private filter(displayValue: string): DomainValue[] {
    const filterValue = displayValue.toLowerCase();

    return this.field.domain.options.filter(option => option.displayValue.toLowerCase().includes(filterValue));
  }
}
