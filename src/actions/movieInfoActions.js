import { API_KEY } from '../config';
import { LOAD_START } from '../constants';
import { GET_MOVIE_DATA } from '../constants/movieInfoConstants';
import { loadData } from '../helpers';

const loadMovieDataAndRecomendations = movieId =>
  new Promise(resolve => {
    Promise.all([
      loadData(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
      loadData(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
      ),
    ]).then(response => resolve(response));
  });

export const getMovieData = movieId => {
  return async dispatch => {
    dispatch({
      type: GET_MOVIE_DATA + LOAD_START,
    });

    const moviesData = await loadMovieDataAndRecomendations(movieId);

    moviesData[0].recommendations = moviesData[1];

    dispatch({
      type: GET_MOVIE_DATA,
      payload: {
        movieInfo: moviesData[0],
      },
    });
  };
};
