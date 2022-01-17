import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InvalidFormAction } from '@blueriq/angular/forms';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { ValidationEffect } from './validation.effect';

describe('ValidationEffect', () => {
  let actions: Subject<any>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let effects: ValidationEffect;

  beforeEach(async() => {
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    actions = new Subject();

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      providers: [
        ValidationEffect,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    effects = TestBed.inject(ValidationEffect);
  });

  describe('errors', () => {
    it('opens snackbar with an error message', () => {
      const action = new InvalidFormAction('Main', true, false, 'There are validation errors on the page');

      effects.invalidForm$.subscribe();
      actions.next(action);

      expect(snackBarSpy.open).toHaveBeenCalledWith('There are validation errors on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-error',
      });
    });

    it('opens snackbar with an error message when no message is present', () => {
      const action = new InvalidFormAction('Main', true, false, undefined);

      effects.invalidForm$.subscribe();
      actions.next(action);

      expect(snackBarSpy.open).toHaveBeenCalledWith('There are validation errors on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-error',
      });
    });
  });

  describe('warnings', () => {
    it('opens snackbar with a warning message', () => {
      const action = new InvalidFormAction('Main', false, true, 'There are validation warnings on the page');

      effects.invalidForm$.subscribe();
      actions.next(action);

      expect(snackBarSpy.open).toHaveBeenCalledWith('There are validation warnings on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-warning',
      });
    });

    it('opens snackbar with a warning message when no message is present', () => {
      const action = new InvalidFormAction('Main', false, true, undefined);

      effects.invalidForm$.subscribe();
      actions.next(action);

      expect(snackBarSpy.open).toHaveBeenCalledWith('There are validation warnings on the page', undefined, {
        duration: 5000,
        panelClass: 'snackbar-warning',
      });
    });
  });

  it('does not do anything when no errors or warnings', () => {
    const action = new InvalidFormAction('Main', false, false, 'There are validation warnings on the page');

    effects.invalidForm$.subscribe();
    actions.next(action);

    expect(snackBarSpy.open).not.toHaveBeenCalled();
  });

});
