import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { NotificationOverlayComponent } from './notification-overlay.component';
import { NotificationOverlayModule } from './notification-overlay.module';
import { NotificationModel, NotificationType } from './notification.model';

describe('NotificationOverlayComponent', () => {
  let component: NotificationOverlayComponent;
  let fixture: ComponentFixture<NotificationOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationOverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationOverlayComponent);
    component = fixture.componentInstance;
  });

  it('should display the notification title, message and details', () => {
    component.notification = new NotificationModel(
      NotificationType.Error,
      'Oops!',
      'An unknown error occurred',
      'Some stack trace',
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.title').textContent).toEqual('Oops!');
    expect(fixture.nativeElement.querySelector('.message').textContent).toEqual('An unknown error occurred');
    expect(fixture.nativeElement.querySelector('.details').textContent).toEqual('Some stack trace');
  });

  it('should render dismiss button when dismiss action is set', () => {
    let dismissed = false;
    component.notification = new NotificationModel(
      NotificationType.Error,
      'Not found',
      'Unknown flow: Demo',
    );
    component.notification.dismiss = {
      label: 'Dismiss',
      action(): void {
        dismissed = true;
      },
    };
    fixture.detectChanges();

    const dismissButton = fixture.debugElement.query(By.directive(MatButton));
    expect(dismissButton).toBeTruthy();

    dismissButton.nativeElement.click();

    expect(dismissed).toBe(true);
  });

  it('should be able to render as session expired', () => {
    component.notification = new NotificationModel(
      NotificationType.SessionExpired,
      'Session Expired',
      'Your session has expired',
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.notification-error')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.notification-expired')).toBeTruthy();
  });

});
