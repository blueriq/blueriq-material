import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BlueriqTestingModule } from '@blueriq/angular/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './blueriq/material/material/material.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BlueriqTestingModule,
        MaterialModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
