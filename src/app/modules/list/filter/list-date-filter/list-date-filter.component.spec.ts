import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { LocalizationTemplate } from '@blueriq/core/testing';
import { TableFilterModule } from '../table.filter.module';

import { ListDateFilterComponent } from './list-date-filter.component';

describe('ListDateFilterComponent', () => {
  let component: ListDateFilterComponent;
  let session: BlueriqSession;
  let fixture: ComponentFixture<ListDateFilterComponent>;

  beforeEach(async(() => {
    session = { localization: LocalizationTemplate.create().build() } as BlueriqSession;
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TableFilterModule,
      ],
      providers: [
        { provide: BlueriqSession, useValue: session },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
