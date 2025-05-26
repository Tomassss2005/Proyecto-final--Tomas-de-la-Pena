import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CoursesComponent,
        CoursesRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [CoursesComponent]
})
export class CoursesModule { }
