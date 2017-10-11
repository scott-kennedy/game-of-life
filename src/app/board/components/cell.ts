import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-cell',
  template: `
  <svg [attr.width]="size" [attr.height]="size">
    <rect
      [attr.height]="size"
      [attr.width]="size"
      [attr.fill]="(isAlive ? '#32CD32' : '#ff0000')"></rect>
  `
})
export class CellComponent {
  @Input() size = 10;
  @Input() x: number;
  @Input() y: number;
  @Input() isAlive: boolean;

  constructor() {}
  // 4px between svgs so 5 svgs has 16px whitespace
  // and at 10px per svg we get 66px (50 + 16) necessary
}
