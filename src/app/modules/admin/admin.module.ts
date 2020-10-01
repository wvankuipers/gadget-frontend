import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AppConfigModule } from '../app-config/app-config.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { RunDetailComponent } from './components/run/run-detail/run-detail.component';
import { RunListComponent } from './components/run/run-list/run-list.component';
import { SuiteDetailComponent } from './components/suite/suite-detail/suite-detail.component';
import { SuiteListComponent } from './components/suite/suite-list/suite-list.component';
import { TestListComponent } from './components/test/test-list/test-list.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    DetailPageComponent,
    ConfirmationModalComponent,
    OverviewPageComponent,
    SuiteListComponent,
    SuiteDetailComponent,
    RunListComponent,
    TestListComponent,
    RunDetailComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    MatSidenavModule,
    AppConfigModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    FormsModule,
  ],
  bootstrap: [AdminPageComponent],
})
export class AdminModule {}
