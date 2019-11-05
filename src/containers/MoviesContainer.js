import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ContentContainer, MoviesList, Loader } from '../components';
import { getMoviesData, getMoviesByGenre } from '../actions/moviesListActions';

const ShowMoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ShowMore = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;
  background-color: #3f7fbf;
  border-radius: 5px;
  display: inline-block;
  padding: 10px;
  margin: 20px 0 10px 0;
`;

const MoviesContainer = ({ type, title, genreType }) => {
  const moviesData = useSelector(({ moviesListReducer }) =>
    genreType ? moviesListReducer.moviesByGenre : moviesListReducer[type],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (genreType) dispatch(getMoviesByGenre(genreType.genreId));
    else dispatch(getMoviesData(type));
  }, [type, dispatch, genreType]);

  const isMoviesDataLoaded = !moviesData.isLoading && moviesData.data.results;

  return (
    <ContentContainer title={title ? title : moviesData.title}>
      {isMoviesDataLoaded ? <MoviesList movies={moviesData.data.results} /> : <Loader />}
      {isMoviesDataLoaded && (
        <ShowMoreBtnWrapper>
          <ShowMore to="/">Show more</ShowMore>
        </ShowMoreBtnWrapper>
      )}
    </ContentContainer>
  );
};

MoviesContainer.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  genreType: PropTypes.object,
};

export default MoviesContainer;
