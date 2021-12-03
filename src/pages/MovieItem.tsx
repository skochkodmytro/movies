import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Skeleton, Stack, Grid,
    Typography, IconButton, Chip, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { IMovie } from '../types/Movie';
import { MovieApi } from '../api/movies';
import { RequestStatusesEnum } from '../enums/RequestStatusesEnum';
import { IMAGE_ENDPOINT } from '../constants/api';
import { AppState } from '../store';

import { addOrDeleteFromFavoriteMovies } from '../utils/favoritesMovies';
import { setFavorite } from '../store/movies/movies-actions';

export const MovieItem: FC = () => {
    const favoriteIds = useSelector<AppState, Array<number>>(store => store.movies.favorites);
    const dispatch = useDispatch();
    const [movie, setMovie] = useState<IMovie | undefined>(undefined);
    const [fetchingStatus, setIsFetching] = useState<RequestStatusesEnum>(RequestStatusesEnum.PENDING);
    const { id } = useParams();

    const fetchMovie = () => {
        if (id) {
            setIsFetching(RequestStatusesEnum.PENDING);
            MovieApi.getMovie(+id).then((data: IMovie) => {
                setMovie(data);
                setIsFetching(RequestStatusesEnum.SUCCESS);
            }).catch(() => {
                setIsFetching(RequestStatusesEnum.FAILURE);
            });
        }
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    if (fetchingStatus === RequestStatusesEnum.PENDING) {
        return (
            <Box>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        )
    }

    if (fetchingStatus === RequestStatusesEnum.FAILURE) {
        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Alert severity="warning">Oops, something went wrong. Try again</Alert>
                <Button onClick={fetchMovie}>Load again</Button>
            </Stack>
        )
    }

    if (!movie) return null

    const isFavorite = favoriteIds.includes(movie.id);

    const renderGenres = () => {
        return movie && movie.genres ? (
            <Stack direction="row" spacing={1}>
                {movie?.genres.map(g => (
                    <Chip key={g.id} label={g.name} />
                ))}
            </Stack>
        ) : null
    }

    const handleToggleFavorite = () => {
        const updatedFavoriteList = addOrDeleteFromFavoriteMovies(movie.id);
        dispatch(setFavorite(updatedFavoriteList));
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={5}>
                <img src={`${IMAGE_ENDPOINT}${movie?.poster_path}`} alt={movie?.title} />
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h3" gutterBottom component="div">
                    {movie?.title}
                </Typography>
                {renderGenres()}
                <Typography variant="h5" gutterBottom mt={2}>
                    {movie?.tagline}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {movie?.overview}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6" gutterBottom mt={2}>
                        Vote Average:
                    </Typography>
                    <Typography variant="h5" gutterBottom mt={2}>
                        {movie?.vote_average}
                    </Typography>
                </Stack>
                <Divider />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6" gutterBottom mt={2}>
                        Vote Count:
                    </Typography>
                    <Typography variant="h5" gutterBottom mt={2}>
                        {movie?.vote_count}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <IconButton onClick={handleToggleFavorite}>
                        <FavoriteIcon sx={{ color: isFavorite ? 'darkorange' : 'disabled' }} />
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    )
}
