import React, { FC } from 'react';
import { Grid, Skeleton } from '@mui/material';

type OwnProps = {
    count?: number,
}

export const CustomSkeleton: FC<OwnProps> = ({ count = 4 }) => {
    const renderSkeleton = () => {
        return Array.from(new Array(count || 4)).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={i} item xs={3}>
                <Skeleton variant="rectangular" height={400} />
                <Skeleton />
                <Skeleton />
            </Grid>
        ))
    }

    return (
        <Grid container spacing={5}>
            {renderSkeleton()}
        </Grid>
    )
}
