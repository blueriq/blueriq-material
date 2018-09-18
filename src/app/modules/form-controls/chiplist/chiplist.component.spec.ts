import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiplistComponent } from './chiplist.component';

describe('ChiplistComponent', () => {
  let component: ChiplistComponent;
  let fixture: ComponentFixture<ChiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
