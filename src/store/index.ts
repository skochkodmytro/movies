import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { setFavorite } from './movies/movies-actions';
import { getFavoritesMoviesIds } from '../utils/favoritesMovies';

import { moviesReducer } from './movies/movies-reducer';

export const rootReducer = combineReducers({
    movies: moviesReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(setFavorite(getFavoritesMoviesIds()));
