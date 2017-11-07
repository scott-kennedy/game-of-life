import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as game from '../actions/game';

function sizeToPixels(size: number): number {
  return 10 * size + 4 * (size - 1);
}

@Component({
  selector: 'cgol-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  boardDimensions$ = this.store.select(fromRoot.getGameboardDimensions);
  boardHeightInPixels$ = this.store.select(fromRoot.getHeight).map(sizeToPixels);
  boardWidthInPixels$ = this.store.select(fromRoot.getWidth).map(sizeToPixels);
  gameboard$ = this.store.select(fromRoot.getFlattenedGameboard);
  isPlaying$ = this.store.select(fromRoot.getPlaying);
  generation$ = this.store.select(fromRoot.getGeneration);

  title = "Conway's Game of Life";

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    // Rather than subscribe dispatch an action to init the board
    this.boardDimensions$.take(1).subscribe(dimensions => {
      this.store.dispatch(new game.InitializeGame(dimensions));
    });
  }

  startGame() {
    this.store.dispatch(new game.StartGame());
  }

  pauseGame() {
    this.store.dispatch(new game.PauseGame());
  }

  nextGameStep() {
    this.store.dispatch(new game.NextGameStep());
  }

  resetGame() {
    this.store.dispatch(new game.ResetGame());
  }

  changeWidth(event: MatSliderChange) {
    this.store.dispatch(new game.ChangeWidth(event.value));
  }

  changeHeight(event: MatSliderChange) {
    this.store.dispatch(new game.ChangeHeight(event.value));
  }
}
