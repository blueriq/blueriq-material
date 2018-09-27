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
import { BlueriqStoreModule } from '@blueriq/angular/store';
import { TextItemModule } from '@blueriq/angular/textitems';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AssetComponent } from './modules/asset/asset.component';
import { ButtonComponent } from './modules/button/button.component';
import { CommentModule } from './modules/comment/comment.module';
import { ContainerComponent } from './modules/container/container.component';
import { FailedComponent } from './modules/container/failed/failed.component';
import { HorizontalFlexChildDirective } from './modules/container/horizontal-flex-child.directive';
import { ErrorComponent } from './modules/error/error.component';
import { FileModule } from './modules/file/file.modules';
import { MomentTransformer } from './modules/form-controls/date/moment-transformer';
import { FormControlModule } from './modules/form-controls/form-control.module';
import { HeaderComponent } from './modules/header/header.component';
import { ListModule } from './modules/list/list.module';
import { LoadingComponent } from './modules/loading/loading.component';
import { MenuModule } from './modules/menu/menu.module';
import { PageComponent } from './modules/page/page.component';
import { ReadonlyComponent } from './modules/readonly/readonly.component';
import { LoginComponent } from './modules/static-pages/login.component';
import { StaticPagesModule } from './modules/static-pages/static-pages.module';
import { TabModule } from './modules/tab/tabs.module';
import { TextItemComponent } from './modules/textitem/textitem.component';
import { TimelineModule } from './modules/timeline/timeline.module';
import { VisualizationModule } from './modules/visualization/visualization.module';
import { WidgetModule } from './modules/widget/widget.module';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  { path: 'session/:sessionId', component: ProjectComponent },
  { path: 'shortcut/:shortcut', component: ProjectComponent },
  { path: 'flow/:project/:flow', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version', component: ProjectComponent },
  { path: 'flow/:project/:flow/:version/:languageCode', component: ProjectComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'shortcut/default', pathMatch: 'full' }
];

const BQ_COMPONENTS = [
  AssetComponent,
  ButtonComponent,
  ContainerComponent,
  FailedComponent,
  HeaderComponent,
  PageComponent,
  ReadonlyComponent,
  TextItemComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HorizontalFlexChildDirective,
    LoadingComponent,
    ProjectComponent,
    BQ_COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BlueriqModule.forRoot(),
    V1BackendModule.forRoot({
      baseUrl: environment.baseUrl
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BlueriqFormsModule.forRoot(),
    FlexLayoutModule,
    FormattingModule.forRoot(),
    ReactiveFormsModule,
    BlueriqStoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Blueriq',
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    /* bq modules */
    SharedModule,
    FileModule,
    CommentModule,
    FormControlModule,
    MenuModule,
    StaticPagesModule,
    TextItemModule,
    TimelineModule,
    ListModule,
    TabModule,
    VisualizationModule,
    WidgetModule
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    BlueriqComponents.register(BQ_COMPONENTS),
    MomentTransformer
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
