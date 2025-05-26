import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './models';


@Injectable({
    providedIn: 'root',
})
export class CoursesService {

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`http://localhost:3000/courses`);
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`http://localhost:3000/courses`, course);
    }

    updateCourse(id: number, course: Course): Observable<Course> {
        return this.http.put<Course>(`http://localhost:3000/courses/${id}`, course);
    }

    deleteCourse(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/courses/${id}`);
    }
}
