import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Course } from '../../../courses/models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
  imports: [CommonModule]
})
export class StudentDetailComponent implements OnInit {
  student?: Student;
  courseNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<Student>(`http://localhost:3000/students/${id}`).subscribe(student => {
      this.student = student;

      this.http.get<Course[]>(`http://localhost:3000/courses`).subscribe(courses => {
        const course = courses.find(c => String(c.id) === String(student.curso ?? ''));
        this.courseNombre = course ? course.name : 'Curso no encontrado';
      });
    });
  }
}
