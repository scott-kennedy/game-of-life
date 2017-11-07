import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-cell',
  template: `
  <svg [attr.width]="'100%'" [attr.height]="'100%'">
    <rect
      [attr.height]="'100%'"
      [attr.width]="'100%'"
      [attr.fill]="(isAlive ? '#4CAF50' : '#A1887F')"></rect>
    </svg>
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
