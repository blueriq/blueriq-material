import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetails } from '@blueriq/angular';
import { SessionId } from '@blueriq/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ErrorService } from '../error/error.service';

@Component({
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  sessionId: Observable<SessionId>;
  shortcut: Observable<string>;
  version: Observable<string>;
  project: Observable<string>;
  flow: Observable<string>;
  languageCode: Observable<string>;

  constructor(private readonly route: ActivatedRoute,
              private errorService: ErrorService) {
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
  }

  onSessionExpired() {
    this.errorService.emitError({
      errorType: 'SESSION_EXPIRED',
      title: 'Session expired',
      message: 'Your session has expired'
    });
  }

  onFlowEnded() {
    this.errorService.emitError({
      errorType: 'FLOW_ENDED',
      title: 'Flow ended',
      message: 'The flow has ended'
    });
  }

  onUnauthorized(details: ProjectDetails) {
    this.errorService.emitError({
      errorType: 'UNAUTHORIZED',
      title: 'Unauthorized',
      message: 'You are not authorized to ' + details.resource
    });
  }
}


