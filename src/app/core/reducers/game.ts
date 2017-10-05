import * as game from '../actions/game';

export interface State {
  playing: boolean;
  completed: boolean;
  generation: number;
  height: number;
  width: number;
  gameboard: any;
}

const initialState: State = {
  playing: false,
  completed: false,
  generation: 0,
  height: 10,
  width: 10,
  gameboard: []
};

export function reducer(state = initialState, action: game.Actions): State {
  switch (action.type) {
    case game.GAME_LOADED:
      return {
        ...state,
        gameboard: action.payload
      };
    case game.START_GAME:
      return {
        ...state,
        playing: true
      };

    case game.PAUSE_GAME:
      return {
        ...state,
        playing: false
      };

    case game.RESET_GAME:
      return initialState;

    case game.GAME_COMPLETED:
      return {
        ...state,
        completed: true,
        playing: false
      };

    case game.NEXT_GAME_STEP:
      return {
        ...state,
        generation: state.generation + 1
      };

    case game.CHANGE_HEIGHT: {
      return {
        ...state,
        height: action.payload
      };
    }

    case game.CHANGE_WIDTH: {
      return {
        ...state,
        width: action.payload
      };
    }

    default:
      return state;
  }
}

export const getPlaying = (state: State) => state.playing;
export const getCompleted = (state: State) => state.completed;
export const getGameboard = (state: State) => state.gameboard;
export const getGeneration = (state: State) => state.generation;
export const getHeight = (state: State) => state.height;
export const getWidth = (state: State) => state.width;
