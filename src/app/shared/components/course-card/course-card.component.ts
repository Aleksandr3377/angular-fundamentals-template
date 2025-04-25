import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-course-card',
    standalone: true,
    template: `<p>Course Card works!</p>`
})
export class CourseCardComponent {
    @Input() course: any;
}
