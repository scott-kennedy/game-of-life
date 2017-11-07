import { Component, Input, Output, EventEmitter } from '@angular/core';
// currently selected - #607D8B

@Component({
  selector: 'cgol-nav-item',
  template: `
    <a (click)="onClick.emit()">
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
    a {
      display: block;
      padding: 10px;
      color: #2196F3;
    }
    a:hover {
      background-color: #EEE;
      cursor: pointer;
    }
  `
  ]
})
export class NavItemComponent {
  @Output() onClick = new EventEmitter();
}
