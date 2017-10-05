import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: '[cgol-cell]',
  template: `
    <svg:rect
      [attr.height]="size"
      [attr.width]="size"
      [attr.x]="xPosition"
      [attr.y]="yPosition"
      [attr.fill]="(isAlive ? '#32CD32' : '#ff0000')"></svg:rect>
  `
})
export class CellComponent {
  @Input() size = 10;
  @Input() x: number;
  @Input() y: number;
  @Input() isAlive: boolean;

  constructor() {}

  get xPosition() {
    return this.x * this.size + this.x * 1;
  }

  get yPosition() {
    return this.y * this.size + this.y * 1;
  }
}
