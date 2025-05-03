import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CoursesEffects } from './courses.effects';
import { CoursesService } from '../../services/courses.service';
import * as CoursesActions from '@app/store/courses/courses.actions';
import { Action } from '@ngrx/store';
import * as CoursesSelectors from '@app/store/courses/courses.selectors';

describe('CoursesEffects', () => {
    let actions$: Observable<Action>;
    let effects: CoursesEffects;
    let store: MockStore;
    let coursesService: jasmine.SpyObj<CoursesService>;

    const mockCourses = [
        { id: '1', title: 'Course 1' },
        { id: '2', title: 'Course 2' }
    ];

    beforeEach(() => {
        const coursesServiceMock = jasmine.createSpyObj('CoursesService', ['getAll', 'getCourse']);

        TestBed.configureTestingModule({
            providers: [
                CoursesEffects,
                provideMockStore({
                    initialState: {},
                    selectors: [
                        {
                            selector: CoursesSelectors.getAllCourses,
                            value: mockCourses
                        }
                    ]
                }),
                provideMockActions(() => actions$),
                { provide: CoursesService, useValue: coursesServiceMock }
            ]
        });

        effects = TestBed.inject(CoursesEffects);
        store = TestBed.inject(MockStore);
        coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    });

    it('getAll$ should return requestAllCoursesSuccess on success', (done) => {
        const action = CoursesActions.requestAllCourses();
        const successAction = CoursesActions.requestAllCoursesSuccess({ courses: mockCourses });

        actions$ = of(action);
        coursesService.getAll.and.returnValue(of(mockCourses));

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
        coursesService.getAll.and.returnValue(throwError(() => error));

        effects.getAll$.subscribe(result => {
            expect(result).toEqual(failureAction);
            done();
        });
    });
});
