import { Component } from '@angular/core';

@Component({
  selector: 'cgol-sidenav',
  template: `
    <md-sidenav mode="side" opened="true">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
    </md-sidenav>
  `,
  styles: [
    `
    md-sidenav {
      width: 200px;
    }
  `
  ]
})
export class SidenavComponent {}
