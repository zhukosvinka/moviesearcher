import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieData } from '../actions/movieInfoActions';
import { MovieInfo } from '../components';

const MovieInfoContainer = ({ match }) => {
  const isLoading = useSelector(({ movieInfoReducer }) => movieInfoReducer.isLoading);
  const movieData = useSelector(({ movieInfoReducer }) => movieInfoReducer.data);

  const dispatch = useDispatch();

  const movieId = match.params.movieId;

  useEffect(() => {
    dispatch(getMovieData(movieId));
  }, [movieId, dispatch]);

  const isMovieInfoDataLoaded = !isLoading && Object.keys(movieData).length > 0;

  return <MovieInfo isMovieInfoDataLoaded={isMovieInfoDataLoaded} movieData={movieData} />;
};

export default MovieInfoContainer;
