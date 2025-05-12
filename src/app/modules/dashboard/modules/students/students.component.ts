import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from './models/student';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnDestroy {
  isEditingId: number | null = null;
  studentForm: FormGroup
  students: Student[] = [];
  isLoading = false;

  studentsSubscription: Subscription | null = null


  constructor(private fb: FormBuilder, private studentService: StudentService) {

    //this.loadStudents();
    this.loadStudentsObservable();

    this.studentForm = this.fb.group({
      id: "",
      nombre: "",
      apellido: "",
      nota: "",
      curso: "",
    });
  }
  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }



  loadStudentsObservable() {
    this.isLoading = true;
    this.studentsSubscription = this.studentService.getStudents$()
      .subscribe({
        next: (datos) => {
          console.log(datos),
            this.students = datos;
        },
      })
    this.studentService.getStudents$().subscribe({
      error: error => console.error(error),
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onsubmit() {

    if (this.isEditingId) {
      // Si está editando actualiza el usuario existente

      this.students = this.students.map((student) => student.id === this.isEditingId
        ? { ...student, ...this.studentForm.value } : student)

    } else {
      const newStudent = this.studentForm.value;
      newStudent.id = this.students.length + 1;
      this.students = [...this.students, this.studentForm.value];
      console.log(this.students);
    }
    this.studentForm.reset() // Resetea el formulario al modificar
    this.isEditingId = null;
  }


  onDeleteStudent(id: number) {
    console.log('Estudiante eliminado', id);
    if (confirm('¿Está seguro que quiere eliminar este estudiante?')) {
      this.students = this.students.filter((student) => student.id !== id);
    }
  }


  onEditStudent(student: Student) {
    this.isEditingId = student.id;
    console.log('Estudiante modificado', student);
    this.studentForm.patchValue(student);
  }
}