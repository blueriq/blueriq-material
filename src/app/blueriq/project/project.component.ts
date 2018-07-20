import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetails } from '@blueriq/angular';
import { SessionId } from '@blueriq/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ErrorModel } from '../basic/error/error.model';
import { ErrorService } from '../basic/error/error.service';

@Component({
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

  sessionId: Observable<SessionId>;
  shortcut: Observable<string>;
  version: Observable<string>;
  project: Observable<string>;
  flow: Observable<string>;
  languageCode: Observable<string>;

  error: ErrorModel | null;
  private subscription: Subscription;

  constructor(private readonly route: ActivatedRoute,
              private readonly errorService: ErrorService) {
  }

  get sessionName(): string {
    const tab = this.route.snapshot.queryParams['tab'];

    return tab ? `Main-${tab}` : 'Main';
  }

  ngOnInit(): void {
    this.sessionId = this.route.paramMap.pipe(map(params => params.get('sessionId') || ''));
    this.shortcut = this.route.paramMap.pipe(map(params => params.get('shortcut') || ''));

    this.version = this.route.paramMap.pipe(map(params => params.get('version') || '0.0-Trunk'));
    this.project = this.route.paramMap.pipe(map(params => params.get('project') || ''));
    this.flow = this.route.paramMap.pipe(map(params => params.get('flow') || ''));
    this.languageCode = this.route.paramMap.pipe(map(params => params.get('languageCode') || ''));

    this.subscription = this.errorService.getError().subscribe((error) => {
      this.error = new ErrorModel(error.errorType, error.title, error.message);
    });
  }

  /** Call this method to clear the error and thus removing it from view */
  clearError(): void {
    this.error = null;
  }

  /** Handler for Session Expired events */
  onSessionExpired() {
    this.error = new ErrorModel(
      'SESSION_EXPIRED',
      'Session expired',
      'Your session has expired due to inactivity'
    );
  }

  /** Handler for Flow Ended events */
  onFlowEnded() {
    this.error = new ErrorModel(
      'FLOW_ENDED',
      'Flow ended',
      'The flow has ended'
    );
  }

  /** Handler for unauthorized events */
  onUnauthorized(details: ProjectDetails) {
    this.error = new ErrorModel(
      'UNAUTHORIZED',
      'Unauthorized',
      'You are not authorized to ' + JSON.stringify(details)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


