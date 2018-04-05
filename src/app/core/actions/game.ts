import { Action } from '@ngrx/store';

export const INITIALIZE_GAME = '[Game] Initialize Game';
export const GAME_LOADED = '[Game] Game Loaded';
export const START_GAME = '[Game] Start Game';
export const PAUSE_GAME = '[Game] Pause Game';
export const RESET_GAME = '[Game] Reset Game';
export const GAME_COMPLETED = '[Game] Game Completed';
export const GAME_IN_PROGRESS = '[Game] Game in Progress';
export const NEXT_GAME_STEP = '[Game] Next Game Step';

export const CHANGE_HEIGHT = '[Game] Change Height';
export const CHANGE_WIDTH = '[Game] Change Width';
export const TOGGLE_CELL = '[Game] Toggle Cell';

export class InitializeGame implements Action {
  readonly type = INITIALIZE_GAME;
  constructor(public payload: { height: number; width: number }) {}
}

export class GameLoaded implements Action {
  readonly type = GAME_LOADED;
  constructor(public payload: any) {}
}

export class StartGame implements Action {
  readonly type = START_GAME;
}

export class PauseGame implements Action {
  readonly type = PAUSE_GAME;
}

export class ResetGame implements Action {
  readonly type = RESET_GAME;
}

export class GameCompleted implements Action {
  readonly type = GAME_COMPLETED;
}

export class GameInProgress implements Action {
  readonly type = GAME_IN_PROGRESS;
}

export class NextGameStep implements Action {
  readonly type = NEXT_GAME_STEP;
}

export class ChangeHeight implements Action {
  readonly type = CHANGE_HEIGHT;
  constructor(public payload: number) {}
}

export class ChangeWidth implements Action {
  readonly type = CHANGE_WIDTH;
  constructor(public payload: number) {}
}

export class ToggleCell implements Action {
  readonly type = TOGGLE_CELL;
  constructor(public payload: number) {}
}

export type Actions =
  | InitializeGame
  | GameLoaded
  | StartGame
  | PauseGame
  | ResetGame
  | GameCompleted
  | GameInProgress
  | NextGameStep
  | ChangeHeight
  | ChangeWidth
  | ToggleCell;
