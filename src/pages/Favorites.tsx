import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Grid } from '@mui/material';

import { MovieCard } from '../components/MovieCard';
import { AppState } from '../store';
import { IMovie } from '../types/Movie';
import { MovieApi } from '../api/movies';

import { CustomSkeleton } from '../components/CustomSkeleton';

export const Favorites: FC = () => {
    const favoritesIds = useSelector<AppState, Array<number>>(store => store.movies.favorites)
    const [movies, setMovies] = useState<Array<IMovie>>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        if (favoritesIds.length > 0) {
            const fetchMoviesPromisesArr = favoritesIds.map(id => {
                return MovieApi.getMovie(id);
            });

            Promise.all(fetchMoviesPromisesArr).then(data => {
                setMovies(data);
                setIsFetching(false);
            });
        }
    }, []);

    if (favoritesIds.length === 0) {
        return <Alert severity="info">You have not favorites movies yet</Alert>
    }

    if (isFetching) {
        return <CustomSkeleton />
    }

    const renderMovies = () => {
        return movies.map(m => (
            <Grid key={m.id} item xs={3}>
                <MovieCard movie={m} />
            </Grid>
        ))
    }

    return (
        <Grid container spacing={5}>
            {renderMovies()}
        </Grid>
    )
}
