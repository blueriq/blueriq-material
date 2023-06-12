import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MenuModule } from '../../modules/menu/menu.module';
import { DashboardHeaderComponent } from './dashboard-header.component';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';

@NgModule({
  declarations: [
    DashboardMenuComponent,
    DashboardHeaderComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        FlexModule,
        MatButtonModule,
        MenuModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
    ],
  exports: [
    DashboardHeaderComponent
  ],
})
export class DashboardHeaderModule {

}
