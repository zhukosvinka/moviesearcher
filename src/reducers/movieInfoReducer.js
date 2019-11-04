import {GET_MOVIE_DATA} from '../constants/movieInfoConstants'
import {LOAD_START} from '../constants'

const initialState = {
  isLoading: false,
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_MOVIE_DATA + LOAD_START:
    return {
      ...state,
      isLoading: true
    }

  case GET_MOVIE_DATA:
    return {
      ...state,
      isLoading: false,
      data: action.payload
    }

  default:
    return state
  }
}
