import {GET_MOVIES_DATA, GET_MOVIES_BY_GENRE_DATA} from '../constants/moviesListConstants'
import {LOAD_START} from '../constants'

const initialState = {
  popular: {
    isLoading: false,
    data: {}
  },
  top_rated: {
    isLoading: false,
    data: {}
  },
  moviesByGenre: {
    isLoading: false,
    data: {},
    title: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  
  case GET_MOVIES_BY_GENRE_DATA + LOAD_START:
    return {
      ...state,
      moviesByGenre: {
        ...state.moviesByGenre,
        isLoading: true
      }
    }

  case GET_MOVIES_BY_GENRE_DATA:
    console.log(action.payload)
    return {
      ...state,
      moviesByGenre: {
        data: action.payload.data,
        isLoading: false,
        title: action.payload.title
      }
    }

  case GET_MOVIES_DATA + LOAD_START:
    return {
      ...state,
      [action.payload.dataType]: {
        ...state[action.payload.dataType],
        isLoading: true
      }
    }

  case GET_MOVIES_DATA:
    return { 
      ...state,
      [action.payload.dataType]: {
        ...state[action.payload.dataType],
        data: action.payload.moviesData,
        isLoading: false
      }
     }

  default:
    return state
  }
}
