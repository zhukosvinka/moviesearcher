import { combineReducers } from 'redux'
import moviesListReducer from './moviesListReducer'
import movieInfoReducer from './movieInfoReducer'
import favoritesMoviesReducer from './favoritesMoviesReducer'

const mainReducer = combineReducers({
  moviesListReducer,
  movieInfoReducer,
  favoritesMoviesReducer
})

export default mainReducer