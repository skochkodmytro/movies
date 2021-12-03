import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Grid, Skeleton, TextField } from '@mui/material';

import { AppState } from '../store';
import { RequestStatusesEnum } from '../enums/RequestStatusesEnum';
import { IMovie } from '../types/Movie';

import { MovieCard } from '../components/MovieCard';

import { findMoviesByQuery, getTop20Movies } from '../store/movies/movies-actions';

import { CustomSkeleton } from '../components/CustomSkeleton';

export const Movies: FC = () => {
    const movies = useSelector<AppState, Array<IMovie>>(store => store.movies.movies);
    const fetchMoviesStatus = useSelector<AppState, RequestStatusesEnum | null>(store => store.movies.fetchStatus);
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState<string>('');

    const typingTimer = useRef<any>(null);

    useEffect(() => {
        dispatch(getTop20Movies());
    }, [])

    const handleFindMoviesByQuery = (query: string) => {
        if (query) {
            dispatch(findMoviesByQuery(query));
        } else {
            dispatch(getTop20Movies());
        }
    }

    const handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);

        if (typingTimer.current) {
            clearTimeout(typingTimer.current)
        }
        typingTimer.current = setTimeout(() => {
            handleFindMoviesByQuery(event.target.value);
        }, 1500);
    };

    const renderMovies = () => {
        return movies.map(m => (
            <Grid key={m.id} item xs={3}>
                <MovieCard movie={m} />
            </Grid>
        ))
    }

    return (
        <Box>
            <Box mb={4}>
                <TextField
                    label="Search"
                    fullWidth
                    value={searchInput}
                    onChange={handleChangeSearchInput}
                />
            </Box>

            {
                fetchMoviesStatus === RequestStatusesEnum.PENDING ? (
                    <CustomSkeleton />
                ) : null
            }

            {
                fetchMoviesStatus === RequestStatusesEnum.SUCCESS && movies.length === 0 ? (
                    <Alert severity="warning">
                        {`Sorry, we didn't find movies by '${searchInput}' query`}
                    </Alert>
                ) : null
            }

            {
                fetchMoviesStatus === RequestStatusesEnum.SUCCESS && movies.length > 0 ? (
                    <Grid container spacing={5}>
                        {renderMovies()}
                    </Grid>
                ) : null
            }
        </Box>
    )
}
