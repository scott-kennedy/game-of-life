import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board-page',
  template: `
    <svg [attr.width]="boardWidth" [attr.height]="boardHeight">
      <g cgol-cell
        *ngFor="let cell of gameboard"
        [size]="cellSize"
        [x]="cell.x"
        [y]="cell.y"
        [isAlive]='cell.isAlive'></g>
    </svg>
  `
})
export class BoardPageComponent {
  @Input() gameboard;
  @Input() boardHeight;
  @Input() boardWidth;
  @Input() cellSize;

  constructor() {}
}
