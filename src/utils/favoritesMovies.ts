// eslint-disable-next-line consistent-return
export const getFavoritesMoviesIds = () => {
    const moviesIds = localStorage.getItem('favorites');

    return moviesIds ? JSON.parse(moviesIds) : [];
}

export const addOrDeleteFromFavoriteMovies = (id: number) => {
    const moviesIds = getFavoritesMoviesIds();
    const indexMovie = moviesIds.indexOf(id);

    if (moviesIds && indexMovie !== -1) {
        moviesIds.splice(indexMovie, 1);
    } else {
        moviesIds.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(moviesIds));
    return moviesIds;
}
