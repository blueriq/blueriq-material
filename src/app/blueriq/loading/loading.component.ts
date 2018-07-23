import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@blueriq/angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { timer } from 'rxjs/observable/timer';
import { debounce, map } from 'rxjs/operators';

@Component({
  selector: 'bq-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('state', [
      state('loading, starting', style({ display: 'inline' })),
      state('idle', style({ display: 'none' }))
    ])
  ]
})
export class LoadingComponent implements OnInit, OnDestroy {

  state$: Observable<'starting' | 'loading' | 'idle'>;
  starting$ = new BehaviorSubject<boolean>(true);

  constructor(private loadingService: LoadingService) {
  }

  onInitialize(): void {
    this.starting$.next(false);
  }

  ngOnInit(): void {
    this.state$ = combineLatest(this.starting$, this.loadingService.loading$).pipe(
      debounce(([isStarting, isLoading]) => timer(isStarting ? 0 : isLoading ? 400 : 0)),
      map(([isStarting, isLoading]) => isStarting ? 'starting' : isLoading ? 'loading' : 'idle')
    );
  }

  ngOnDestroy(): void {
    this.starting$.complete();
    this.starting$.unsubscribe();
  }
}
