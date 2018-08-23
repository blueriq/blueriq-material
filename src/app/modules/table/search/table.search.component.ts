import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Host, OnInit, Self } from '@angular/core';
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

  constructor(@Host() public container: Container,
              public session: BlueriqSession,
              @Self() private readonly search: Search) {
  }

  get caption() {
    return this.search.getCaption();
  }

  ngOnInit(): void {
    this.searchTerms = this.search.getCurrentSearchTerms();
  }

  bqOnUpdate(): void {
    this.searchTerms = this.search.getCurrentSearchTerms();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const sanitizedValue = (value || '').trim();

    if (sanitizedValue) {
      if (this.searchTerms.map(x => x.toLowerCase()).indexOf(sanitizedValue.toLowerCase()) === -1) {
        this.searchTerms.push(sanitizedValue);
      }
    }

    // Reset the input field value
    if (input) {
      input.value = '';
    }

    this.search.search(this.searchTerms);
  }

  remove(searchTerm: string): void {
    this.searchTerms = this.searchTerms.filter(t => t.toLocaleLowerCase() !== searchTerm.toLocaleLowerCase());
    this.search.search(this.searchTerms);
  }

  doSearch(): void {
    this.search.search(this.searchTerms);
  }

}
