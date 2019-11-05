import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContentContainer, MovieItem } from '../components';
import '../styles/css/style.css';

const FavoritesMoviesContainer = () => {
  const favoritesMovies = useSelector(
    ({ favoritesMoviesReducer }) => favoritesMoviesReducer.favoritesMovies,
  );

  const renderFavoritesList = () => (
    <TransitionGroup className="todo-list">
      {favoritesMovies.map(movie => (
        <CSSTransition key={movie.id} timeout={500} classNames="favorite-movie-item">
          <MovieItem isFavorite movieData={movie} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );

  return (
    <ContentContainer title="Favorites">
      {favoritesMovies.length > 0 ? renderFavoritesList() : 'Favorites list is empty'}
    </ContentContainer>
  );
};

export default FavoritesMoviesContainer;
