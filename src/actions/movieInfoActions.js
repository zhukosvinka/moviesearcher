import { API_KEY } from '../config';
import {LOAD_START} from '../constants'
import {GET_MOVIE_DATA} from '../constants/movieInfoConstants'
import {loadData} from '../helpers/loadData'

export const getMovieData = (movieId) => {
  return async dispatch => {

    dispatch({
      type: GET_MOVIE_DATA + LOAD_START
    })

    const moviesData = await loadData(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)

    dispatch({
      type: GET_MOVIE_DATA,
      payload: moviesData
    });
  };
};