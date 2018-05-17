import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCharacteristicsComponent } from './field-characteristics.component';

describe('FieldCharacteristicsComponent', () => {
  let component: FieldCharacteristicsComponent;
  let fixture: ComponentFixture<FieldCharacteristicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCharacteristicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
