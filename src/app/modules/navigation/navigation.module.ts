import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { NavigationItemModule } from './navigation-item/navigation-item.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  providers: [
    BlueriqComponents.register([NavigationComponent]),
  ],
  imports: [
    BlueriqCommonModule,
    CommonModule,
    SharedModule,
    NavigationItemModule,
    FlexLayoutModule,
  ],
  exports: [NavigationComponent],
})
export class NavigationModule {
}
