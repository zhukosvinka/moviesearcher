import { combineReducers } from 'redux'
import moviesListReducer from './moviesListReducer'
import movieInfoReducer from './movieInfoReducer'
import favoritesMoviesReducer from './favoritesMoviesReducer'
import appSettingsReducer from './appSettingsReducer'
import personInfoReducer from './personInfoReducer'

const mainReducer = combineReducers({
  moviesListReducer,
  movieInfoReducer,
  favoritesMoviesReducer,
  appSettingsReducer,
  personInfoReducer
})

export default mainReducer