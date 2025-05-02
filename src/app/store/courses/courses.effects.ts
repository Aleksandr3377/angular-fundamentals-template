import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, withLatestFrom, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';

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

import { CoursesState } from './courses.state'; // імпортуй з .state, а не reducer!
import { coursesFeatureKey } from './courses.reducer';
import * as CoursesSelectors from './courses.selectors';

import { Course } from 'src/app/courses/models/course.model'; // створити або змінити шлях, якщо інший

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router,
        private store$: Store<{ [coursesFeatureKey]: CoursesState }>
    ) {}

    getAll$ = createEffect(() =>
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

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestSingleCourse),
            mergeMap(({ id }) =>
                this.coursesService.getCourse(id).pipe(
                    map((course: Course) => requestSingleCourseSuccess({ course })),
                    catchError(error => of(requestSingleCourseFail({ error })))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
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

    deleteCourse$ = createEffect(() =>
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

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestEditCourse),
            mergeMap(({ id, course }) =>
                this.coursesService.editCourse(id, course).pipe(
                    map((updated: Course) => requestEditCourseSuccess({ course: updated })),
                    catchError(error => of(requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestCreateCourse),
            mergeMap(({ course }) =>
                this.coursesService.createCourse(course).pipe(
                    map((created: Course) => requestCreateCourseSuccess({ course: created })),
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
