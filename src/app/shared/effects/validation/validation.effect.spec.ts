import { async, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonPressHandledAction } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { Button, Field } from '@blueriq/core';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs/Subject';
import { ValidationEffect } from './validation.effect';

describe('ValidationsComponent', () => {
  let actions: Subject<any>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let effects: ValidationEffect;

  beforeEach(async(() => {
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    actions = new Subject();

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule
      ],
      providers: [
        ValidationEffect,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    effects = TestBed.get(ValidationEffect);
  }));

  it('opens snackbar with an error message', () => {
    let buttonElement: Button;
    const container = ContainerTemplate.create().children(
      FieldTemplate.text().error('This is an error'),
      ButtonTemplate.create().validate(true).assign(el => buttonElement = el)
    );

    BlueriqSessionTemplate.create().build(container);

    const action = new ButtonPressHandledAction('session-name', buttonElement!.functionalKey);

    effects.buttonHandled$.subscribe();

    actions.next(action);

    expect(snackBarSpy.open).toHaveBeenCalledWith('There are validation errors on the page', undefined, {
      duration: 5000,
      panelClass: 'snackbar-error'
    });
  });

  it('opens snackbar with a warning message', () => {
    let buttonElement: Button;
    const container = ContainerTemplate.create().children(
      FieldTemplate.text().warning('This is a warning'),
      ButtonTemplate.create().validate(true).assign(el => buttonElement = el)
    );

    BlueriqSessionTemplate.create().build(container);

    const action = new ButtonPressHandledAction('session-name', buttonElement!.functionalKey);

    effects.buttonHandled$.subscribe();

    actions.next(action);

    expect(snackBarSpy.open).toHaveBeenCalledWith('There are validation warnings on the page', undefined, {
      duration: 5000,
      panelClass: 'snackbar-warning'
    });
  });

  it('should not open a snackbar because there is no validation', () => {
    let buttonElement: Button;
    const container = ContainerTemplate.create().children(
      ButtonTemplate.create().validate(true).assign(el => buttonElement = el)
    );

    BlueriqSessionTemplate.create().build(container);

    const action = new ButtonPressHandledAction('session-name', buttonElement!.functionalKey);

    effects.buttonHandled$.subscribe();

    actions.next(action);

    expect(snackBarSpy.open).not.toHaveBeenCalled();
  });

  it('should not open a snackbar because the button does not has validate', () => {
    let buttonElement: Button;
    const container = ContainerTemplate.create().children(
      FieldTemplate.text().warning('This is a warning'),
      ButtonTemplate.create().validate(false).assign(el => buttonElement = el)
    );

    BlueriqSessionTemplate.create().build(container);

    const action = new ButtonPressHandledAction('session-name', buttonElement!.functionalKey);

    effects.buttonHandled$.subscribe();

    actions.next(action);

    expect(snackBarSpy.open).not.toHaveBeenCalledWith();
  });

  it('should not open a snackbar because the action element was not a button', () => {
    let fieldElement: Field;
    const container = ContainerTemplate.create().children(
      FieldTemplate.text().warning('This is a warning'),
      FieldTemplate.text().assign(el => fieldElement = el)
    );

    BlueriqSessionTemplate.create().build(container);

    const action = new ButtonPressHandledAction('session-name', fieldElement!.functionalKey);

    effects.buttonHandled$.subscribe();

    actions.next(action);

    expect(snackBarSpy.open).not.toHaveBeenCalledWith();
  });
});
