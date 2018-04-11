import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as game from '../actions/game';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

const calculateDisplayArea = () => {
  let displayWidth, displayHeight;

  if (window.innerWidth <= 768) {
    displayWidth = displayHeight = window.innerWidth - 30;
  } else {
    // displayWidth = window.innerWidth - 200;
    displayWidth = displayHeight = window.innerHeight * 0.7;
  }

  return { width: displayWidth, height: displayHeight };
};

@Component({
  selector: 'cgol-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  boardWidth$ = this.store.select(fromRoot.getWidth);
  boardHeight$ = this.store.select(fromRoot.getHeight);
  gameboard$ = this.store.select(fromRoot.getFlattenedGameboard);
  isPlaying$ = this.store.select(fromRoot.getPlaying);
  generation$ = this.store.select(fromRoot.getGeneration);
  viewportSize = calculateDisplayArea();

  resize$;

  title = "Conway's Game of Life";

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    // Rather than subscribe dispatch an action to init the board
    this.store
      .select(fromRoot.getGameboardDimensions)
      .take(1)
      .subscribe(dimensions => {
        this.store.dispatch(new game.Initialize(dimensions));
      });

    this.resize$ = Observable.fromEvent(window, 'resize')
      .debounceTime(100)
      .map(() => calculateDisplayArea())
      .subscribe(dimensions => {
        this.viewportSize = dimensions;
        console.log('Viewport:', dimensions);
      });
  }

  ngOnDestroy() {
    this.resize$.unsubscribe();
  }

  startGame() {
    this.store.dispatch(new game.Start());
  }

  pauseGame() {
    this.store.dispatch(new game.Pause());
  }

  nextGameStep() {
    this.store.dispatch(new game.NextGeneration());
  }

  resetGame() {
    this.store.dispatch(new game.Reset());
  }

  changeWidth(value) {
    this.store.dispatch(new game.ChangeWidth(+value));
  }

  changeHeight(value) {
    this.store.dispatch(new game.ChangeHeight(+value));
  }
}
