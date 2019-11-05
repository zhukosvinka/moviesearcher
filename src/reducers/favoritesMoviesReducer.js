import {TOGGLE_FAVORITE_MOVIE} from '../constants/favoritesMoviesConstants'

const initialState = {
  favoritesMovies: JSON.parse(localStorage.getItem('favoritesMovies')) ? JSON.parse(localStorage.getItem('favoritesMovies')) : []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case TOGGLE_FAVORITE_MOVIE:
    return {
      ...state,
      favoritesMovies: action.payload
    }

  default:
    return state
  }
}
