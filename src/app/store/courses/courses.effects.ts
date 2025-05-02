import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, withLatestFrom, tap, Observable } from 'rxjs';

import {
    requestAllCourses,
    requestAllCoursesSuccess,
    requestAllCoursesFail,
    requestFilteredCourses,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseSuccess,
    requestSingleCourseFail,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestEditCourse,
    requestEditCourseSuccess,
    requestEditCourseFail,
    requestCreateCourse,
    requestCreateCourseSuccess,
    requestCreateCourseFail,
} from './courses.actions';

import { CoursesService } from '@app/services/courses.service';
import { CoursesState } from './courses.state';
import { coursesFeatureKey } from './courses.reducer';
import * as CoursesSelectors from './courses.selectors';
import { Course } from 'src/app/courses/models/course.model';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router,
        private store$: Store<{ [coursesFeatureKey]: CoursesState }>
    ) {}

    getAll$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map((courses: Course[]) => requestAllCoursesSuccess({ courses })),
                    catchError(error => of(requestAllCoursesFail({ error })))
                )
            )
        )
    );

    getSpecificCourse$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(requestSingleCourse),
            mergeMap(({ id }) =>
                this.coursesService.getCourse(id).pipe(
                    map((res: any) => requestSingleCourseSuccess({ course: res as Course })),
                    catchError(error => of(requestSingleCourseFail({ error })))
                )
            )
        )
    );

    filteredCourses$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(requestFilteredCourses),
            withLatestFrom(this.store$.pipe(select(CoursesSelectors.getAllCourses))),
            map(([{ title }, courses]) => {
                const filtered = courses.filter((course: Course) =>
                    course.title.toLowerCase().includes(title.toLowerCase())
                );
                return requestFilteredCoursesSuccess({ courses: filtered });
            })
        )
    );

    deleteCourse$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(requestDeleteCourse),
            mergeMap(({ id }) =>
                this.coursesService.deleteCourse(id).pipe(
                    map(() => requestAllCourses()),
                    catchError(error => of(requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(requestEditCourse),
            mergeMap(({ id, course }) =>
                this.coursesService.editCourse(id, course).pipe(
                    map((res: any) => requestEditCourseSuccess({ course: res as Course })),
                    catchError(error => of(requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(requestCreateCourse),
            mergeMap(({ course }) =>
                this.coursesService.createCourse(course).pipe(
                    map((res: any) => requestCreateCourseSuccess({ course: res as Course })),
                    catchError(error => of(requestCreateCourseFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    requestCreateCourseSuccess,
                    requestEditCourseSuccess,
                    requestSingleCourseFail
                ),
                tap(() => this.router.navigate(['/courses']))
            ),
        { dispatch: false }
    );
}
