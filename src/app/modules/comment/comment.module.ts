import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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
