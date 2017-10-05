import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cgol-nav-item',
  template: `
    <a md-list-item (click)="onClick.emit()">
      <ng-content></ng-content>
    </a>
  `
})
export class NavItemComponent {
  @Output() onClick = new EventEmitter();
}
