import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

const routes: Routes = [

  // Parte de la base /dashboard/students
  {
    path: '',
    component: StudentsComponent,
  },
  {
    path: ':id',
    component: StudentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
