import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board-page',
  template: `
    <div class="board" [style.width.px]="boardWidth" [style.height.px]="boardHeight">
      <cgol-cell *ngFor="let cell of gameboard"
        [size]="cellSize"
        [isAlive]='cell'></cgol-cell>
    </div>
  `,
  styles: [
    `
  `
  ]
})
export class BoardPageComponent {
  @Input() gameboard;
  @Input() boardHeight;
  @Input() boardWidth;
  @Input() cellSize;

  constructor() {}
}
