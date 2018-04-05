import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as game from '../../core/actions/game';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cgol-board-page',
  template: `
    <cgol-board [gameboard]="gameboard"
      [width]="boardWidth"
      [height]="boardHeight"
      (onClickCell)="handleClick($event)"></cgol-board>
  `
})
export class BoardPageComponent {
  @Input() gameboard;
  @Input() boardHeight;
  @Input() boardWidth;

  constructor(private store: Store<fromRoot.State>) {}

  handleClick(cellIndex) {
    this.store.dispatch(new game.ToggleCell(cellIndex));
  }
}
