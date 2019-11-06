import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { getMovieData } from '../actions/movieInfoActions';
import { MovieInfo } from '../components';
import withLocalization from '../hocs/withLocalization'

const MovieInfoContainer = ({ match, currentLang }) => {
  const isLoading = useSelector(({ movieInfoReducer }) => movieInfoReducer.isLoading);
  const movieData = useSelector(({ movieInfoReducer }) => movieInfoReducer.data);

  const dispatch = useDispatch();

  const movieId = match.params.movieId;

  useEffect(() => {
    dispatch(getMovieData(movieId, currentLang));
  }, [movieId, dispatch, currentLang]);

  const isMovieInfoDataLoaded = !isLoading && Object.keys(movieData).length > 0;

  return <MovieInfo isMovieInfoDataLoaded={isMovieInfoDataLoaded} movieData={movieData} />;
};

MovieInfoContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default withLocalization(MovieInfoContainer);
