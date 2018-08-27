import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Self } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { Search } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';

@Component({
  templateUrl: './table.search.component.html',
  styleUrls: ['./table.search.component.scss'],
  providers: [Search],
})
@BlueriqComponent({
  type: Container,
  selector: '#searchContainer',
})
export class TableSearchComponent implements OnInit, OnUpdate {

  searchTerms: string[] = [];
  readonly separatorKeyCodes = [ENTER, COMMA];

  constructor(@Self() private readonly search: Search,
              public session: BlueriqSession) {
  }

  ngOnInit(): void {
    this.searchTerms = this.search.currentSearchTerms;
  }

  bqOnUpdate(): void {
    this.searchTerms = this.search.currentSearchTerms;
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

}
