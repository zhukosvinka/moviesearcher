import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContentContainer, MoviesList, Loader } from '../components';
import { getMoviesData, getMoviesByGenre } from '../actions/moviesListActions';

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
    </ContentContainer>
  );
};

export default MoviesContainer;
