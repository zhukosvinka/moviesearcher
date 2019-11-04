import { combineReducers } from 'redux'
import moviesListReducer from './moviesListReducer'
import movieInfoReducer from './movieInfoReducer'

const mainReducer = combineReducers({
  moviesListReducer,
  movieInfoReducer
})

export default mainReducer