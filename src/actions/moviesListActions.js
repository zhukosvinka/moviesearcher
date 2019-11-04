import { GET_MOVIES_DATA } from '../constants/moviesListConstants';
import {LOAD_START} from '../constants'
import { API_KEY } from '../config';
import {loadData} from '../helpers/loadData'

export const getMoviesData = (dataType, page = 1) => {
  return async dispatch => {

    dispatch({
      type: GET_MOVIES_DATA + LOAD_START,
      payload: {
        dataType
      }
    })

    const moviesData = await loadData(`https://api.themoviedb.org/3/movie/${dataType}?api_key=${API_KEY}&language=en-US&page=${page}`)

    dispatch({
      type: GET_MOVIES_DATA,
      payload: {
        dataType,
        moviesData
      },
    });
  };
};
