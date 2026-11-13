import { animate, style, transition, trigger } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, input } from '@angular/core';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput } from '@angular/material/chips';
import { Search } from '@blueriq/angular/lists';
import { Subscription } from 'rxjs';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';
import { BlueriqCommonModule } from '@blueriq/angular';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'bq-table-search',
    templateUrl: './table.search.component.html',
    styleUrls: ['./table.search.component.scss'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ maxWidth: '0px' }),
                animate(300, style({ maxWidth: '*' })),
            ]),
            transition(':leave', [
                style({ maxWidth: '*' }),
                animate(300, style({ maxWidth: '0px' })),
            ]),
        ]),
    ],
    imports: [
      BqKeyDirective,
      BlueriqCommonModule,
      MatFormField,
      MatChipGrid,
      MatChipRow,
      MatIcon,
      MatChipRemove,
      MatChipInput,
      MatIconButton,
    ]
})
export class TableSearchComponent implements OnInit, OnDestroy {

  @ViewChild('inputField')
  inputField: ElementRef;

  readonly search = input.required<Search>();

  readonly separatorKeyCodes = [ENTER, COMMA];
  opened = false;
  searchTerms: string[] = [];
  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.search().searchTerms$.subscribe((updatedSearchTerms) => {
      this.searchTerms = updatedSearchTerms;
    });
  }

  add(event: MatChipInputEvent): void {
    const chipInput = event.chipInput;
    const value = event.value;

    const sanitizedValue = (value || '').trim();

    if (sanitizedValue && !this.searchTerms.map(x => x.toLowerCase()).includes(sanitizedValue.toLowerCase())) {
      this.searchTerms.push(sanitizedValue);
    }

    // Reset the input field value
    if (chipInput) {
      chipInput.clear();
    }

    this.doSearch();
  }

  remove(searchTerm: string): void {
    this.searchTerms = this.searchTerms.filter(t => t.toLowerCase() !== searchTerm.toLowerCase());
    this.doSearch();
  }

  doSearch(): void {
    this.search().search(this.searchTerms);
  }

  fieldIsVisible(): boolean {
    return this.opened || this.searchTerms.length > 0;
  }

  toggle(): void {
    this.opened = !this.opened;
    if (!this.opened && this.searchTerms.length > 0) {
      this.searchTerms = [];
      this.doSearch();
    }
  }

  focusField() {
    if (this.opened) {
      this.inputField.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
