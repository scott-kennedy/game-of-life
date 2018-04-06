import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: '[cgol-cell]',
  template: `
    <svg:rect stroke="black"
      [attr.dataId]="cell.id"
      [attr.width]="cell.width"
      [attr.height]="cell.height"
      [attr.x]="cell.x + 'px'"
      [attr.y]="cell.y + 'px'"
      [attr.fill]="(cell.isAlive ? '#4CAF50' : '#fff')">
    </svg:rect>
  `
})
export class CellComponent {
  @Input() cell;

  constructor() {}
}
