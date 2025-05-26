import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from './models/student';
import { StudentService } from './student.service';
import { Course } from '../courses/models'; // Asegurate de tener este import
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CoursesService } from '../courses/courses.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy {
  isEditingId: number | null = null;
  studentForm: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];
  dataSource: any[] = [];
  isLoading = false;

  studentsSubscription: Subscription | null = null;
  authUser$: Observable<User | null>;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private coursesServices: CoursesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authUser$ = this.authService.authUser$;

    this.studentForm = this.fb.group({
      id: "",
      nombre: "",
      apellido: "",
      nota: "",
      curso: "",
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }

  loadData(): void {
    this.isLoading = true;

    this.coursesServices.getCourses().subscribe(courses => {
      this.courses = courses;

      this.studentsSubscription = this.studentService.getStudents$().subscribe({
        next: (students) => {
          this.students = students;
          this.dataSource = this.students.map(student => {
            const curso = this.courses.find(c => String(c.id) === String(student.curso));
            return {
              ...student,
              cursoNombre: curso ? curso.name : 'Curso no encontrado'
            };
          });
        },
        error: error => console.error(error),
        complete: () => {
          this.isLoading = false;
        }
      });
    });
  }

  onsubmit() {
    if (this.isEditingId) {
      this.students = this.students.map((student) =>
        student.id === this.isEditingId
          ? { ...student, ...this.studentForm.value }
          : student
      );
    } else {
      const newStudent = this.studentForm.value;

      this.studentService.createStudent(newStudent).subscribe({
        next: (response) => {
          this.students = [...this.students, response];
          this.loadData(); // actualiza dataSource también
        },
        error: (error) => console.log('El estudiante no se pudo crear', error),
        complete: () => {
          console.log('Estudiante creado con éxito');
        },
      });
    }

    this.studentForm.reset();
    this.isEditingId = null;
  }

  onDeleteStudent(id: number | string) {
    if (confirm('¿Está seguro que quiere eliminar este estudiante?')) {
      this.studentService.deleteStudent(String(id)).subscribe({
        next: (response) => {
          this.students = response;
          this.loadData(); // actualiza dataSource también
        }
      });
    }
  }

  onEditStudent(student: Student) {
    this.isEditingId = student.id;
    this.studentForm.patchValue(student);
  }

  onSaveChanges() {
    if (this.isEditingId !== null) {
      const updatedStudent = this.studentForm.value;
      this.studentService.editStudent(this.isEditingId, updatedStudent).subscribe({
        next: (response) => {
          this.loadData();
          this.studentForm.reset();
          this.isEditingId = null;
        },
        error: (err) => {
          console.error('Error al actualizar', err);
        }
      });
    }
  }

  onViewDetail(id: number) {
    this.router.navigate(['/students', id]);
  }
}
