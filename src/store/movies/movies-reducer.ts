import { RequestStatusesEnum } from '../../enums/RequestStatusesEnum';

import { ActionTypes, FETCH_MOVIES_STATUS, SET_MOVIES, SET_FAVORITES } from './movies-actions';

import { IMovie } from '../../types/Movie';

const initialState = {
    movies: [] as Array<IMovie>,
    fetchStatus: null as RequestStatusesEnum | null,
    favorites: [] as Array<number>,
};

type MoviesInitialType = typeof initialState;

export const moviesReducer = (state: MoviesInitialType = initialState, action: ActionTypes): MoviesInitialType => {
    switch (action.type) {
        case SET_MOVIES:
            return { ...state, movies: action.movies };
        case FETCH_MOVIES_STATUS:
            return { ...state, fetchStatus: action.status };
        case SET_FAVORITES:
            return { ...state, favorites: action.movieIds }
        default:
            return state
    }
}
