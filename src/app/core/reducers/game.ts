import * as game from '../actions/game';

export interface State {
  status: string;
  generation: number;
  height: number;
  width: number;
  gameboard: any;
}

const initialState: State = {
  status: '',
  generation: 0,
  height: 10,
  width: 10,
  gameboard: []
};

export function reducer(state = initialState, action: game.Actions): State {
  switch (action.type) {
    case game.INITIALIZE_SUCCESS:
      return {
        ...state,
        gameboard: action.payload
      };

    case game.GAME_OVER:
      return {
        ...state,
        gameboard: action.payload,
        status: 'complete'
      };

    case game.TOGGLE_CELL_SUCCESS: {
      return {
        ...state,
        gameboard: action.payload
      };
    }

    case game.START:
    case game.START_SUCCESS:
      return {
        ...state,
        status: 'playing'
      };

    case game.PAUSE:
      return {
        ...state,
        status: 'paused'
      };

    // Intentionally resets height/width
    case game.RESET_SUCCESS:
      return {
        ...initialState,
        gameboard: action.payload
      };

    case game.NEXT_SUCCESS:
      return {
        ...state,
        generation: state.generation + 1,
        gameboard: action.payload
      };

    case game.CHANGE_WIDTH: {
      return {
        ...state,
        width: action.payload
      };
    }

    case game.CHANGE_HEIGHT: {
      return {
        ...state,
        height: action.payload
      };
    }

    case game.CHANGE_DIMENSIONS_SUCCESS: {
      return {
        ...state,
        gameboard: action.payload
      };
    }

    default:
      return state;
  }
}

export const getPlaying = (state: State) => state.status === 'playing';
export const getCompleted = (state: State) => state.status === 'complete';
export const getGameboard = (state: State) => state.gameboard;
export const getGeneration = (state: State) => state.generation;
export const getHeight = (state: State) => state.height;
export const getWidth = (state: State) => state.width;
