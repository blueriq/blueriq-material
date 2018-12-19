import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorType } from '@blueriq/core';
import { ErrorComponent } from './error.component';
import { ErrorModel } from './error.model';
import { ErrorModule } from './error.module';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorModule],
    });

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.error = new ErrorModel(
      ErrorType.NotFound,
      'Not found',
      'Unknown flow: Demo',
      'Some stack trace',
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('.button')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.severity-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.severity-notice')).toBeFalsy();
  });

  it('should render close button and emit dismiss event for a non fatal error', () => {
    spyOn(component.dismissed, 'emit').and.callThrough();
    component.error.isFatal = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.button')).toBeTruthy();

    component.dismiss();
    expect(component.dismissed.emit).toHaveBeenCalledTimes(1);
  });

  it('should render severity notice on session expired', () => {
    component.error = new ErrorModel(
      ErrorType.UnknownSession,
      'Session Expired',
      'Your session has expired',
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.severity-error')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.severity-notice')).toBeTruthy();
  });

  it('should display the proper error fields', () => {
    component.error = new ErrorModel(
      ErrorType.UnknownSession,
      'Session Expired',
      'Your session has expired',
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.title').textContent).toEqual('Session Expired');
    expect(fixture.nativeElement.querySelector('.message').textContent).toEqual('Your session has expired');
  });

});
