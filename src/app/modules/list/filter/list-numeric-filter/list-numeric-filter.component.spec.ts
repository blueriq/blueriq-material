import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNumericFilterComponent } from './list-numeric-filter.component';

describe('ListNumericFilterComponent', () => {
  let component: ListNumericFilterComponent;
  let fixture: ComponentFixture<ListNumericFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListNumericFilterComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNumericFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
