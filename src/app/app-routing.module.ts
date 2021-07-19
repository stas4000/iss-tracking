import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  pathMatch: 'full',
  redirectTo: 'one',
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./components/map/map.module').then(
        (m) => m.MapModule
      ),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./components/report/report.module').then(
        (m) => m.ReportModule
      ),
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
