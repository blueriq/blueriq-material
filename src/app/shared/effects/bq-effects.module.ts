import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffect } from '@shared/effects/messages/messages.effect';
import { ValidationEffect } from '@shared/effects/validation/validation.effect';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      MessagesEffect,
      ValidationEffect,
    ]),

    /* Material Modules */
    MatSnackBarModule, // used in validation.effect & messages.effect
  ],
})
export class BqEffectsModule {
}
