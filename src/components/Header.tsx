import React, { FC } from 'react';
import { Badge, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../store';

export const Header: FC = () => {
    const favoritesIds = useSelector<AppState, Array<number>>(store => store.movies.favorites);

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Link to="/">
                <Typography variant="h3" gutterBottom component="div">
                    MoviYes
                </Typography>
            </Link>
            <Link to="/favorites">
                <Badge badgeContent={favoritesIds.length} color="primary">
                    <Button color="primary">
                        Favorites
                    </Button>
                </Badge>
            </Link>
        </Stack>
    )
}
