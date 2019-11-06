import {
  GET_MOVIES_DATA,
  GET_MOVIES_BY_GENRE_DATA,
  GET_MOVIES_BY_SEARCH,
} from '../constants/moviesListConstants';
import { LOAD_START } from '../constants';
import { API_KEY } from '../config';
import { loadData } from '../helpers';

const getMoviesByGenreAndGenreTitle = async (genreId, page) => {
  const data = await Promise.all([
    loadData(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`,
    ),
    loadData(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`),
  ]);
  return data;
};

export const getMoviesBySearch = query => {
  return async dispatch => {
    dispatch({
      type: GET_MOVIES_BY_SEARCH + LOAD_START,
    });

    const findedMovies = await loadData(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`,
    );

    dispatch({
      type: GET_MOVIES_BY_SEARCH,
      payload: findedMovies,
    });
  };
};

export const getMoviesData = (dataType, page = 1) => {
  return async dispatch => {
    dispatch({
      type: GET_MOVIES_DATA + LOAD_START,
      payload: {
        dataType,
      },
    });

    const moviesData = await loadData(
      `https://api.themoviedb.org/3/movie/${dataType}?api_key=${API_KEY}&language=en-US&page=${page}`,
    );

    dispatch({
      type: GET_MOVIES_DATA,
      payload: {
        dataType,
        moviesData,
      },
    });
  };
};

export const getMoviesByGenre = (genreId, page = 1) => {
  return async dispatch => {
    dispatch({
      type: GET_MOVIES_BY_GENRE_DATA + LOAD_START,
    });

    const moviesData = await getMoviesByGenreAndGenreTitle(genreId, page);

    dispatch({
      type: GET_MOVIES_BY_GENRE_DATA,
      payload: {
        data: moviesData[0],
        title: moviesData[1].genres.find(genre => genre.id === Number(genreId)).name,
      },
    });
  };
};
