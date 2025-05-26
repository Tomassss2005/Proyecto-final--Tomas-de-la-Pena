import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';
import { User } from '../../../../../../core/models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table-component.html',
  styles: ``
})
export class StudentsTableComponent {

  //Contiene un listado de id para cada columna
  displayedColumns: string[] = ['id', 'nombre', 'nota', 'curso', 'acciones'];

  //Datos de la tabla 
  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<Student>();

  authUser$: Observable<User | null>

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
