import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AppConfigModule } from '../app-config/app-config.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { PageComponent } from './components/page/page.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';

@NgModule({
  declarations: [
    PageComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    DetailPageComponent,
    ConfirmationModalComponent,
    OverviewPageComponent,
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
    SharedModule,
  ],
  bootstrap: [PageComponent],
})
export class AdminModule {}
