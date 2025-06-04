import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Course } from './models';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courseForm: FormGroup;
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {
    this.courseForm = this.fb.group({
      name: [''],
      level: ['']
    });
  }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  onSubmit(): void {
    const formValue = this.courseForm.value;
    if (formValue.name.trim()) {
      const newCourse: Course = {
        id: crypto.randomUUID(),
        name: formValue.name.trim(),
        description: formValue.level || ''
      };

      this.coursesService.createCourse(newCourse).subscribe((createdCourse) => {
        this.courses.push(createdCourse);
        this.courseForm.reset();
      });
    }
  }
}
