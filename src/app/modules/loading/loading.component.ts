import { state, style, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { ActivityType, GlobalLoadingActivity } from '@blueriq/angular';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'bq-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    animations: [
        trigger('state', [
            state('loading, starting', style({ display: 'inline' })),
            state('idle', style({ display: 'none' })),
        ]),
    ],
    standalone: false
})
export class LoadingComponent implements OnInit {
  private readonly loadingActivity = inject(GlobalLoadingActivity);


  state$: Observable<'starting' | 'loading' | 'idle'>;

  ngOnInit(): void {
    const startingSession$ = this.loadingActivity.isActive(ActivityType.StartingSession);
    const interaction$ = this.loadingActivity.isActiveWithDelay(ActivityType.Interaction, 400);
    const fieldRefresh$ = this.loadingActivity.isActiveWithDelay(ActivityType.FieldRefresh, 400);

    this.state$ = combineLatest([startingSession$, interaction$, fieldRefresh$]).pipe(
      map(([isStarting, interaction, fieldRefresh]) => isStarting ? 'starting' : interaction || fieldRefresh ? 'loading' : 'idle'),
    );
  }
}
