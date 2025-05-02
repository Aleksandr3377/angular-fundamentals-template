import { createReducer, on } from '@ngrx/store';
import { CoursesState } from './courses.state';
import * as CoursesActions from './courses.actions';
export type { CoursesState };
export const coursesFeatureKey = 'courses';

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null
};

export const coursesReducer = createReducer(
    initialState,

    // All courses
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    // Single course
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),

    // Filtered
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        errorMessage: null
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        errorMessage: error
    })),

    // Delete
    on(CoursesActions.requestDeleteCourse, (state) => ({ ...state })),
    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({ ...state })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    // Edit
    on(CoursesActions.requestEditCourse, (state) => ({ ...state })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    // Create
    on(CoursesActions.requestCreateCourse, (state) => ({ ...state })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [...state.allCourses, course]
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    }))
);
