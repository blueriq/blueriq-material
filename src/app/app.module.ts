import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BlueriqModule } from '@blueriq/angular';
import { V1BackendModule } from '@blueriq/angular/backend/v1';
import { BlueriqStoreModule } from '@blueriq/angular/store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AssetModule } from './modules/asset/asset.module';
import { ButtonModule } from './modules/button/button.module';
import { CommentModule } from './modules/comment/comment.module';
import { ContainerModule } from './modules/container/container.module';
import { ErrorModule } from './modules/error/error.module';
import { FileModule } from './modules/file/file.modules';
import { FormControlModule } from './modules/form-controls/form-control.module';
import { HeaderModule } from './modules/header/header.module';
import { ImageModule } from './modules/image/image.module';
import { ListModule } from './modules/list/list.module';
import { LoadingModule } from './modules/loading/loading.module';
import { MenuModule } from './modules/menu/menu.module';
import { PageModule } from './modules/page/page.module';
import { ReadonlyModule } from './modules/readonly/readonly.module';
import { LoginComponent } from './modules/static-pages/login.component';
import { StaticPagesModule } from './modules/static-pages/static-pages.module';
import { TabModule } from './modules/tab/tabs.module';
import { TextItemModule } from './modules/textitem/textitem.module';
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

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    V1BackendModule.forRoot({
      baseUrl: environment.baseUrl
    }),

    // ngrx
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Blueriq',
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    BlueriqStoreModule.forRoot(),
    BlueriqModule.forRoot(), // Also used in some sub modules

    /* Blueriq Modules */
    AssetModule,
    ButtonModule,
    CommentModule,
    ContainerModule,
    FileModule,
    FormControlModule,
    HeaderModule,
    ImageModule,
    ListModule,
    MenuModule,
    PageModule,
    ReadonlyModule,
    TabModule,
    TextItemModule,
    TimelineModule,
    VisualizationModule,
    WidgetModule,

    /* Non-Blueriq modules */
    LoadingModule,
    StaticPagesModule,
    ErrorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
