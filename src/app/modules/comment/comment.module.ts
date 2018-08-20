import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatDividerModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { CommentListComponent } from './list/comment.list.component';

const COMMENT_COMPONENTS = [
  CommentListComponent
];

@NgModule({
  declarations: [
    COMMENT_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(COMMENT_COMPONENTS)
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatListModule,
    MatCardModule
  ],
  exports: [COMMENT_COMPONENTS]
})

export class CommentModule {
}
