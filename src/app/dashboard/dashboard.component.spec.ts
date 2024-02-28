import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('Dashboard Component', () => {

  let component: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
    }).compileComponents();

    component = TestBed.createComponent(DashboardComponent);
  });

  it('should create dashboard component', () => {
    component.detectChanges();
    expect(component.debugElement).not.toBeNull();
  });
});
