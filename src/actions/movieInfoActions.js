import { API_KEY } from '../config';
import { LOAD_START } from '../constants';
import { GET_MOVIE_DATA } from '../constants/movieInfoConstants';
import { loadData } from '../helpers';

const loadMovieDataAndRecomendations = (movieId, currentLang) =>
  new Promise(resolve => {
    Promise.all([
      loadData(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${currentLang}&with_cast`),
      loadData(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=${currentLang}&page=1`,
      ),
      loadData(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=${currentLang}`),
      loadData(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`)
    ]).then(response => resolve(response));
  });

export const getMovieData = (movieId, currentLang) => {
  return async dispatch => {
    dispatch({
      type: GET_MOVIE_DATA + LOAD_START,
    });

    const moviesData = await loadMovieDataAndRecomendations(movieId, currentLang);

    moviesData[0].recommendations = moviesData[1];
    moviesData[0].cast = moviesData[2].cast;
    moviesData[0].images = moviesData[3].backdrops

    dispatch({
      type: GET_MOVIE_DATA,
      payload: {
        movieInfo: moviesData[0],
      },
    });
  };
};
