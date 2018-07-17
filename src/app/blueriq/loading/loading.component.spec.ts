import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqTestingModule } from '@blueriq/angular/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MaterialModule } from '../material/material.module';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule,
        FormattingModule.forRoot()
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function ngOnDestroy should be complete and unsubscribe', () => {
    // Init
    spyOn(BehaviorSubject.prototype, 'complete');
    spyOn(BehaviorSubject.prototype, 'unsubscribe');

    // Sut
    component.ngOnDestroy();

    // Verify
    expect(BehaviorSubject.prototype.complete).toHaveBeenCalled();
    expect(BehaviorSubject.prototype.unsubscribe).toHaveBeenCalled();
  });

  it('function onInitialize should be done starting', () => {
    // Init
    spyOn(BehaviorSubject.prototype, 'next');

    // Sut
    component.onInitialize();

    // Verify
    expect(BehaviorSubject.prototype.next).toHaveBeenCalledWith(false);
  });
});
