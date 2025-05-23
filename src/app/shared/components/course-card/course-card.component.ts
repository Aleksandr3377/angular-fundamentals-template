import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  template: '<div>Course Card</div>',
  standalone: true
})
export class CourseCardComponent {
  @Input() cardData: any;
  @Input() editable: boolean = false;
}
