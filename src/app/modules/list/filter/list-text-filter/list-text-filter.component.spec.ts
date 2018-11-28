import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInput } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextPredicate } from '@blueriq/angular/lists';
import { TableFilterModule } from '../table.filter.module';
import { FilterCandidate } from '../types';

import { ListTextFilterComponent } from './list-text-filter.component';

describe('ListStringFilterComponent', () => {
  let component: ListTextFilterComponent;
  let fixture: ComponentFixture<ListTextFilterComponent>;
  let candidate: FilterCandidate;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TableFilterModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTextFilterComponent);
    component = fixture.componentInstance;
    candidate = component.candidate = new FilterCandidate();
    fixture.detectChanges();
  });

  it('input text should result in predicate value being set', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.directive(MatInput)).nativeElement;
    input.value = 'text';
    input.dispatchEvent(new Event('change'));
    expect((candidate.predicate as TextPredicate).text).toBe('text');
  });
});
