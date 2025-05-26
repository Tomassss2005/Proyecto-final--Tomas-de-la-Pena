import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [

  //Parte de la base /dashboard
  {
    path: 'students',
    loadChildren: () => import('./modules/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'lists',
    canActivate: [adminGuard],
    loadChildren: () => import('./modules/lists/lists.module').then((m) => m.ListsModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./modules/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'inscriptions',
    loadChildren: () => import('./modules/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
