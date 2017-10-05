import * as game from '../actions/game';

export interface State {
  completed: boolean;
}

export const initialState: State = {
  completed: false
};

export function reducer(state = initialState, action: game.Actions): State {
  switch (action.type) {
    // case 'GAME_COMPLETED': {
    //   return {
    //     disableStart: true,
    //     disableStep: true,
    //     playing: false,
    //     completed: true
    //   };
    // }

    case game.RESET_GAME: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getCompleted = (state: State) => state.completed;
