import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import * as game from '../../core/actions/game';
import * as fromRoot from '../../reducers';

import { GameService } from '../../core/services/game.service';

@Injectable()
export class GameEffects {
  @Effect()
  gameSetup$ = this.actions$
    .ofType<game.InitializeGame>(game.INITIALIZE_GAME)
    .map(action => action.payload)
    .switchMap(size => this.gameService.buildNewGameboard(size.width, size.height))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  resetGameboard$ = this.actions$
    .ofType<game.ResetGame>(game.RESET_GAME)
    .switchMap(() => this.store.select(fromRoot.getGameboardDimensions).take(1))
    .switchMap(size => this.gameService.buildNewGameboard(size.width, size.height))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  startGameplay$ = this.actions$
    .switchMap(() => this.store.select(fromRoot.getPlaying).take(1))
    .switchMap(isPlaying => {
      return interval(500)
        .takeWhile(() => isPlaying)
        .mapTo(new game.NextGameStep());
    });

  @Effect()
  getNextGeneration$ = this.actions$
    .ofType<game.ResetGame>(game.NEXT_GAME_STEP)
    .switchMap(() => this.store.select(fromRoot.getGameboard).take(1))
    .switchMap(gameboard => this.gameService.getNextGeneration(gameboard))
    .map(nextGameboard => new game.GameLoaded(nextGameboard))
    .catch(err => of(err));

  @Effect()
  resizeGameboard$ = this.actions$
    .ofType<game.ResetGame>(game.CHANGE_HEIGHT, game.CHANGE_WIDTH)
    .switchMap(() => this.store.select(fromRoot.getGameboardDimensions).take(1))
    // right now resizing adds/removes live cells, do we want to do that or do we want static?
    .switchMap(size => this.gameService.buildNewGameboard(size.width, size.height))
    .map(gameboard => new game.GameLoaded(gameboard))
    .catch(err => of(err));

  @Effect()
  checkEndConditions$ = this.actions$
    .ofType<game.ResetGame>(game.GAME_LOADED)
    .switchMap(() => this.store.select(fromRoot.getGameboard).take(1))
    .switchMap(gameboard => this.gameService.checkGameEnded(gameboard))
    // We could combine these into a single action, GameStatus and pass a payload
    .map(endOfGame => (endOfGame ? new game.GameCompleted() : new game.GameInProgress()))
    .catch(err => of(err));

  constructor(
    private store: Store<fromRoot.State>,
    private gameService: GameService,
    private actions$: Actions
  ) {}
}
