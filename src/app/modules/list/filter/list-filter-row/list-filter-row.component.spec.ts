import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableFilterModule } from '../table.filter.module';
import { FilterCandidate } from '../types';

import { ListFilterRowComponent } from './list-filter-row.component';

describe('ListFilterRowComponent', () => {
  let component: ListFilterRowComponent;
  let fixture: ComponentFixture<ListFilterRowComponent>;

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
    fixture = TestBed.createComponent(ListFilterRowComponent);
    component = fixture.componentInstance;
    component.candidate = new FilterCandidate();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
