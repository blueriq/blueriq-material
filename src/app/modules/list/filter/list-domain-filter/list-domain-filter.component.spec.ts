import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FieldTemplate } from '@blueriq/core/testing';
import { TableFilterModule } from '../table.filter.module';

import { ListDomainFilterComponent } from './list-domain-filter.component';

describe('ListDomainFilterComponent', () => {
  let component: ListDomainFilterComponent;
  let fixture: ComponentFixture<ListDomainFilterComponent>;

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
    fixture = TestBed.createComponent(ListDomainFilterComponent);
    component = fixture.componentInstance;
    component.domain = FieldTemplate.text().domain({ key: 'value' }).build().domain;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
