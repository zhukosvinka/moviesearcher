import { TOGGLE_FAVORITE_MOVIE } from '../constants/favoritesMoviesConstants';

export const toggleFavoritesMovie = movieData => {
  let favoritesFromLs = JSON.parse(localStorage.getItem('favoritesMovies'));

  if (!favoritesFromLs) localStorage.setItem('favoritesMovies', JSON.stringify([movieData]));
  else {
    const isMovieInFavorites = favoritesFromLs.find(movie => movie.id === movieData.id);
    if (isMovieInFavorites) {
      favoritesFromLs = favoritesFromLs.filter(movie => movie.id !== isMovieInFavorites.id);
    } else {
      favoritesFromLs.push(movieData);
    }
    localStorage.setItem('favoritesMovies', JSON.stringify(favoritesFromLs));
  }

  return {
    type: TOGGLE_FAVORITE_MOVIE,
    payload: JSON.parse(localStorage.getItem('favoritesMovies')),
  };
};
