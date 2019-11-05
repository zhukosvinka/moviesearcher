import React from 'react'
import {useSelector} from 'react-redux'
import { ContentContainer, MovieItem } from '../components';

const FavoritesMoviesContainer = () => {
  const favoritesMovies = useSelector(({favoritesMoviesReducer}) => favoritesMoviesReducer.favoritesMovies)
  return (
    <ContentContainer title='Favorites'>
      {favoritesMovies.length > 0 ? favoritesMovies.map(movie => <MovieItem isFavorite key={movie.id} movieData={movie}/>) : 'Favorites list is empty'}
    </ContentContainer>
  )
}

export default FavoritesMoviesContainer
