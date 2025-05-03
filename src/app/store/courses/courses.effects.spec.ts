import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { CoursesEffects } from './courses.effects';
import { CoursesService } from '@app/services/courses.service';
import * as CoursesActions from '@app/store/courses/courses.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Course } from 'src/app/courses/models/course.model';

describe('CoursesEffects', () => {
    let actions$: Observable<Action>;
    let effects: CoursesEffects;
    let service: jasmine.SpyObj<CoursesService>;

    const mockCourses: Course[] = [
        { id: '1', title: 'Course 1', description: '', duration: 60 },
        { id: '2', title: 'Course 2', description: '', duration: 45 }
    ];

    beforeEach(() => {
        const spy = jasmine.createSpyObj('CoursesService', [
            'getAll', 'getCourse', 'editCourse', 'createCourse', 'deleteCourse'
        ]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesEffects,
                provideMockActions(() => actions$),
                provideMockStore(),
                { provide: CoursesService, useValue: spy }
            ]
        });

        effects = TestBed.inject(CoursesEffects);
        service = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    });

    it('should create effects', () => {
        expect(effects).toBeTruthy();
    });

    describe('getSpecificCourse$', () => {
        it('should dispatch requestSingleCourseSuccess', () => {
            const course = mockCourses[0];
            const action = CoursesActions.requestSingleCourse({ id: '1' });
            const result = CoursesActions.requestSingleCourseSuccess({ course });

            service.getCourse.and.returnValue(of(course));

            actions$ = hot('-a-', { a: action });
            const expected = cold('-b', { b: result });

            expect(effects.getSpecificCourse$).toBeObservable(expected);
        });
    });

    describe('editCourse$', () => {
        it('should dispatch requestEditCourseSuccess', () => {
            const course = { id: '1', title: 'Updated Course', description: '', duration: 50 };
            const action = CoursesActions.requestEditCourse({ id: '1', course });
            const result = CoursesActions.requestEditCourseSuccess({ course });

            service.editCourse.and.returnValue(of(course));

            actions$ = hot('-a-', { a: action });
            const expected = cold('-b', { b: result });

            expect(effects.editCourse$).toBeObservable(expected);
        });
    });

    describe('createCourse$', () => {
        it('should dispatch requestCreateCourseSuccess', () => {
            const course = { title: 'New Course', description: '', duration: 30 } as Course;
            const created = { ...course, id: '99' };
            const action = CoursesActions.requestCreateCourse({ course });
            const result = CoursesActions.requestCreateCourseSuccess({ course: created });

            service.createCourse.and.returnValue(of(created));

            actions$ = hot('-a-', { a: action });
            const expected = cold('-b', { b: result });

            expect(effects.createCourse$).toBeObservable(expected);
        });
    });

    describe('getAll$', () => {
        it('should dispatch requestAllCoursesSuccess', () => {
            const action = CoursesActions.requestAllCourses();
            const result = CoursesActions.requestAllCoursesSuccess({ courses: mockCourses });

            service.getAll.and.returnValue(of(mockCourses));

            actions$ = hot('-a-', { a: action });
            const expected = cold('-b', { b: result });

            expect(effects.getAll$).toBeObservable(expected);
        });
    });
});
