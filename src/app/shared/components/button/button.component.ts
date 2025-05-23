import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: '<button>{{ label }}</button>',
  standalone: true
})
export class ButtonComponent {
  @Input() label: string = '';
}
