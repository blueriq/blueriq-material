import {APP_BASE_HREF} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {BlueriqComponents, BlueriqModule} from '@blueriq/angular';
import {V1BackendModule} from '@blueriq/angular/backend/v1';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {ContainerComponent} from "./container/container.component";
import {PageComponent} from "./page/page.component";
import {TextItemComponent} from "./textitem/textitem.component";
import {ButtonComponent} from "./button/button.component";
import { FieldComponent } from './field/field.component';

const COMPONENTS = [
  PageComponent,
  ContainerComponent,
  TextItemComponent,
  ButtonComponent,
  FieldComponent
]

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: '/Runtime',
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlueriqComponents.register(COMPONENTS),
    {provide: APP_BASE_HREF, useValue: (window as any)['_app_base'] || '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
