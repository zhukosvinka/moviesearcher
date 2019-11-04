import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContentContainer, MoviesList, Loader } from '../components';
import { getMoviesData } from '../actions/moviesListActions';

const MoviesContainer = ({ type, title }) => {
  const moviesData = useSelector(({ moviesListReducer }) => moviesListReducer[type]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesData(type));
  }, [type, dispatch]);

  const isMoviesDataLoaded = !moviesData.isLoading && moviesData.data.results;

  return (
    <ContentContainer title={title}>
      {isMoviesDataLoaded ? <MoviesList movies={moviesData.data.results} /> : <Loader />}
    </ContentContainer>
  );
};

export default MoviesContainer;
