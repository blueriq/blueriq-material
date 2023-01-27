import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterModule } from '../modules/footer/footer.module';
import { DashboardComponent } from './dashboard.component';

describe('Dashboard Component', () => {

  let component: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterModule],
      declarations: [DashboardComponent],
    }).compileComponents();
    component = TestBed.createComponent(DashboardComponent);

  });

  it('should display a footer', () => {
    component.detectChanges();
    expect(component.debugElement.query(By.css('bq-footer'))).not.toBeNull();
  });

});
