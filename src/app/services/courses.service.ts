import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Course } from 'src/app/courses/models/course.model';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class CoursesService {
    private baseUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Course[]> {
        return this.http.get<Course[]>('http://localhost:4000/api/courses');
    }
    createCourse(course: any) { return this.http.post(`${this.baseUrl}/courses`, course); }
    editCourse(id: string, course: any) { return this.http.put(`${this.baseUrl}/courses/${id}`, course); }
    getCourse(id: string) { return this.http.get(`${this.baseUrl}/courses/${id}`); }
    deleteCourse(id: string) { return this.http.delete(`${this.baseUrl}/courses/${id}`); }
    filterCourses(query: string) { return this.http.get(`${this.baseUrl}/courses?filter=${query}`); }
    getAllAuthors() { return this.http.get(`${this.baseUrl}/authors`); }
    createAuthor(author: any) { return this.http.post(`${this.baseUrl}/authors`, author); }
    getAuthorById(id: string) { return this.http.get(`${this.baseUrl}/authors/${id}`); }
}
