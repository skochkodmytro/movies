import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, IconButton, Card, CardActions,
    CardContent, CardMedia, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

import { addOrDeleteFromFavoriteMovies } from '../utils/favoritesMovies';
import { setFavorite } from '../store/movies/movies-actions';

import { IMAGE_ENDPOINT } from '../constants/api';
import { IMovie } from '../types/Movie';
import { AppState } from '../store';

type OwnProps = {
    movie: IMovie
}

export const MovieCard: FC<OwnProps> = ({ movie }) => {
    const favoriteIds = useSelector<AppState, Array<number>>(store => store.movies.favorites);
    const dispatch = useDispatch();

    const substringOverview = () => {
        const { overview } = movie;
        return overview.split(/\s+/).slice(0, 20).join(' ');
    }

    const handleToggleFavorite = () => {
        const updatedFavoriteList = addOrDeleteFromFavoriteMovies(movie.id);
        dispatch(setFavorite(updatedFavoriteList));
    }

    const isFavorite = favoriteIds.includes(movie.id);

    return (
        <Card sx={{ overflow: 'visible' }}>
            <CardMedia
                component="img"
                image={`${IMAGE_ENDPOINT}${movie.poster_path}`}
                alt={movie.title}
            />
            <CardContent className="movie-car-content">
                <Box className="raiting">
                    {movie.vote_average}
                </Box>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {substringOverview()}
                    ...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Link to={`/${movie.id}`}>
                    <Button>
                        Details
                    </Button>
                </Link>
                <IconButton aria-label="add to favorites" onClick={handleToggleFavorite}>
                    <FavoriteIcon sx={{ color: isFavorite ? 'darkorange' : 'disabled' }} />
                </IconButton>
            </CardActions>
        </Card>
    )
}
