import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDomainFilterComponent } from './list-domain-filter.component';

describe('ListDomainFilterComponent', () => {
  let component: ListDomainFilterComponent;
  let fixture: ComponentFixture<ListDomainFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ListDomainFilterComponent],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDomainFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
