import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import * as game from '../../core/actions/game';
import * as fromRoot from '../../reducers';
// import * as board from '../../board/actions/board';

import { GameService } from '../../core/services/game.service';

@Injectable()
export class GameEffects {
  @Effect()
  gameSetup$ = this.actions$
    .ofType<game.InitializeGame>(game.INITIALIZE_GAME)
    .map(action => action.payload)
    .switchMap(dimensions => this.gameService.initializeBoard(dimensions.width, dimensions.height))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  resetGameboard$ = this.actions$
    .ofType<game.ResetGame>(game.RESET_GAME)
    .switchMap(() => this.store.select(fromRoot.getGameboardDimensions).take(1))
    .switchMap(dimensions => this.gameService.initializeBoard(dimensions.width, dimensions.height))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  startGameplay$ = this.actions$
    .ofType<game.ResetGame>(game.START_GAME, game.PAUSE_GAME)
    .map(action => action.type)
    .switchMap(type =>
      interval(10)
        .takeWhile(() => type !== game.PAUSE_GAME)
        .switchMap(() => this.store.select(fromRoot.getGameboard).take(1))
    )
    // Changing to switchMap seems to be more resposive but that could be a symptom of another
    // problem
    .exhaustMap(gameboard => this.gameService.nextGeneration(gameboard))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  getNextGeneration$ = this.actions$
    .ofType<game.ResetGame>(game.NEXT_GAME_STEP)
    .switchMap(() => this.store.select(fromRoot.getGameboard).take(1))
    .switchMap(gameboard => this.gameService.nextGeneration(gameboard))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  resizeGameboard$ = this.actions$
    .ofType<game.ResetGame>(game.CHANGE_HEIGHT, game.CHANGE_WIDTH)
    .switchMap(() => this.store.select(fromRoot.getGameboardDimensions).take(1))
    .switchMap(dimensions => this.gameService.initializeBoard(dimensions.width, dimensions.height))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  constructor(
    private store: Store<fromRoot.State>,
    private gameService: GameService,
    private actions$: Actions
  ) {}
}
