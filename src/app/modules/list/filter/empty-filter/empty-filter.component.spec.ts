import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterModule } from '../filter.module';

import { EmptyFilterComponent } from './empty-filter.component';

describe('EmptyFilterComponent', () => {
  let component: EmptyFilterComponent;
  let fixture: ComponentFixture<EmptyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FilterModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(EmptyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
