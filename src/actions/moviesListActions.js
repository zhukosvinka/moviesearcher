import { GET_MOVIES_DATA, GET_MOVIES_BY_GENRE_DATA } from '../constants/moviesListConstants';
import { LOAD_START } from '../constants';
import { API_KEY } from '../config';
import { loadData } from '../helpers/loadData';

const getMoviesByGenreAndGenreTitle = async genreId => {
  const data = await Promise.all([
    loadData(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genreId}`,
    ),
    loadData(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`),
  ]);
  return data;
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

    const moviesData = await getMoviesByGenreAndGenreTitle(genreId);

    dispatch({
      type: GET_MOVIES_BY_GENRE_DATA,
      payload: {
        data: moviesData[0],
        title: moviesData[1].genres.find(genre => genre.id === Number(genreId)).name,
      },
    });
  };
};
