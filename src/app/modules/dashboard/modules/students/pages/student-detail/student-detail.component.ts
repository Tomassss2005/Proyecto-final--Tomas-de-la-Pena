import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../student.service';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  student$: Observable<Student | null>;

  constructor(private activateRoute: ActivatedRoute, private studentService: StudentService) {
    const studentId = this.activateRoute.snapshot.params['id'];
    this.student$ = this.studentService.getStudentById(studentId);
    console.log('Student Id:', studentId)
  }
}
