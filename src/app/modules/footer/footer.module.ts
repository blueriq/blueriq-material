import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations:[FooterComponent],
  imports: [
    MatDividerModule,
  ],
  exports:[FooterComponent],
})
export class FooterModule{

}
