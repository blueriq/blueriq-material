import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BlueriqTestingModule} from '@blueriq/angular/testing';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {ProjectComponent} from './blueriq/project/project.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProjectComponent
      ],
      imports: [
        BlueriqTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
