import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { DomainValueTransformer } from './domain-value-transformer';

@Component({
    selector: 'bq-autocomplete',
    templateUrl: './autocomplete.component.html',
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain][multiValued=false].' + BqPresentationStyles.AUTOCOMPLETE,
})
export class AutocompleteComponent implements OnInit {
  field = inject(Field);
  private readonly form = inject(BlueriqFormBuilder);


  @HostBinding('class.fx-flex-row')

  formControl = this.form.control(this.field, {
    syncOn: 'update',
    disableWhen: BqPresentationStyles.DISABLED,
    transformer: DomainValueTransformer,
  });
  filteredDomainOptions$: Observable<DomainValue[]>;

  ngOnInit() {
    // The possible domain options will be filtered based on the string value from the input field
    this.filteredDomainOptions$ = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  toDisplayValue(value: DomainValue | string | null): string | null {
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

  private filter(value: DomainValue | string): DomainValue[] {
    const displayValue = this.toDisplayValue(value);
    const filterValue = (displayValue || '').toLowerCase();

    return this.field.domain.options.filter(option => option.displayValue.toLowerCase().includes(filterValue));
  }
}
