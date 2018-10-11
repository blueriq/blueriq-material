import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';

const BQ_MENU_COMPONENTS = [
  MenuComponent
];

@NgModule({
  declarations: [
    BQ_MENU_COMPONENTS,
    MenuItemComponent
  ],
  providers: [
    BlueriqComponents.register(BQ_MENU_COMPONENTS)
  ],
  imports: [
    /* Basic */
    CommonModule,
    BlueriqCommonModule, // using: bqButton directive

    /* Material Modules */
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [BQ_MENU_COMPONENTS]
})
export class MenuModule {
}
