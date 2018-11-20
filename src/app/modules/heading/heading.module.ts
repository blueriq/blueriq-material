import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { SharedModule } from '@shared/shared.module';
import { HeadingComponent } from './heading.component';

@NgModule({
  declarations: [HeadingComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
  ],
  exports: [HeadingComponent],
})
export class HeadingModule {
}
