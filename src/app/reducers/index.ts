import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromGame from '../core/reducers/game';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  game: fromGame.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  game: fromGame.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.group('Reducer Event:');
    console.log('Action:', action);
    console.log('State:', state);
    console.groupEnd();

    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [] // add [logger, storeFreeze] if desired
  : [];

export const selectGameState = createFeatureSelector<fromGame.State>('game');

export const getPlaying = createSelector(selectGameState, fromGame.getPlaying);
export const getCompleted = createSelector(selectGameState, fromGame.getCompleted);
export const getGameboard = createSelector(selectGameState, fromGame.getGameboard);
export const getGeneration = createSelector(selectGameState, fromGame.getGeneration);
export const getHeight = createSelector(selectGameState, fromGame.getHeight);
export const getWidth = createSelector(selectGameState, fromGame.getWidth);

export const getGameboardDimensions = createSelector(getHeight, getWidth, (height, width) => {
  return { height: height, width: width };
});

export const getFlattenedGameboard = createSelector(getGameboard, gameboard => {
  return [].concat.apply([], gameboard);
});
