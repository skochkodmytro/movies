import axios from 'axios';

import { MOVIE_API_ENDPOINT, MOVIE_API_TOKEN } from '../constants/api';

import { IMovie } from '../types/Movie';

type GetMoviesResponseType = {
    page: number,
    results: Array<IMovie>,
    total_results: number,
    total_pages: number,
}

export class MovieApi {
    static getAuthorization() {
        return { Authorization: `Bearer ${MOVIE_API_TOKEN}` };
    }

    static getTop20Movies() {
        return axios.get<GetMoviesResponseType>(`${MOVIE_API_ENDPOINT}movie/top_rated`, {
            headers: this.getAuthorization(),
        }).then(data => data.data.results);
    }

    static getMovie(id: number) {
        return axios.get<IMovie>(`${MOVIE_API_ENDPOINT}movie/${id}`, {
            headers: this.getAuthorization(),
        }).then(data => data.data);
    }

    static findMoviesByQuery(query: string) {
        return axios.get<GetMoviesResponseType>(`${MOVIE_API_ENDPOINT}search/movie?query=${query}`, {
            headers: this.getAuthorization(),
        }).then(data => data.data.results);
    }
}
