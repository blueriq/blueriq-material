import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { CommentComponent } from './comment.component';
import { CommentListComponent } from './list/comment.list.component';

const COMMENT_COMPONENTS = [
  CommentComponent,
  CommentListComponent,
];

@NgModule({
  declarations: [
    COMMENT_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(COMMENT_COMPONENTS),
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BlueriqCommonModule,
    FlexLayoutModule,
    SharedModule,
    HeadingModule,

    /* Material modules */
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [COMMENT_COMPONENTS],
})

export class CommentModule {
}
