import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/withLatestFrom';
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
import { Gameboard } from '../../core/models/gameboard';

@Injectable()
export class GameEffects {
  @Effect()
  gameSetup$ = this.actions$
    .ofType(game.INITIALIZE)
    .map((action: game.Initialize) => action.payload)
    .exhaustMap(size =>
      this.gameService
        .buildNewGameboard(size.width, size.height)
        .map(gameboard => new game.InitializeSuccess(gameboard))
        .catch(err => of(new game.InitializeFailure()))
    );

  @Effect()
  tick$ = this.actions$.ofType(game.START).switchMap(() => {
    return interval(500)
      .switchMap(() => this.store.select(fromRoot.getPlaying).take(1))
      .takeWhile(isPlaying => isPlaying)
      .mapTo(new game.NextGeneration());
  });

  @Effect()
  resetGameboard$ = this.actions$
    .ofType(game.RESET)
    .withLatestFrom(this.store.select(fromRoot.getGameboardDimensions))
    .exhaustMap(([action, dimensions]) =>
      this.gameService
        .buildNewGameboard(dimensions.width, dimensions.height)
        .map(gameboard => new game.ResetSuccess(gameboard))
        .catch(err => of(new game.ResetFailure()))
    );

  @Effect()
  getNextGeneration$ = this.actions$
    .ofType(game.NEXT)
    .withLatestFrom(this.store.select(fromRoot.getGameboard))
    .mergeMap(([action, gameboard]) => {
      return this.gameService.getNextGeneration(gameboard).switchMap(nextBoard =>
        this.gameService
          .checkGameEnded(nextBoard)
          .map(isGameOver => {
            if (isGameOver) {
              return new game.GameOver(nextBoard);
            } else {
              return new game.NextSuccess(nextBoard);
            }
          })
          .catch(() => of(new game.NextFailure()))
      );
    });

  @Effect()
  resizeGameboard$ = this.actions$
    .ofType(game.CHANGE_WIDTH, game.CHANGE_HEIGHT)
    .withLatestFrom(this.store.select(fromRoot.getGameboardDimensions))
    .concatMap(([action, dimensions]) =>
      this.gameService
        .buildNewGameboard(dimensions.width, dimensions.height)
        .map(gameboard => new game.ChangeDimensionsSuccess(gameboard))
        .catch(err => of(new game.ChangeDimensionsFailure()))
    );

  @Effect()
  toggleCell$ = this.actions$
    .ofType(game.TOGGLE_CELL)
    .withLatestFrom(this.store.select(fromRoot.getGameboard))
    .concatMap(([action, gameboard]: [game.ToggleCell, Gameboard]) => {
      return this.gameService
        .toggleCell(gameboard, action.payload)
        .map(newGameboard => new game.ToggleCellSuccess(newGameboard))
        .catch(err => of(new game.ToggleCellFailure()));
    });

  constructor(
    private store: Store<fromRoot.State>,
    private gameService: GameService,
    private actions$: Actions
  ) {}
}
