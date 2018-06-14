import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { V1BackendModule } from '@blueriq/angular/backend/v1';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ElementComponent } from './blueriq/generic/element/element.component';
import { ContainerComponent } from './blueriq/material/container/container.component';
import { MomentTransformer } from './blueriq/material/datetime/datetime';
import { ButtonComponent } from './blueriq/material/form-controls/button/button.component';
import { CheckboxComponent } from './blueriq/material/form-controls/checkbox/checkbox.component';
import { DatepickerComponent } from './blueriq/material/form-controls/datepicker/datepicker.component';
import { CurrencyFieldComponent } from './blueriq/material/form-controls/input-field/currency/currency.component';
import { IntegerFieldComponent } from './blueriq/material/form-controls/input-field/integer/integer.component';
import { NumberFieldComponent } from './blueriq/material/form-controls/input-field/number/number.component';
import { PercentageFieldComponent } from './blueriq/material/form-controls/input-field/percentage/percentage.component';
import { StringFieldComponent } from './blueriq/material/form-controls/input-field/string/string.component';
import { RadioButtonComponent } from './blueriq/material/form-controls/radio-button/radio-button.component';
import { SelectComponent } from './blueriq/material/form-controls/select/select.component';
import { SlideToggleComponent } from './blueriq/material/form-controls/slide-toggle/slide-toggle.component';
import { MaterialModule } from './blueriq/material/material/material.module';
import { PageComponent } from './blueriq/material/page/page.component';
import { PresentationStyles } from './blueriq/material/presentationstyles/presentationstyles';
import { TextItemComponent } from './blueriq/material/textitem/textitem.component';
import { ProjectComponent } from './blueriq/project/project.component';

const routes: Routes = [
  { path: 'session/:sessionId', component: ProjectComponent },
  { path: 'shortcut/:shortcut', component: ProjectComponent },
  { path: 'flow/:project/:flow', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version/:languageCode', component: ProjectComponent },
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' }
];

const BASE_URL = '/Runtime';

const BQ_COMPONENTS = [
  PageComponent,
  ContainerComponent,
  TextItemComponent,
  ButtonComponent,
  SelectComponent,
  DatepickerComponent,
  CheckboxComponent,
  RadioButtonComponent,
  SlideToggleComponent,
  CurrencyFieldComponent,
  StringFieldComponent,
  PercentageFieldComponent,
  IntegerFieldComponent,
  NumberFieldComponent,
  SelectComponent
];

const BQ_MAT_COMPONENTS = [
  ElementComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    BQ_COMPONENTS,
    BQ_MAT_COMPONENTS

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: BASE_URL
    }),
    BrowserAnimationsModule,
    BlueriqFormsModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlueriqComponents.register(BQ_COMPONENTS),
    PresentationStyles,
    MomentTransformer
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
