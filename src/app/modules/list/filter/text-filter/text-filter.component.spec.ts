import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatInput } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextPredicate } from '@blueriq/angular/lists';
import { FilterModule } from '../filter.module';
import { FilterCandidate } from '../types';

import { TextFilterComponent } from './text-filter.component';

describe('TextFilterComponent', () => {
  let component: TextFilterComponent;
  let fixture: ComponentFixture<TextFilterComponent>;
  let candidate: FilterCandidate;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FilterModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TextFilterComponent);
    component = fixture.componentInstance;
    candidate = component.candidate = new FilterCandidate();
    fixture.detectChanges();
  }));

  it('input text should result in predicate value being set', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.directive(MatInput)).nativeElement;
    input.value = 'text';
    input.dispatchEvent(new Event('change'));
    expect((candidate.predicate as TextPredicate).text).toBe('text');
  });
});
