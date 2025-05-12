import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //Parte de la base /dashboard
  {
    path: 'students',
    loadChildren: () => import('./modules/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'lists',
    loadChildren: () => import('./modules/lists/lists.module').then((m) => m.ListsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
