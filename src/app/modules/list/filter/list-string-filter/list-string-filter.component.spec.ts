import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStringFilterComponent } from './list-string-filter.component';

describe('ListStringFilterComponent', () => {
  let component: ListStringFilterComponent;
  let fixture: ComponentFixture<ListStringFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListStringFilterComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
