import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './components/overview/overview/overview.component';

const routes: Routes = [
{
  path: 'admin',
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
}, {
    path: '',
    component: OverviewComponent,
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
