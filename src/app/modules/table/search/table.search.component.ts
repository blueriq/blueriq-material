import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { BlueriqComponent } from '@blueriq/angular';
import { Search } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './table.search.component.html',
  providers: [Search],
})
@BlueriqComponent({
  type: Container,
  selector: '#searchContainer',
})
export class TableSearchComponent implements OnInit, OnDestroy {

  searchTerms: string[] = [];
  readonly separatorKeyCodes = [ENTER, COMMA];
  private subscription: Subscription;

  constructor(@Self() public readonly search: Search) {
  }

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

    this.search.search(this.searchTerms);
  }

  remove(searchTerm: string): void {
    this.searchTerms = this.searchTerms.filter(t => t.toLowerCase() !== searchTerm.toLowerCase());
    this.search.search(this.searchTerms);
  }

  doSearch(): void {
    this.search.search(this.searchTerms);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
