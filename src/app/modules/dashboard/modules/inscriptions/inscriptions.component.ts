import { Component, OnInit } from '@angular/core';
import { Student } from '../students/models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionsService } from './inscription.service';
import { HttpClient } from '@angular/common/http';
import { Inscription } from './models';
import { Course } from '../courses/models';

@Component({
  selector: 'app-inscriptions',
  standalone: false,
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit {
  inscriptionForm!: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private inscriptionsService: InscriptionsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });

    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.http.get<Student[]>('http://localhost:3000/students')
      .subscribe(data => this.students = data);
  }

  loadCourses() {
    this.http.get<Course[]>('http://localhost:3000/courses')
      .subscribe(data => this.courses = data);
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const studentId = this.inscriptionForm.value.studentId;
      const courseId = this.inscriptionForm.value.courseId;

      const student = this.students.find(s => s.id === studentId);
      const course = this.courses.find(c => c.id === courseId);

      if (!student || !course) {
        alert('Alumno o curso no válido');
        return;
      }

      const inscription: Inscription = {
        studentId: String(student.id),
        studentNombre: student.nombre,
        studentApellido: student.apellido,
        courseId: String(course.id),
        courseNombre: course.name
      };

      this.inscriptionsService.createInscription(inscription).subscribe(() => {
        alert('Inscripción creada con éxito');
        this.inscriptionForm.reset();
      });
    }
  }
}  