import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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

    /* Material modules */
    MatButtonModule,
    MatIconModule,
  ],
  exports: [NavigationItemComponent],
})
export class NavigationItemModule {
}
