import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  template: '<div>Courses List</div>',
  standalone: true
})
export class CoursesListComponent {
  @Input() courses: any[] = [];
}
