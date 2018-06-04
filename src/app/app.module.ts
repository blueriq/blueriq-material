import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { V1BackendModule } from '@blueriq/angular/backend/v1';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ButtonComponent } from './blueriq/material/button/button.component';
import { ContainerComponent } from './blueriq/material/container/container.component';
import { FieldComponent } from './blueriq/material/field/field.component';
import { SelectComponent } from './blueriq/material/form-controls/select/select.component';
import { MaterialModule } from './blueriq/material/material/material.module';
import { PageComponent } from './blueriq/material/page/page.component';
import { TextItemComponent } from './blueriq/material/textitem/textitem.component';
import { ProjectComponent } from './blueriq/project/project.component';
import {BlueriqFormsModule} from '@blueriq/angular/forms';
import {ElementComponent} from './blueriq/generic/element/element.component';

const routes: Routes = [
  { path: 'session/:sessionId', component: ProjectComponent },
  { path: 'shortcut/:shortcut', component: ProjectComponent },
  { path: 'flow/:project/:flow', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version', component: ProjectComponent },
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' },
];

const BASE_URL = '/Runtime';

const BQ_COMPONENTS = [
  PageComponent,
  ContainerComponent,
  TextItemComponent,
  ButtonComponent,
  FieldComponent,
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
      baseUrl: '../Runtime',
    }),
    BrowserAnimationsModule,
    BlueriqFormsModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlueriqComponents.register(BQ_COMPONENTS)
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
