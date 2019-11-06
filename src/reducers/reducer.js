import { combineReducers } from 'redux'
import moviesListReducer from './moviesListReducer'
import movieInfoReducer from './movieInfoReducer'
import favoritesMoviesReducer from './favoritesMoviesReducer'
import appSettingsReducer from './appSettingsReducer'

const mainReducer = combineReducers({
  moviesListReducer,
  movieInfoReducer,
  favoritesMoviesReducer,
  appSettingsReducer
})

export default mainReducer