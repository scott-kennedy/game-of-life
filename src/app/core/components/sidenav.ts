import { Component } from '@angular/core';

@Component({
  selector: 'cgol-sidenav',
  template: `
    <mat-sidenav mode="side" opened="true">
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [
    `
    mat-sidenav {
      width: 200px;
    }
  `
  ]
})
export class SidenavComponent {}
