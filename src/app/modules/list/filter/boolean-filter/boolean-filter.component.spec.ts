import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BooleanPredicate, ColumnFilter } from '@blueriq/angular/lists';
import { FilterModule } from '../filter.module';
import { FilterCandidate } from '../types';

import { BooleanFilterComponent } from './boolean-filter.component';

describe('BooleanFilterComponent', () => {
  let component: BooleanFilterComponent;
  let fixture: ComponentFixture<BooleanFilterComponent>;
  const columnFilter: ColumnFilter = {} as ColumnFilter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FilterModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BooleanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('new boolean filter default shows true and unknown', () => {
    component.candidate = new FilterCandidate();
    fixture.detectChanges();

    const operation = fixture.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(operation).toBe('Only Yes');
    const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(checkbox).toBe('true');
  });

  it('boolean filter with show true and false and unknown', () => {
    const filterCandidate = new FilterCandidate({
      column: columnFilter,
      predicate: { showFalse: true, showTrue: true, showUnknown: true } as BooleanPredicate,
    });
    component.candidate = filterCandidate;
    fixture.detectChanges();

    const operation = fixture.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(operation).toBe('Show Both');
    const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(checkbox).toBe('true');
  });

  it('boolean filter with show false and not show unknown', () => {
    const filterCandidate = new FilterCandidate({
      column: columnFilter,
      predicate: { showFalse: true, showTrue: false, showUnknown: false } as BooleanPredicate,
    });
    component.candidate = filterCandidate;
    fixture.detectChanges();

    const operation = fixture.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(operation).toBe('Only No');
    const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(checkbox).toBe('false');
  });

  it('boolean filter with show ony unknown', () => {
    const filterCandidate = new FilterCandidate({
      column: columnFilter,
      predicate: { showFalse: false, showTrue: false, showUnknown: true } as BooleanPredicate,
    });
    component.candidate = filterCandidate;
    fixture.detectChanges();

    const operation = fixture.nativeElement.querySelector('.mat-select-value-text').innerText;
    expect(operation).toBe('Show Neither');
    const checkbox = fixture.nativeElement.querySelector('.mat-checkbox-input').getAttribute('aria-checked');
    expect(checkbox).toBe('true');
  });
});
