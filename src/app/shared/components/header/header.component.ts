import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <ng-content></ng-content> 
    </header>
  `,
  standalone: true
})
export class HeaderComponent {}
