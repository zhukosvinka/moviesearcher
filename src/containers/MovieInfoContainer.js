import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {getMovieData} from '../actions/movieInfoActions'
import {MovieInfo} from '../components'

const MovieInfoContainer = ({match, getMovieData, movieData, isLoading}) => {
  const movieId = match.params.movieId

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId, getMovieData]);

  const isMovieInfoDataLoaded = !isLoading && Object.keys(movieData).length > 0;

  return <MovieInfo isMovieInfoDataLoaded={isMovieInfoDataLoaded} movieData={movieData}/>
}

export default connect(({movieInfoReducer}) => ({
  isLoading: movieInfoReducer.isLoading,
  movieData: movieInfoReducer.data
}), {
  getMovieData
})(MovieInfoContainer)
