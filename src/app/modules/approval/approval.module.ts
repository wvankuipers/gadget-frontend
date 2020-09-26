import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalPageComponent } from './components/approval-page/approval-page.component';
import { ApprovalComponent } from './components/overview/approval.component';

@NgModule({
  declarations: [ApprovalComponent, ApprovalPageComponent],
  imports: [CommonModule, ApprovalRoutingModule, MatSidenavModule, MatCardModule, MatTableModule],
})
export class ApprovalModule {}
