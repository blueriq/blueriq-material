import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityType, GlobalLoadingActivity } from '@blueriq/angular';

import { LoadingComponent } from './loading.component';
import { LoadingModule } from './loading.module';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingActivity: GlobalLoadingActivity;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        LoadingModule,
      ],
      providers: [GlobalLoadingActivity],
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loadingActivity = TestBed.get(GlobalLoadingActivity);
  }));

  it('is idle when no loading activity', () => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    expect(state).toEqual('idle');
  });

  it('is starting when a session is starting', fakeAsync(() => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    loadingActivity.start(ActivityType.StartingSession);
    tick();
    expect(state).toEqual('starting');

    loadingActivity.stop(ActivityType.StartingSession);
    tick();
    expect(state).toEqual('idle');
  }));

  it('is loading on interaction activity', fakeAsync(() => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    loadingActivity.start(ActivityType.Interaction);
    expect(state).toEqual('idle');

    tick(400);
    expect(state).toEqual('loading');

    loadingActivity.stop(ActivityType.Interaction);

    tick();
    expect(state).toEqual('idle');
  }));

  it('is loading during field refreshes', fakeAsync(() => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    loadingActivity.start(ActivityType.FieldRefresh);
    expect(state).toEqual('idle');

    tick(400);
    expect(state).toEqual('loading');

    loadingActivity.stop(ActivityType.FieldRefresh);

    tick();
    expect(state).toEqual('idle');
  }));

});
