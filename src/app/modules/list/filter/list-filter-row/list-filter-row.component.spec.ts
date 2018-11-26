import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterRowComponent } from './list-filter-row.component';

describe('ListFilterRowComponent', () => {
  let component: ListFilterRowComponent;
  let fixture: ComponentFixture<ListFilterRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListFilterRowComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
