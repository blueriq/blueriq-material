import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
