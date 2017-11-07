import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board-page',
  template: `
    <div class="board" [ngStyle]="{
        'grid-template-columns': 'repeat(' + boardWidth + ', auto)'
      }">
      <cgol-cell *ngFor="let cell of gameboard"
        [size]="cellSize"
        [isAlive]='cell'
        [ngStyle]="{
          'height': 980 / boardWidth + 'px'
        }"></cgol-cell>
    </div>
  `,
  styles: [
    `
    .board {
      display: grid;
      grid-gap: 1px;
      justify-content: start;
      width: 980px;
    }
    cgol-cell {
      font-size: 0;
      align-self: start;
      justify-self: start;
    }
  `
  ]
})
export class BoardPageComponent {
  @Input() gameboard;
  @Input() boardHeight;
  @Input() boardWidth;
  @Input() cellSize;

  constructor() {}
  // This gives a roughly square SVG but we should probably just get rid of SVG
}
