import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { ApprovalPageComponent } from './components/approval-page/approval-page.component';
import { ApprovalComponent } from './components/overview/approval.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalPageComponent,
    pathMatch: 'full',
    children: [
      { path: '', component: ApprovalComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalRoutingModule {}
