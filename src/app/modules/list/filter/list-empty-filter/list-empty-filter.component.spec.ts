import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmptyFilterComponent } from './list-empty-filter.component';

describe('ListEmptyFilterComponent', () => {
  let component: ListEmptyFilterComponent;
  let fixture: ComponentFixture<ListEmptyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListEmptyFilterComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmptyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
