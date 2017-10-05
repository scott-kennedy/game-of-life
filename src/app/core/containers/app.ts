import { Component, OnInit } from '@angular/core';
import { MdSliderChange } from '@angular/material';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as game from '../actions/game';

function sizeToPixels(size) {
  return 10 * size + 1 * size;
}

@Component({
  selector: 'cgol-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  boardDimensions$ = this.store.select(fromRoot.getGameboardDimensions);
  // width$ = this.store.select(fromRoot.getWidth);
  // height$ = this.store.select(fromRoot.getHeight);

  boardHeight$ = this.store.select(fromRoot.getHeight).map(sizeToPixels);
  boardWidth$ = this.store.select(fromRoot.getWidth).map(sizeToPixels);
  gameboard$ = this.store.select(fromRoot.getGameboard);
  isPlaying$ = this.store.select(fromRoot.getPlaying);

  title = 'Conways Game of Life';

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.boardDimensions$.take(1).subscribe(dimensions => {
      console.log('Dimensions:', dimensions);
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

  changeWidth(event: MdSliderChange) {
    this.store.dispatch(new game.ChangeWidth(event.value));
  }

  changeHeight(event: MdSliderChange) {
    this.store.dispatch(new game.ChangeHeight(event.value));
  }
}
