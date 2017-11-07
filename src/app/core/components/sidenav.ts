import { Component } from '@angular/core';

@Component({
  selector: 'cgol-sidenav',
  template: `
      <ul>
        <ng-content></ng-content>
      </ul>
  `,
  styles: [
    `
    ul {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `
  ]
})
export class SidenavComponent {}
