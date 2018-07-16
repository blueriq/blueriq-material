import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [FlexLayoutModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.error = {
      errorType: 'NOT_FOUND',
      title: 'Not found',
      message: 'Unknown flow: Demo',
      details: 'Some stack trace'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.error-button')).toBeFalsy();
  });

  it('should be closable', () => {
    component.closable = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.error-button')).toBeTruthy();
  });

  it('should close', () => {
    spyOn(component.closed, 'emit');
    component.closable = true;
    fixture.detectChanges();

    component.close();
    expect(component.closed.emit).toHaveBeenCalledTimes(1);

  });

});
