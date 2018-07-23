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
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { Configuration } from './configuration/configuration';
import { MaterialModule } from './material.module';
import { AssetComponent } from './modules/asset/asset.component';
import { ButtonComponent } from './modules/button/button.component';
import { ContainerComponent } from './modules/container/container.component';
import { ErrorComponent } from './modules/error/error.component';
import { ErrorService } from './modules/error/error.service';
import { DocumentLinkComponent } from './modules/file/document-link/document-link.component';
import { FileDownloadComponent } from './modules/file/file-download/file-download.component';
import { FileDownloadService } from './modules/file/file-download/file-download.service';
import { FileUploadComponent } from './modules/file/file-upload/file-upload.component';
import { CheckboxComponent } from './modules/form-controls/checkbox/checkbox.component';
import { DatepickerComponent } from './modules/form-controls/date/datepicker/datepicker.component';
import { DateTimepickerComponent } from './modules/form-controls/date/datetimepicker/datetimepicker.component';
import { MomentTransformer } from './modules/form-controls/date/moment-transformer';
import { CurrencyFieldComponent } from './modules/form-controls/input-field/currency/currency.component';
import { IntegerFieldComponent } from './modules/form-controls/input-field/integer/integer.component';
import { NumberFieldComponent } from './modules/form-controls/input-field/number/number.component';
import { PercentageFieldComponent } from './modules/form-controls/input-field/percentage/percentage.component';
import { StringFieldComponent } from './modules/form-controls/input-field/string/string.component';
import { RadioButtonComponent } from './modules/form-controls/radio-button/radio-button.component';
import { SelectComponent } from './modules/form-controls/select/select.component';
import { SlideToggleComponent } from './modules/form-controls/slide-toggle/slide-toggle.component';
import { LoadingComponent } from './modules/loading/loading.component';
import { PageComponent } from './modules/page/page.component';
import { PresentationStyles } from './modules/presentationstyles';
import { ReadonlyComponent } from './modules/readonly/readonly.component';
import { PaginationComponent } from './modules/table/pagination/table.pagination.component';
import { TableSearchComponent } from './modules/table/search/table.search.component';
import { TableSortComponent } from './modules/table/sort/table.sort.component';
import { TableComponent } from './modules/table/table.component';
import { TextItemComponent } from './modules/textitem/textitem.component';
import { ProjectComponent } from './project.component';
import { ErrorEffects } from './shared/effects/error/error.effects';
import { PageValidationEffect } from './shared/effects/validation/validation.effect';

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
  ContainerComponent,
  CheckboxComponent,
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

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent, ErrorComponent, ProjectComponent,
    BQ_COMPONENTS
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
    SharedModule,
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
