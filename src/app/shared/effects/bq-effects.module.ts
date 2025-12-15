import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { CaseAwareService } from '@shared/dcm/case-aware.service';
import { TaskAwareService } from '@shared/dcm/task-aware.service';
import { LiveUpdatesEffect } from '@shared/effects/live-updates/live-updates.effect';
import { MessagesEffect } from '@shared/effects/messages/messages.effect';
import { ValidationEffect } from '@shared/effects/validation/validation.effect';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      MessagesEffect,
      ValidationEffect,
      LiveUpdatesEffect,
      CaseAwareService,
      TaskAwareService,
    ]),

    /* Material Modules */
    MatSnackBarModule, // used in validation.effect & messages.effect
    ToastrModule,
  ],
})
export class BqEffectsModule {
}
