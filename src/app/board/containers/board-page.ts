import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board-page',
  template: `
      <cgol-board [gameboard]="gameboard" [width]="boardWidth" [height]="boardHeight"></cgol-board>
  `
})
export class BoardPageComponent {
  @Input() gameboard;
  @Input() boardHeight;
  @Input() boardWidth;

  constructor() {}
}
