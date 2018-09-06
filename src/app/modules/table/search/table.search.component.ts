import { animate, style, transition, trigger } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { Search } from '@blueriq/angular/lists';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bq-table-search',
  templateUrl: './table.search.component.html',
  styleUrls: ['./table.search.component.scss'],
  // providers: [Search],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ maxWidth: '0px' }),
        animate(300, style({ maxWidth: '*' }))
      ]),
      transition(':leave', [
        style({ maxWidth: '*' }),
        animate(300, style({ maxWidth: '0px' }))
      ])
    ])
  ]
})
// @BlueriqComponent({
//   type: Container,
//   selector: '#searchContainer'
// })
export class TableSearchComponent implements OnInit, OnDestroy {

  @ViewChild('inputField')
  inputField: ElementRef;

  opened = false;
  searchTerms: string[] = [];
  readonly separatorKeyCodes = [ENTER, COMMA];
  @Input()
  public readonly search: Search;
  private subscription: Subscription;

  // constructor(@Self() public readonly search: Search) {
  // }

  ngOnInit(): void {
    this.subscription = this.search.searchTerms$.subscribe((updatedSearchTerms) => {
      this.searchTerms = updatedSearchTerms;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const sanitizedValue = (value || '').trim();

    if (sanitizedValue && !this.searchTerms.map(x => x.toLowerCase()).includes(sanitizedValue.toLowerCase())) {
      this.searchTerms.push(sanitizedValue);
    }

    // Reset the input field value
    if (input) {
      input.value = '';
    }

    this.doSearch();
  }

  remove(searchTerm: string): void {
    this.searchTerms = this.searchTerms.filter(t => t.toLowerCase() !== searchTerm.toLowerCase());
    this.doSearch();
  }

  doSearch(): void {
    this.search.search(this.searchTerms);
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
