import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { NavigationItemComponent } from './navigation-item.component';

@NgModule({
  declarations: [
    NavigationItemComponent,
  ],
  providers: [
    BlueriqComponents.register([NavigationItemComponent]),
  ],
  imports: [
    BlueriqCommonModule,
    SharedModule,
    FlexLayoutModule,

    /* Material modules */
    MatLegacyButtonModule,
    MatIconModule,
  ],
  exports: [NavigationItemComponent],
})
export class NavigationItemModule {
}
