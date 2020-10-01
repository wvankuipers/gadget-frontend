import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectDetailComponent } from './components/project/project-detail/project-detail.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { RunDetailComponent } from './components/run/run-detail/run-detail.component';
import { RunListComponent } from './components/run/run-list/run-list.component';
import { SuiteDetailComponent } from './components/suite/suite-detail/suite-detail.component';
import { SuiteListComponent } from './components/suite/suite-list/suite-list.component';
import { TestListComponent } from './components/test/test-list/test-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'project',
        component: ProjectListComponent,
      },
      {
        path: 'project/:id',
        component: ProjectDetailComponent,
      },
      {
        path: 'suite',
        component: SuiteListComponent,
      },
      {
        path: 'suite/:id',
        component: SuiteDetailComponent,
      },
      {
        path: 'run',
        component: RunListComponent,
      },
      {
        path: 'run/:id',
        component: RunDetailComponent,
      },
      {
        path: 'test',
        component: TestListComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
