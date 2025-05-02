

export interface Course {
    id: number | string;
    title: string;
}

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}
