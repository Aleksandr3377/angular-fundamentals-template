import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CoursesEffects } from './courses.effects';
import { CoursesService } from '@app/services/courses.service';
import { requestAllCourses, requestAllCoursesSuccess, requestAllCoursesFail } from './courses.actions';
import { Course } from 'src/app/courses/models/course.model';
import { cold, hot } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesEffects', () => {
    let actions$: Observable<any>;
    let effects: CoursesEffects;
    let coursesService: jasmine.SpyObj<CoursesService>;

    beforeEach(() => {
        const courseServiceMock = jasmine.createSpyObj('CoursesService', ['getAll']);

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                CoursesEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState: {} }), 
                { provide: CoursesService, useValue: courseServiceMock },
            ]
        });

        effects = TestBed.inject(CoursesEffects);
        coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    });

    it('getAll$ should return requestAllCoursesSuccess on success', () => {
        const mockCourses: Course[] = [
            { id: '1', title: 'Course 1', description: '', duration: 0, creationDate: '' }
        ];
        const action = requestAllCourses();
        const outcome = requestAllCoursesSuccess({ courses: mockCourses });

        actions$ = hot('-a', { a: action });
        coursesService.getAll.and.returnValue(cold('-b|', { b: mockCourses }));

        const expected = cold('--c', { c: outcome });

        expect(effects.getAll$).toBeObservable(expected);
    });

    it('getAll$ should return requestAllCoursesFail on error', () => {
        const action = requestAllCourses();
        const error = new Error('Network error');
        const outcome = requestAllCoursesFail({ error: error.message });

        actions$ = hot('-a', { a: action });
        coursesService.getAll.and.returnValue(cold('-#|', {}, error));

        const expected = cold('--c', { c: outcome });

        expect(effects.getAll$).toBeObservable(expected);
    });
});
