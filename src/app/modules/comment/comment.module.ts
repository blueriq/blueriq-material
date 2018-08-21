import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { CommentComponent } from './comment.component';
import { CommentListComponent } from './list/comment.list.component';

const COMMENT_COMPONENTS = [
  CommentComponent,
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
    ReactiveFormsModule,
    BlueriqModule.forRoot(),
    FlexLayoutModule,

    /* Material modules */
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports: [COMMENT_COMPONENTS]
})

export class CommentModule {
}
