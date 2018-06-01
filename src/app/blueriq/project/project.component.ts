import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionId } from '@blueriq/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {

  sessionId: Observable<SessionId>;
  shortcut: Observable<string>;
  version: Observable<string>;
  project: Observable<string>;
  flow: Observable<string>;

  constructor(private readonly route: ActivatedRoute) {
  }

  get sessionName(): string {
    const tab = this.route.snapshot.queryParams['tab'];

    return tab ? `Main-${tab}` : 'Main';
  }

  ngOnInit(): void {
    this.sessionId = this.route.paramMap.pipe(map(params => params.get('sessionId') || ''));
  }
}
