import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courseForm: FormGroup;
  courses = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' }
  ];
  nextId = 3; // para asignar ID único a nuevos cursos

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: [''],        // debe coincidir con formControlName en el HTML
      level: ['']        // agregar control para el nivel seleccionado
    });
  }

  onSubmit() {
    const newCourse = this.courseForm.value;
    if (newCourse.name.trim()) {
      this.courses.push({
        id: this.nextId++,
        name: newCourse.name.trim()
        // Puedes agregar level si quieres usarlo en la lista
      });
      this.courseForm.reset(); // limpiar formulario después de agregar
    }
  }
}
