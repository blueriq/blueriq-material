import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBooleanFilterComponent } from './list-boolean-filter.component';

describe('ListBooleanFilterComponent', () => {
  let component: ListBooleanFilterComponent;
  let fixture: ComponentFixture<ListBooleanFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListBooleanFilterComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBooleanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
