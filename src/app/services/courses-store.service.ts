import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CoursesService} from "@app/services/courses.service";

@Injectable({ providedIn: 'root' })
export class CoursesStoreService {
    private courses$$ = new BehaviorSubject<any[]>([]);
    public courses$ = this.courses$$.asObservable();

    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll() {
        this.isLoading$$.next(true);
        this.coursesService.getAll().subscribe((courses: any) => {
            this.courses$$.next(courses);
            this.isLoading$$.next(false);
        });
    }

    createCourse(course: any) { return this.coursesService.createCourse(course); }
    editCourse(id: string, course: any) { return this.coursesService.editCourse(id, course); }
    getCourse(id: string) { return this.coursesService.getCourse(id); }
    deleteCourse(id: string) { return this.coursesService.deleteCourse(id); }
    filterCourses(query: string) { return this.coursesService.filterCourses(query); }
    getAllAuthors() { return this.coursesService.getAllAuthors(); }
    createAuthor(author: any) { return this.coursesService.createAuthor(author); }
    getAuthorById(id: string) { return this.coursesService.getAuthorById(id); }
}
