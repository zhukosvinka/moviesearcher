import {GET_MOVIES_DATA} from '../constants/moviesListConstants'
import {LOAD_START} from '../constants'

const initialState = {
  popular: {
    isLoading: false,
    data: {}
  },
  top_rated: {
    isLoading: false,
    data: {}
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

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
