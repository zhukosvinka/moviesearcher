import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ContentContainer, MoviesList, Loader } from '../components';
import { getMoviesData } from '../actions/moviesListActions';

const MoviesContainer = ({ type, title, getMoviesData, moviesData }) => {
  useEffect(() => {
    getMoviesData(type);
  }, [getMoviesData, type]);

  const isMoviesDataLoaded = !moviesData.isLoading && moviesData.data.results;

  return (
    <ContentContainer title={title}>
      {isMoviesDataLoaded ? <MoviesList movies={moviesData.data.results} /> : <Loader />}
    </ContentContainer>
  );
};

export default connect(
  ({ moviesListReducer }, { type }) => ({
    moviesData: moviesListReducer[type],
  }),
  {
    getMoviesData,
  },
)(MoviesContainer);
