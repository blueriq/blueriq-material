import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDateFilterComponent } from './list-date-filter.component';

describe('ListDateFilterComponent', () => {
  let component: ListDateFilterComponent;
  let fixture: ComponentFixture<ListDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListDateFilterComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
