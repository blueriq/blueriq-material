
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BlueriqModule} from '@blueriq/angular';
import {V1BackendModule} from '@blueriq/angular/backend/v1';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {MaterialModule} from './material/material.module';

const COMPONENTS = [

]

@NgModule({
  declarations: [
    AppComponent,
    // COMPONENTS
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
   // BlueriqComponents.register(COMPONENTS)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
