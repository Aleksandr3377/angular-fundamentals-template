import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CoursesService} from "@app/services/courses.service";

describe('CoursesService', () => {
    let service: CoursesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CoursesService]
        });

        service = TestBed.inject(CoursesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve all courses', () => {
        const dummyCourses = [{ id: 1, title: 'Course 1' }, { id: 2, title: 'Course 2' }];

        service.getAll().subscribe((courses: any) => {
            expect(courses).toEqual(dummyCourses);
        });

        const req = httpMock.expectOne('http://localhost:4000/api/courses');
        expect(req.request.method).toBe('GET');
        req.flush(dummyCourses);
    });

    it('should create a new course', () => {
        const newCourse = { title: 'New Course' };

        service.createCourse(newCourse).subscribe((res: any) => {
            expect(res).toEqual({ success: true });
        });

        const req = httpMock.expectOne('http://localhost:4000/api/courses');
        expect(req.request.method).toBe('POST');
        req.flush({ success: true });
    });

    it('should retrieve a course by ID', () => {
        const id = '1';
        const dummyCourse = { id, title: 'Course 1' };

        service.getCourse(id).subscribe((course: any) => {
            expect(course).toEqual(dummyCourse);
        });

        const req = httpMock.expectOne(`http://localhost:4000/api/courses/${id}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyCourse);
    });

    it('should update a course', () => {
        const id = '1';
        const updatedCourse = { title: 'Updated Course' };

        service.editCourse(id, updatedCourse).subscribe((res: any) => {
            expect(res).toEqual({ success: true });
        });

        const req = httpMock.expectOne(`http://localhost:4000/api/courses/${id}`);
        expect(req.request.method).toBe('PUT');
        req.flush({ success: true });
    });

    it('should delete a course', () => {
        const id = '1';

        service.deleteCourse(id).subscribe((res: any) => {
            expect(res).toEqual({ success: true });
        });

        const req = httpMock.expectOne(`http://localhost:4000/api/courses/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ success: true });
    });

    it('should filter courses by query', () => {
        const query = 'angular';
        const filtered = [{ id: 1, title: 'Angular Basics' }];

        service.filterCourses(query).subscribe((res: any) => {
            expect(res).toEqual(filtered);
        });

        const req = httpMock.expectOne(`http://localhost:4000/api/courses?filter=${query}`);
        expect(req.request.method).toBe('GET');
        req.flush(filtered);
    });

    it('should get all authors', () => {
        const authors = [{ id: 1, name: 'Author 1' }];

        service.getAllAuthors().subscribe((res: any) => {
            expect(res).toEqual(authors);
        });

        const req = httpMock.expectOne('http://localhost:4000/api/authors');
        expect(req.request.method).toBe('GET');
        req.flush(authors);
    });

    it('should create a new author', () => {
        const newAuthor = { name: 'Author A' };

        service.createAuthor(newAuthor).subscribe((res: any) => {
            expect(res).toEqual({ success: true });
        });

        const req = httpMock.expectOne('http://localhost:4000/api/authors');
        expect(req.request.method).toBe('POST');
        req.flush({ success: true });
    });

    it('should retrieve author by ID', () => {
        const id = '1';
        const author = { id, name: 'Author 1' };

        service.getAuthorById(id).subscribe((res: any) => {
            expect(res).toEqual(author);
        });

        const req = httpMock.expectOne(`http://localhost:4000/api/authors/${id}`);
        expect(req.request.method).toBe('GET');
        req.flush(author);
    });
});
