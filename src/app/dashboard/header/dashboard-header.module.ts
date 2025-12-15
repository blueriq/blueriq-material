import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuModule } from '../../modules/menu/menu.module';
import { DashboardHeaderComponent } from './dashboard-header.component';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    DashboardMenuComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MenuModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
  ],
  exports: [
    DashboardHeaderComponent
  ],
})
export class DashboardHeaderModule {

}
