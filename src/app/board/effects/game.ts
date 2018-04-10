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
    .ofType(game.INITIALIZE)
    .map((action: game.Initialize) => action.payload)
    .switchMap(size => this.gameService.buildNewGameboard(size.width, size.height))
    .map(gameboard => new game.InitializeSuccess(gameboard))
    .catch(err => of(err));

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
    .switchMap(() => this.store.select(fromRoot.getGameboardDimensions).take(1))
    .switchMap(size => this.gameService.buildNewGameboard(size.width, size.height))
    .map(board => new game.ResetSuccess(board))
    .catch(err => of(err).mapTo(new game.ResetFailure()));

  @Effect()
  getNextGeneration$ = this.actions$
    .ofType(game.NEXT)
    .switchMap(() => this.store.select(fromRoot.getGameboard).take(1))
    .switchMap(gameboard => this.gameService.getNextGeneration(gameboard))
    .switchMap(gameboard =>
      this.gameService.checkGameEnded(gameboard).map(isGameOver => {
        if (isGameOver) {
          return new game.GameOver(gameboard);
        } else {
          return new game.NextSuccess(gameboard);
        }
      })
    )
    .catch(err => of(err));

  @Effect()
  resizeGameboard$ = this.actions$
    .ofType(game.CHANGE_WIDTH, game.CHANGE_HEIGHT)
    .switchMap(() => this.store.select(fromRoot.getGameboardDimensions).take(1))
    .switchMap(dimensions =>
      this.gameService.buildNewGameboard(dimensions.width, dimensions.height)
    )
    .map(gameboard => new game.ChangeDimensionsSuccess(gameboard))
    .catch(err => of(err));

  @Effect()
  toggleCell$ = this.actions$
    .ofType<game.ToggleCell>(game.TOGGLE_CELL)
    .switchMap((action: game.ToggleCell) =>
      this.store
        .select(fromRoot.getGameboard)
        .take(1)
        .map(currentGameboard => {
          return {
            gameboard: currentGameboard,
            cellIndex: action.payload
          };
        })
    )
    .switchMap(data => this.gameService.toggleCell(data.gameboard, data.cellIndex))
    .map(gameboard => new game.ToggleCellSuccess(gameboard))
    .catch(err => of(err));

  constructor(
    private store: Store<fromRoot.State>,
    private gameService: GameService,
    private actions$: Actions
  ) {}
}
