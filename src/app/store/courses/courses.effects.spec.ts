import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CoursesEffects } from './courses.effects';
import { CoursesService } from '../../services/courses.service';
import * as CoursesActions from '@app/store/courses/courses.actions';
import { Action } from '@ngrx/store';

describe('CoursesEffects', () => {
    let actions$: Observable<Action>;
    let effects: CoursesEffects;
    let store: MockStore;
    let coursesService: jasmine.SpyObj<CoursesService>;

    beforeEach(() => {
        const coursesServiceMock = jasmine.createSpyObj('CoursesService', ['getCourse']);

        TestBed.configureTestingModule({
            providers: [
                CoursesEffects,
                provideMockStore({ initialState: {} }),
                provideMockActions(() => actions$),
                { provide: CoursesService, useValue: coursesServiceMock }
            ]
        });

        effects = TestBed.inject(CoursesEffects);
        store = TestBed.inject(MockStore);
        coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    });

    it('getAll$ should return requestAllCoursesSuccess on success', (done) => {
        const mockCourses = [
            { id: '1', title: 'Course 1' },
            { id: '2', title: 'Course 2' }
        ];

        const action = CoursesActions.requestAllCourses();
        const successAction = CoursesActions.requestAllCoursesSuccess({ courses: mockCourses });

        actions$ = of(action);
        coursesService.getCourse.and.returnValue(of(mockCourses));

        effects.getAll$.subscribe(result => {
            expect(result).toEqual(successAction);
            done();
        });
    });

    it('getAll$ should return requestAllCoursesFailure on error', (done) => {
        const error = new Error('Failed to fetch');

        const action = CoursesActions.requestAllCourses();
        const failureAction = CoursesActions.requestAllCoursesFail({ error: error.message });

        actions$ = of(action);
        coursesService.getCourse.and.returnValue(throwError(() => error));

        effects.getAll$.subscribe(result => {
            expect(result).toEqual(failureAction);
            done();
        });
    });
});
