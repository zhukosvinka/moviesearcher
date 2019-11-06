import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ContentContainer, MoviesList, Loader, Pagination } from '../components';
import { getMoviesData, getMoviesByGenre } from '../actions/moviesListActions';
import withLocalization from '../hocs/withLocalization';

const BottomContentWrapper = styled.div`
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
  &:hover {
    background-color: #316ba6;
  }
  &:active {
    background-color: #2f6091;
  }
`;

const MoviesContainer = ({ type, title, genreType, page, url, localizeText, currentLang }) => {
  const moviesData = useSelector(({ moviesListReducer }) =>
    genreType ? moviesListReducer.moviesByGenre : moviesListReducer[type],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (genreType) dispatch(getMoviesByGenre(genreType.genreId, page, currentLang));
    else dispatch(getMoviesData(type, page, currentLang));
  }, [type, dispatch, genreType, page, currentLang]);

  const isMoviesDataLoaded = !moviesData.isLoading && moviesData.data.results;

  return (
    <ContentContainer title={title ? title : moviesData.title}>
      {isMoviesDataLoaded ? <MoviesList movies={moviesData.data.results} /> : <Loader />}
      {isMoviesDataLoaded && (
        <BottomContentWrapper>
          {!page ? (
            <ShowMore to={`/movies/${type}/page/1`}>{localizeText('showMore')}</ShowMore>
          ) : (
            <Pagination
              currentUrl={url}
              currentPage={page}
              totalPages={moviesData.data.total_pages}
            />
          )}
        </BottomContentWrapper>
      )}
    </ContentContainer>
  );
};

MoviesContainer.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  genreType: PropTypes.object,
  page: PropTypes.string,
  url: PropTypes.string,
};

export default memo(withLocalization(MoviesContainer));
