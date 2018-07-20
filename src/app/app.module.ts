import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { V1BackendModule } from '@blueriq/angular/backend/v1';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { TextItemModule } from '@blueriq/angular/textitems';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ErrorComponent } from './blueriq/error/error.component';
import { ErrorService } from './blueriq/error/error.service';
import { ErrorEffects } from './blueriq/generic/effects/error.effects';
import { ElementComponent } from './blueriq/generic/element/element.component';
import { FileDownloadService } from './blueriq/generic/file-download.service';
import { LoadingComponent } from './blueriq/loading/loading.component';
import { AssetComponent } from './blueriq/material/asset/asset.component';
import { ContainerComponent } from './blueriq/material/container/container.component';
import { DocumentLinkComponent } from './blueriq/material/document-link/document-link.component';
import { FileDownloadComponent } from './blueriq/material/file-download/file-download.component';
import { FileUploadComponent } from './blueriq/material/file-upload/file-upload.component';
import { ButtonComponent } from './blueriq/material/form-controls/button/button.component';
import { CheckboxComponent } from './blueriq/material/form-controls/checkbox/checkbox.component';
import { DatepickerComponent } from './blueriq/material/form-controls/date/datepicker/datepicker.component';
import { DateTimepickerComponent } from './blueriq/material/form-controls/date/datetimepicker/datetimepicker.component';
import { MomentTransformer } from './blueriq/material/form-controls/date/moment-transformer';
import { CurrencyFieldComponent } from './blueriq/material/form-controls/input-field/currency/currency.component';
import { IntegerFieldComponent } from './blueriq/material/form-controls/input-field/integer/integer.component';
import { NumberFieldComponent } from './blueriq/material/form-controls/input-field/number/number.component';
import { PercentageFieldComponent } from './blueriq/material/form-controls/input-field/percentage/percentage.component';
import { StringFieldComponent } from './blueriq/material/form-controls/input-field/string/string.component';
import { RadioButtonComponent } from './blueriq/material/form-controls/radio-button/radio-button.component';
import { SelectComponent } from './blueriq/material/form-controls/select/select.component';
import { SlideToggleComponent } from './blueriq/material/form-controls/slide-toggle/slide-toggle.component';
import { MaterialModule } from './blueriq/material/material.module';
import { PageComponent } from './blueriq/material/page/page.component';
import { PresentationStyles } from './blueriq/material/presentationstyles/presentationstyles';
import { ReadonlyComponent } from './blueriq/material/readonly/readonly.component';
import { PaginationComponent } from './blueriq/material/table/pagination/table.pagination.component';
import { TableSearchComponent } from './blueriq/material/table/search/table.search.component';
import { TableSortComponent } from './blueriq/material/table/sort/table.sort.component';
import { TableComponent } from './blueriq/material/table/table.component';
import { TextItemComponent } from './blueriq/material/textitem/textitem.component';
import { ProjectComponent } from './blueriq/project/project.component';
import { PageValidationEffect } from './blueriq/validation/validation.effect';
import { Configuration } from './configuration/configuration';

const routes: Routes = [
  { path: 'session/:sessionId', component: ProjectComponent },
  { path: 'shortcut/:shortcut', component: ProjectComponent },
  { path: 'flow/:project/:flow', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version/:languageCode', component: ProjectComponent },
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' }
];

const BQ_COMPONENTS = [
  AssetComponent,
  ButtonComponent,
  SelectComponent,
  DatepickerComponent,
  CheckboxComponent,
  ContainerComponent,
  CurrencyFieldComponent,
  DocumentLinkComponent,
  FileDownloadComponent,
  FileUploadComponent,
  IntegerFieldComponent,
  NumberFieldComponent,
  DateTimepickerComponent,
  PageComponent,
  PaginationComponent,
  PercentageFieldComponent,
  RadioButtonComponent,
  ReadonlyComponent,
  SlideToggleComponent,
  StringFieldComponent,
  TableComponent,
  TableSearchComponent,
  TableSortComponent,
  TextItemComponent
];

const BQ_MAT_COMPONENTS = [
  ElementComponent
];

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,    ErrorComponent,    ProjectComponent,
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
      baseUrl: Configuration.BASE_URL
    }),
    BrowserAnimationsModule,
    BlueriqFormsModule.forRoot(),
    FileUploadModule,
    MaterialModule,
    FlexLayoutModule,
    FormattingModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    TextItemModule,
    EffectsModule.forFeature([
      PageValidationEffect,
      ErrorEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Blueriq',
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    BlueriqComponents.register(BQ_COMPONENTS),
    MomentTransformer,
    PresentationStyles,
    ErrorService,
    FileDownloadService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
