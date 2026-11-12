import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CaseAwareService } from '@shared/dcm/case-aware.service';
import { TaskAwareService } from '@shared/dcm/task-aware.service';
import { LiveUpdatesEffect } from '@shared/effects/live-updates/live-updates.effect';
import { MessagesEffect } from '@shared/effects/messages/messages.effect';
import { ValidationEffect } from '@shared/effects/validation/validation.effect';

export function provideBqEffects(): EnvironmentProviders {
  return importProvidersFrom(
    EffectsModule.forFeature([
      MessagesEffect,
      ValidationEffect,
      LiveUpdatesEffect,
      CaseAwareService,
      TaskAwareService,
    ]),
  );
}
