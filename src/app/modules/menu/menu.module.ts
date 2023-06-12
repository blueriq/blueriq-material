import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';

const BQ_MENU_COMPONENTS = [
  MenuComponent,
];

@NgModule({
  declarations: [
    BQ_MENU_COMPONENTS,
    MenuItemComponent,
  ],
  providers: [
    BlueriqComponents.register(BQ_MENU_COMPONENTS),
  ],
  imports: [
    /* Basic */
    CommonModule,
    BlueriqCommonModule, // using: bqButton directive
    SharedModule,

    /* Material Modules */
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
    exports: [BQ_MENU_COMPONENTS, MenuItemComponent],
})
export class MenuModule {
}
