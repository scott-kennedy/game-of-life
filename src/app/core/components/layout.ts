import { Component } from '@angular/core';

@Component({
  selector: 'cgol-layout',
  template: `
    <mat-sidenav-container fullscreen>
      <ng-content></ng-content>
    </mat-sidenav-container>
  `
})
export class LayoutComponent {}
