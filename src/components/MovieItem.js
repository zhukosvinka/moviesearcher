import React from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toggleFavoritesMovie } from '../actions/favoritesMoviesActions';
import deleteIcon from '../img/icons/delete.svg';

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100px;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  box-shadow: 0px 3px 7px -4px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;
  display: block;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transform: translateY(-5px);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const Title = styled.h3`
  color: #444444;
  font-size: 14px;
  flex-grow: 1;
`;

const FavoriteWrapper = styled(Link)`
  display: flex;
  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  align-items: center;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const FavoriteImage = styled.img`
  width: 38px;
  height: auto;
  margin-right: 10px;
`;

const RemoveButton = styled.div`
  margin-right: 20px;
  margin-left: 10px;
  padding: 5px;
  background-color: #a93f3f;
  border-radius: 5px;
  color: #fff;
  height: 20px;
  min-width: 20px;
  text-align: center;
  background-image: url(${deleteIcon});
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-color: #843636;
  }
  &:active {
    background-color: #662929;
  }
`;

const MovieItem = ({ movieData, isFavorite }) => {
  const dispatch = useDispatch();

  const removeFromFavorites = e => {
    e.preventDefault();
    dispatch(toggleFavoritesMovie(movieData));
  };

  const defaultRender = () => (
    <Wrapper to={`/movie/${movieData.id}`}>
      <MovieImage src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} />
      <Title>{movieData.title}</Title>
    </Wrapper>
  );

  const isFavoriteRender = () => (
    <FavoriteWrapper to={`/movie/${movieData.id}`}>
      <FavoriteImage src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} />
      <Title>{movieData.title}</Title>
      <RemoveButton onClick={removeFromFavorites} />
    </FavoriteWrapper>
  );

  return isFavorite ? isFavoriteRender() : defaultRender();
};

MovieItem.propTypes = {
  movieData: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool
}

export default MovieItem;
