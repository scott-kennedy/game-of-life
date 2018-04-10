import { Action } from '@ngrx/store';

export const INITIALIZE = '[Game] Initialize';
export const INITIALIZE_SUCCESS = '[Game] Initialize Success';
export const INITIALIZE_FAILURE = '[Game] Initialize Failure';

export const LOAD = '[Game] Load';
export const LOAD_SUCCESS = '[Game] Load Success';
export const LOAD_FAILURE = '[Game] Load Failure';

export const START = '[Game] Start';
export const START_SUCCESS = '[Game] Start Success';
export const START_FAILURE = '[Game] Start Failure';

export const PAUSE = '[Game] Pause';
export const PAUSE_SUCCESS = '[Game] Pause Success';
export const PAUSE_FAILURE = '[Game] Pause Failure';

export const RESET = '[Game] Reset';
export const RESET_SUCCESS = '[Game] Reset Success';
export const RESET_FAILURE = '[Game] Reset Failure';

export const NEXT = '[Game] Next Generation';
export const NEXT_SUCCESS = '[Game] Next Generation Success';
export const NEXT_FAILURE = '[Game] Next Generation Failure';

export const GAME_OVER = '[Game] Game Over, man!';

export const CHANGE_HEIGHT = '[Game] Change Height';
export const CHANGE_WIDTH = '[Game] Change Width';
export const CHANGE_DIMENSIONS_SUCCESS = '[Game] Change Dimensions Success';
export const CHANGE_DIMENSIONS_FAILURE = '[Game] Change Dimensions Failure';

export const TOGGLE_CELL = '[Game] Toggle Cell';
export const TOGGLE_CELL_SUCCESS = '[Game] Toggle Cell Success';
export const TOGGLE_CELL_FAILURE = '[Game] Toggle Cell Failure';

export class Initialize implements Action {
  readonly type = INITIALIZE;
  constructor(public payload: { height: number; width: number }) {}
}

export class InitializeSuccess implements Action {
  readonly type = INITIALIZE_SUCCESS;
  constructor(public payload: any) {}
}

export class InitializeFailure implements Action {
  readonly type = INITIALIZE_FAILURE;
}

export class Start implements Action {
  readonly type = START;
}
export class StartSuccess implements Action {
  readonly type = START_SUCCESS;
}
export class StartFailure implements Action {
  readonly type = START_FAILURE;
}

export class Pause implements Action {
  readonly type = PAUSE;
}
export class PauseSuccess implements Action {
  readonly type = PAUSE_SUCCESS;
}
export class PauseFailure implements Action {
  readonly type = PAUSE_FAILURE;
}

export class Reset implements Action {
  readonly type = RESET;
}
export class ResetSuccess implements Action {
  readonly type = RESET_SUCCESS;
  constructor(public payload: any) {}
}
export class ResetFailure implements Action {
  readonly type = RESET_FAILURE;
}

export class NextGeneration implements Action {
  readonly type = NEXT;
}
export class NextSuccess implements Action {
  readonly type = NEXT_SUCCESS;
  constructor(public payload: any) {}
}
export class NextFailure implements Action {
  readonly type = NEXT;
}

export class GameOver implements Action {
  readonly type = GAME_OVER;
  constructor(public payload: any) {}
}

export class ChangeHeight implements Action {
  readonly type = CHANGE_HEIGHT;
  constructor(public payload: number) {}
}
export class ChangeWidth implements Action {
  readonly type = CHANGE_WIDTH;
  constructor(public payload: number) {}
}
export class ChangeDimensionsSuccess implements Action {
  readonly type = CHANGE_DIMENSIONS_SUCCESS;
  constructor(public payload: any) {}
}
export class ChangeDimensionsFailure implements Action {
  readonly type = CHANGE_DIMENSIONS_FAILURE;
}

export class ToggleCell implements Action {
  readonly type = TOGGLE_CELL;
  constructor(public payload: number) {}
}
export class ToggleCellSuccess implements Action {
  readonly type = TOGGLE_CELL_SUCCESS;
  constructor(public payload: any) {}
}
export class ToggleCellFailure implements Action {
  readonly type = TOGGLE_CELL_FAILURE;
}

export type Actions =
  | Initialize
  | InitializeSuccess
  | InitializeFailure
  | Start
  | StartSuccess
  | StartFailure
  | Pause
  | PauseSuccess
  | PauseFailure
  | Reset
  | ResetSuccess
  | ResetFailure
  | NextGeneration
  | NextSuccess
  | NextFailure
  | GameOver
  | ChangeHeight
  | ChangeWidth
  | ChangeDimensionsSuccess
  | ChangeDimensionsFailure
  | ToggleCell
  | ToggleCellSuccess
  | ToggleCellFailure;
