import {isDevMode, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {BlueriqComponents, BlueriqModule} from '@blueriq/angular';
import {V1BackendModule} from '@blueriq/angular/backend/v1';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {ButtonComponent} from './blueriq/material/button/button.component';
import {CheckboxComponent} from './blueriq/material/form-controls/checkbox/checkbox.component';
import {ContainerComponent} from './blueriq/material/container/container.component';
import {FieldComponent} from './blueriq/material/field/field.component';
import {MaterialModule} from './blueriq/material/material/material.module';
import {PageComponent} from './blueriq/material/page/page.component';
import {TextItemComponent} from './blueriq/material/textitem/textitem.component';
import {ProjectComponent} from './blueriq/project/project.component';

const routes: Routes = isDevMode() ?
  [{path: '**', component: ProjectComponent}] :
  [{path: 'session/:sessionId', component: ProjectComponent}];

const COMPONENTS = [
  PageComponent,
  ContainerComponent,
  TextItemComponent,
  ButtonComponent,
  CheckboxComponent,
  FieldComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: isDevMode ? '/Runtime' : '../server',
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlueriqComponents.register(COMPONENTS),
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
