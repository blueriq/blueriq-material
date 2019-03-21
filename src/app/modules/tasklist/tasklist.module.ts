import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { TaskService } from './task_service';
import { TaskListComponent } from './tasklist.component';
import { V2TaskService } from './v2_task_service';

const BLUERIQ_COMPONENTS = [
  TaskListComponent,
];

@NgModule({
  declarations: [
    BLUERIQ_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(BLUERIQ_COMPONENTS),
    { provide: TaskService, useClass: V2TaskService },
  ],
  imports: [
    CommonModule,
    SharedModule,

    BlueriqModule.forRoot(), // using bqClasses (which triggers to use the css to use colors)

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    HttpClientModule,
  ],
  exports: [BLUERIQ_COMPONENTS],
})
export class TaskListModule {
}
