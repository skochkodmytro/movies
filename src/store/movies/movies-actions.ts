import { ThunkAction } from 'redux-thunk';

import { RequestStatusesEnum } from '../../enums/RequestStatusesEnum';
import { AppState } from '../index';
import { IMovie } from '../../types/Movie';

import { MovieApi } from '../../api/movies';

import { addOrDeleteFromFavoriteMovies } from '../../utils/favoritesMovies';

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FAVORITES = 'SET_FAVORITES';
export const FETCH_MOVIES_STATUS = 'FETCH_MOVIES_STATUS';

type SetMoviesType = {
    type: typeof SET_MOVIES,
    movies: Array<any>
};

export const setMovies = (movies: Array<IMovie>): SetMoviesType => ({
    type: SET_MOVIES, movies,
});

type FetchMoviesStatusType = {
    type: typeof FETCH_MOVIES_STATUS,
    status: RequestStatusesEnum,
};

export const setFetchMoviesStatus = (status: RequestStatusesEnum): FetchMoviesStatusType => ({
    type: FETCH_MOVIES_STATUS, status,
});

type SetFavoriteMovieType = {
    type: typeof SET_FAVORITES,
    movieIds: Array<number>,
}

export const setFavorite = (ids: Array<number>): SetFavoriteMovieType => (
    { type: SET_FAVORITES, movieIds: ids }
)

export const getTop20Movies = (): ThunkAction<any, AppState, unknown, ActionTypes> => {
    return async dispatch => {
        dispatch(setFetchMoviesStatus(RequestStatusesEnum.PENDING));
        MovieApi.getTop20Movies().then(movies => {
            dispatch(setMovies(movies));
            dispatch(setFetchMoviesStatus(RequestStatusesEnum.SUCCESS));
        })
            .catch(() => {
                dispatch(setFetchMoviesStatus(RequestStatusesEnum.FAILURE));
            });
    }
}

export const findMoviesByQuery = (query: string): ThunkAction<any, AppState, unknown, ActionTypes> => {
    return async dispatch => {
        dispatch(setFetchMoviesStatus(RequestStatusesEnum.PENDING));
        MovieApi.findMoviesByQuery(query).then(movies => {
            dispatch(setMovies(movies));
            dispatch(setFetchMoviesStatus(RequestStatusesEnum.SUCCESS));
        })
            .catch(() => {
                dispatch(setFetchMoviesStatus(RequestStatusesEnum.FAILURE));
            });
    }
}

export type ActionTypes = SetMoviesType | FetchMoviesStatusType | SetFavoriteMovieType;
