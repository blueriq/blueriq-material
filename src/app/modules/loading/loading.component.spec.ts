import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityType, GlobalLoadingActivity } from '@blueriq/angular';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingActivity: GlobalLoadingActivity;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      providers: [GlobalLoadingActivity],
    }).compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loadingActivity = TestBed.inject(GlobalLoadingActivity);
  });

  it('is idle when no loading activity', () => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    expect(state).toEqual('idle');
  });

  it('is starting when a session is starting', async () => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    loadingActivity.start(ActivityType.StartingSession);
    await vi.advanceTimersByTimeAsync(0);
    expect(state).toEqual('starting');

    loadingActivity.stop(ActivityType.StartingSession);
    await vi.advanceTimersByTimeAsync(0);
    expect(state).toEqual('idle');
  });

  it('is loading on interaction activity', async () => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    loadingActivity.start(ActivityType.Interaction);
    expect(state).toEqual('idle');

    await vi.advanceTimersByTimeAsync(400);
    expect(state).toEqual('loading');

    loadingActivity.stop(ActivityType.Interaction);

    await vi.advanceTimersByTimeAsync(0);
    expect(state).toEqual('idle');
  });

  it('is loading during field refreshes', async () => {
    let state!: string;
    component.state$.subscribe(s => state = s);

    loadingActivity.start(ActivityType.FieldRefresh);
    expect(state).toEqual('idle');

    await vi.advanceTimersByTimeAsync(400);
    expect(state).toEqual('loading');

    loadingActivity.stop(ActivityType.FieldRefresh);

    await vi.advanceTimersByTimeAsync(0);
    expect(state).toEqual('idle');
  });

});
