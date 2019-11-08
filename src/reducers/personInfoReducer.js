import {GET_PERSON_INFO} from '../constants/personInfoConstants'
import {LOAD_START} from '../constants'

const initialState = {
  isLoading: true,
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_PERSON_INFO + LOAD_START:
    return {
      ...state,
      isLoading: true
    }

  case GET_PERSON_INFO:
    return {
      ...state,
      isLoading: false,
      data: action.payload
    }
    
  default:
    return state
  }
}
